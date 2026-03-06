import { useState, useMemo } from "react"
import { MEAL_INGREDIENTS, CAT_META, BATCH_COOK_ITEMS } from "./ingredients"
import { MEAL_TYPES, DEFAULT_MEAL_PLAN, DEFAULT_EXERCISE_PLAN } from "./data"

// ─── HELPERS ─────────────────────────────────────────────────────────────────

function buildShoppingList(weekMeals) {
  // Collect all ingredients for the week
  const totals = {}

  weekMeals.forEach(day => {
    MEAL_TYPES.forEach(type => {
      const mealId = day[type]
      const ings = MEAL_INGREDIENTS[mealId] || []
      ings.forEach(ing => {
        const key = ing.n.toLowerCase()
        if (!totals[key]) {
          totals[key] = { name: ing.n, qty: 0, unit: ing.u, cat: ing.c, count: 0 }
        }
        // Only aggregate if same unit
        if (totals[key].unit === ing.u) {
          totals[key].qty += ing.q
        } else {
          totals[key].qty = Math.max(totals[key].qty, ing.q)
        }
        totals[key].count++
      })
    })
  })

  // Group by category
  const grouped = {}
  Object.values(totals).forEach(item => {
    if (!grouped[item.cat]) grouped[item.cat] = []
    grouped[item.cat].push(item)
  })

  // Sort each category alphabetically
  Object.keys(grouped).forEach(cat => {
    grouped[cat].sort((a, b) => a.name.localeCompare(b.name))
  })

  return grouped
}

function buildMealPrepList(weekMeals) {
  // Count how many times each ingredient appears
  const counts = {}
  weekMeals.forEach(day => {
    MEAL_TYPES.forEach(type => {
      const ings = MEAL_INGREDIENTS[day[type]] || []
      ings.forEach(ing => {
        const key = ing.n.toLowerCase()
        counts[key] = (counts[key] || 0) + 1
      })
    })
  })

  // Find batch cook opportunities
  const tasks = []
  Object.entries(BATCH_COOK_ITEMS).forEach(([ingredient, info]) => {
    const anyMatch = info.matches.some(m => (counts[m.toLowerCase()] || 0) >= 2)
    if (anyMatch) {
      const totalUses = info.matches.reduce((s, m) => s + (counts[m.toLowerCase()] || 0), 0)
      tasks.push({ ...info, ingredient, uses: totalUses })
    }
  })

  // Sort by number of uses descending
  tasks.sort((a, b) => b.uses - a.uses)
  return tasks
}

// ─── SHOPPING LIST VIEW ───────────────────────────────────────────────────────

export function ShoppingList({ mealPlan }) {
  const [activeWeek, setActiveWeek] = useState(0)
  const [checked, setChecked] = useState({})
  const [mode, setMode] = useState("shop") // "shop" | "prep"

  const weekMeals = useMemo(() => {
    const start = activeWeek * 7
    return mealPlan.slice(start, start + 7)
  }, [mealPlan, activeWeek])

  const shoppingList = useMemo(() => buildShoppingList(weekMeals), [weekMeals])
  const prepTasks    = useMemo(() => buildMealPrepList(weekMeals), [weekMeals])

  const totalItems   = Object.values(shoppingList).reduce((s, items) => s + items.length, 0)
  const checkedCount = Object.values(checked).filter(Boolean).length

  const toggleItem = key => setChecked(prev => ({ ...prev, [key]: !prev[key] }))
  const clearAll   = () => setChecked({})

  const catOrder = ["proteins", "fruit_veg", "grains", "dairy", "pantry"]

  return (
    <div style={{ display:"flex", flexDirection:"column", height:"100%", overflow:"hidden" }}>

      {/* Week selector */}
      <div style={{ background:"#FFF", borderBottom:"1px solid #EBEBEB", padding:"12px 14px 10px", flexShrink:0 }}>
        <div style={{ display:"flex", gap:6, marginBottom:10 }}>
          {["Week 1","Week 2","Week 3","Week 4"].map((w,i) => (
            <button key={i} onClick={()=>{ setActiveWeek(i); setChecked({}) }} style={{ flex:1, padding:"7px 4px", borderRadius:8, border:"none", background:activeWeek===i?"#1E3214":"#F0F0F0", color:activeWeek===i?"#FFF":"#666", fontFamily:"sans-serif", fontSize:11, fontWeight:activeWeek===i?700:400, cursor:"pointer" }}>
              {w}
            </button>
          ))}
        </div>

        {/* Mode toggle */}
        <div style={{ display:"flex", background:"#F0F0F0", borderRadius:8, padding:3, gap:3 }}>
          {[{id:"shop",label:"🛒 Shopping List"},{id:"prep",label:"👩‍🍳 Meal Prep"}].map(m => (
            <button key={m.id} onClick={()=>setMode(m.id)} style={{ flex:1, padding:"7px 8px", borderRadius:6, border:"none", background:mode===m.id?"#FFF":"transparent", color:mode===m.id?"#1E3214":"#999", fontFamily:"sans-serif", fontSize:12, fontWeight:mode===m.id?700:400, cursor:"pointer", boxShadow:mode===m.id?"0 1px 3px rgba(0,0,0,0.1)":"none" }}>
              {m.label}
            </button>
          ))}
        </div>
      </div>

      {/* ── SHOPPING LIST ── */}
      {mode === "shop" && (
        <>
          <div style={{ padding:"8px 14px", display:"flex", justifyContent:"space-between", alignItems:"center", flexShrink:0 }}>
            <span style={{ fontFamily:"sans-serif", fontSize:11, color:"#999" }}>
              {checkedCount}/{totalItems} items
            </span>
            {checkedCount > 0 && (
              <button onClick={clearAll} style={{ fontFamily:"sans-serif", fontSize:11, color:"#C0392B", background:"none", border:"none", cursor:"pointer" }}>
                Clear all ×
              </button>
            )}
          </div>

          <div style={{ overflowY:"auto", padding:"0 12px 24px", display:"flex", flexDirection:"column", gap:14 }}>
            {catOrder.map(cat => {
              const items = shoppingList[cat]
              if (!items?.length) return null
              const meta = CAT_META[cat]
              return (
                <div key={cat}>
                  <div style={{ fontSize:10, fontFamily:"sans-serif", fontWeight:700, color:meta.color, letterSpacing:"1.5px", textTransform:"uppercase", marginBottom:6, paddingLeft:2 }}>
                    {meta.emoji} {meta.label}
                  </div>
                  <div style={{ display:"flex", flexDirection:"column", gap:5 }}>
                    {items.map(item => {
                      const key = `${cat}_${item.name}`
                      const done = checked[key]
                      return (
                        <div key={key} onClick={()=>toggleItem(key)} style={{ display:"flex", alignItems:"center", gap:10, background:"#FFF", borderRadius:8, padding:"9px 12px", cursor:"pointer", opacity:done?0.45:1, transition:"opacity 0.15s" }}>
                          <div style={{ width:20, height:20, borderRadius:5, border:`2px solid ${done?meta.color:"#DDD"}`, background:done?meta.color:"#FFF", display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0, transition:"all 0.15s" }}>
                            {done && <span style={{ color:"#FFF", fontSize:12, lineHeight:1 }}>✓</span>}
                          </div>
                          <span style={{ flex:1, fontFamily:"sans-serif", fontSize:13, color:"#1A1A1A", textDecoration:done?"line-through":"none" }}>
                            {item.name}
                          </span>
                          <span style={{ fontFamily:"sans-serif", fontSize:11, color:"#AAA" }}>
                            {item.qty > 0 && item.unit
                              ? `${item.qty}${item.unit}`
                              : item.qty > 0 && !item.unit
                              ? `×${item.qty}`
                              : ""}
                            {item.count > 1 && <span style={{ color:"#CCC" }}> ×{item.count}d</span>}
                          </span>
                        </div>
                      )
                    })}
                  </div>
                </div>
              )
            })}
          </div>
        </>
      )}

      {/* ── MEAL PREP ── */}
      {mode === "prep" && (
        <div style={{ overflowY:"auto", padding:"12px 12px 24px", display:"flex", flexDirection:"column", gap:10 }}>

          <div style={{ background:"#F0F7F0", borderRadius:10, padding:"12px 14px", borderLeft:"3px solid #3D7A52" }}>
            <div style={{ fontFamily:"sans-serif", fontSize:12, color:"#3D7A52", fontWeight:700, marginBottom:4 }}>
              🗓️ Do this on Sunday evening
            </div>
            <div style={{ fontFamily:"sans-serif", fontSize:11, color:"#666", lineHeight:"1.5" }}>
              These are the items used multiple times in Week {activeWeek+1}. Batch cooking them once saves you time every day.
            </div>
          </div>

          {prepTasks.length === 0 && (
            <div style={{ textAlign:"center", padding:28, color:"#BBB", fontFamily:"sans-serif", fontSize:13 }}>
              No batch cook opportunities found for this week
            </div>
          )}

          {prepTasks.map((task, i) => {
            const key = `prep_${i}`
            const done = checked[key]
            return (
              <div key={i} onClick={()=>toggleItem(key)} style={{ background:"#FFF", borderRadius:10, padding:"14px", cursor:"pointer", display:"flex", gap:12, alignItems:"flex-start", opacity:done?0.5:1, border:`1.5px solid ${done?"#3D7A52":"#EBEBEB"}`, transition:"all 0.15s" }}>
                <div style={{ fontSize:24, flexShrink:0 }}>{task.emoji}</div>
                <div style={{ flex:1 }}>
                  <div style={{ fontFamily:"sans-serif", fontSize:13, fontWeight:700, color:done?"#3D7A52":"#1A1A1A", textDecoration:done?"line-through":"none", marginBottom:3 }}>
                    {task.task}
                  </div>
                  <div style={{ fontFamily:"sans-serif", fontSize:11, color:"#999", display:"flex", gap:12 }}>
                    <span>⏱ {task.time}</span>
                    <span>📅 Used {task.uses}× this week</span>
                  </div>
                </div>
                <div style={{ width:24, height:24, borderRadius:6, border:`2px solid ${done?"#3D7A52":"#DDD"}`, background:done?"#3D7A52":"#FFF", display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0 }}>
                  {done && <span style={{ color:"#FFF", fontSize:14 }}>✓</span>}
                </div>
              </div>
            )
          })}

          {/* Standard prep tips */}
          <div style={{ background:"#FFFFF8", border:"1px solid #E8E4C8", borderRadius:10, padding:"12px 14px", marginTop:4 }}>
            <div style={{ fontSize:10, color:"#A89828", fontFamily:"sans-serif", fontWeight:700, letterSpacing:"1.5px", textTransform:"uppercase", marginBottom:8 }}>
              Always good to prep
            </div>
            {[
              "Wash and chop all veg for the week — store in airtight containers",
              "Hard boil 4–6 eggs — lasts 5 days in the fridge",
              "Fill water bottle and set it out the night before",
              "Set overnight oats before bed — takes 2 min",
            ].map((tip, i) => (
              <div key={i} style={{ display:"flex", gap:8, marginBottom:6, fontFamily:"sans-serif", fontSize:11, color:"#666", lineHeight:"1.4" }}>
                <span style={{ color:"#A89828", fontWeight:"bold" }}>·</span>
                <span>{tip}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
