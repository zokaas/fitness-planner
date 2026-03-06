import { useState, useEffect, useCallback } from "react"
import { supabase, ensureAuth } from "./supabaseClient"
import {
  MEAL_LIBRARY, EXERCISE_LIBRARY, DEFAULT_MEAL_PLAN, DEFAULT_EXERCISE_PLAN,
  MEAL_META, EX_META, INTENSITY_COLOR, MEAL_TYPES, EX_TYPES,
  WEEK_THEMES, DAY_LABELS, getMeal, getExercise, timeLbl, durLbl
} from "./data"
import { ShoppingList } from "./ShoppingList"
import { WorkoutPlanDrawer } from "./WorkoutPlanDrawer"

// ─── VAPID PUBLIC KEY (replace after running: npx web-push generate-vapid-keys) ──
const VAPID_PUBLIC_KEY = import.meta.env.VITE_VAPID_PUBLIC_KEY || ""

const urlBase64ToUint8Array = base64 => {
  const padding = "=".repeat((4 - base64.length % 4) % 4)
  const b64 = (base64 + padding).replace(/-/g, "+").replace(/_/g, "/")
  const raw = atob(b64)
  return Uint8Array.from([...raw].map(c => c.charCodeAt(0)))
}

// ─── DATE HELPERS ─────────────────────────────────────────────────────────────
const todayStr = () => new Date().toISOString().split("T")[0]
const dateStr  = d => new Date(d).toISOString().split("T")[0]

// ─── SWAP DRAWER ──────────────────────────────────────────────────────────────
function SwapDrawer({ open, mode, type, currentId, onSelect, onClose }) {
  const [search,  setSearch]  = useState("")
  const [maxTime, setMaxTime] = useState(mode === "meal" ? 30 : 60)
  const [homeOnly,setHomeOnly]= useState(false)
  useEffect(() => { if (open) setSearch("") }, [open])
  if (!open || !type) return null

  const isMeal  = mode === "meal"
  const meta    = isMeal ? MEAL_META[type] : EX_META[type] || EX_META.cardio
  const lib     = isMeal ? MEAL_LIBRARY[type] : EX_TYPES.flatMap(t => EXERCISE_LIBRARY[t].map(e => ({ ...e, type: t })))
  const timeKey = isMeal ? "time" : "duration"

  const options = lib.filter(item => {
    const s    = search.toLowerCase()
    const tOk  = item[timeKey] <= maxTime
    const sOk  = !s || item.name.toLowerCase().includes(s) || item.desc.toLowerCase().includes(s)
    const hOk  = !homeOnly || item.homeOk !== false
    return tOk && sOk && (isMeal || hOk)
  })

  return (
    <>
      <div onClick={onClose} style={{ position:"fixed",inset:0,background:"rgba(0,0,0,0.5)",zIndex:40,backdropFilter:"blur(3px)" }} />
      <div style={{ position:"fixed",bottom:0,left:0,right:0,background:"#FAFAF7",borderRadius:"20px 20px 0 0",zIndex:50,maxHeight:"85vh",display:"flex",flexDirection:"column",boxShadow:"0 -10px 50px rgba(0,0,0,0.2)" }}>
        <div style={{ display:"flex",justifyContent:"center",padding:"10px 0 2px" }}>
          <div style={{ width:36,height:4,background:"#DDD",borderRadius:2 }} />
        </div>
        <div style={{ padding:"8px 18px 12px",borderBottom:"1px solid #EDEDED",flexShrink:0 }}>
          <div style={{ display:"flex",justifyContent:"space-between",alignItems:"center" }}>
            <div>
              <div style={{ fontSize:9,fontFamily:"sans-serif",letterSpacing:"1.5px",color:meta.accent,textTransform:"uppercase",fontWeight:700 }}>
                {isMeal ? `${meta.emoji} Swap ${meta.label}` : "↕ Swap Workout"}
              </div>
              <div style={{ fontSize:18,fontWeight:"bold",color:"#1A1A1A" }}>Choose a replacement</div>
            </div>
            <button onClick={onClose} style={{ background:"#F0F0F0",border:"none",borderRadius:"50%",width:32,height:32,cursor:"pointer",fontSize:18,display:"flex",alignItems:"center",justifyContent:"center" }}>×</button>
          </div>
          <input value={search} onChange={e=>setSearch(e.target.value)} placeholder="Search…" autoFocus
            style={{ marginTop:10,width:"100%",padding:"8px 12px",borderRadius:8,border:"1.5px solid #E0E0E0",fontFamily:"sans-serif",fontSize:13,background:"#FFF",boxSizing:"border-box",outline:"none",color:"#333" }} />
          <div style={{ display:"flex",alignItems:"center",gap:10,marginTop:8 }}>
            <span style={{ fontSize:10,color:"#999",fontFamily:"sans-serif",whiteSpace:"nowrap" }}>{isMeal?"Max cook:":"Max time:"}</span>
            <input type="range" min={0} max={isMeal?30:90} step={isMeal?5:10} value={maxTime} onChange={e=>setMaxTime(+e.target.value)} style={{ flex:1,accentColor:meta.accent }} />
            <span style={{ fontSize:11,color:"#555",fontFamily:"sans-serif",minWidth:40 }}>{maxTime} min</span>
          </div>
          {!isMeal && (
            <div style={{ display:"flex",alignItems:"center",gap:8,marginTop:6,cursor:"pointer" }} onClick={()=>setHomeOnly(!homeOnly)}>
              <div style={{ width:18,height:18,borderRadius:4,border:`2px solid ${homeOnly?"#C0392B":"#DDD"}`,background:homeOnly?"#C0392B":"#FFF",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0 }}>
                {homeOnly && <span style={{ color:"#FFF",fontSize:11 }}>✓</span>}
              </div>
              <span style={{ fontSize:11,fontFamily:"sans-serif",color:"#666" }}>Home-friendly only 🏠</span>
            </div>
          )}
        </div>
        <div style={{ overflowY:"auto",padding:"10px 14px 28px",display:"flex",flexDirection:"column",gap:7 }}>
          {options.length === 0 && <div style={{ textAlign:"center",padding:28,color:"#BBB",fontFamily:"sans-serif",fontSize:13 }}>No matches</div>}
          {options.map(item => {
            const isCur = item.id === currentId
            const em = !isMeal ? EX_META[item.type] || EX_META.cardio : null
            const bdColor = isCur ? (isMeal ? meta.accent : em.accent) : "#EBEBEB"
            const bg = isCur ? (isMeal ? meta.bg : em.bg) : "#FFF"
            return (
              <div key={item.id} onClick={()=>{ onSelect(item.id); onClose() }} style={{ background:bg,border:`1.5px solid ${bdColor}`,borderRadius:10,padding:"11px 13px",cursor:"pointer",display:"flex",justifyContent:"space-between",alignItems:"flex-start",gap:8 }}>
                <div style={{ flex:1 }}>
                  <div style={{ display:"flex",alignItems:"center",gap:6,flexWrap:"wrap",marginBottom:2 }}>
                    {!isMeal && em && <span style={{ fontSize:9,background:em.accent,color:"#fff",borderRadius:4,padding:"1px 5px",fontFamily:"sans-serif",fontWeight:700 }}>{em.emoji} {em.label}</span>}
                    <span style={{ fontSize:13,fontWeight:700,color:"#1A1A1A" }}>{item.name}</span>
                    {isCur && <span style={{ fontSize:8,background:isMeal?meta.accent:em.accent,color:"#fff",borderRadius:4,padding:"1px 5px",fontFamily:"sans-serif",fontWeight:700 }}>CURRENT</span>}
                  </div>
                  <div style={{ fontSize:11,color:"#888",fontFamily:"sans-serif",lineHeight:"1.35" }}>{item.desc}</div>
                  <div style={{ fontSize:10,color:"#BBB",fontFamily:"sans-serif",marginTop:4 }}>
                    {isMeal ? `⏱ ${timeLbl(item.time)}` : `⏱ ${durLbl(item.duration)}${item.duration>0?` · ~${item.kcalBurn} kcal`:""}`}
                    {!isMeal && item.homeOk && <span style={{ marginLeft:6,color:"#4A8C5C" }}>🏠</span>}
                  </div>
                </div>
                <div style={{ textAlign:"right",flexShrink:0 }}>
                  {isMeal
                    ? <><div style={{ fontSize:14,fontWeight:700,color:meta.accent,fontFamily:"sans-serif" }}>{item.kcal}</div><div style={{ fontSize:9,color:"#CCC",fontFamily:"sans-serif" }}>kcal</div></>
                    : item.duration>0
                      ? <><div style={{ fontSize:14,fontWeight:700,color:"#C0392B",fontFamily:"sans-serif" }}>{item.kcalBurn}</div><div style={{ fontSize:9,color:"#CCC",fontFamily:"sans-serif" }}>burn</div></>
                      : <div style={{ fontSize:22 }}>😴</div>
                  }
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </>
  )
}

// ─── WEIGHT CHART (SVG) with goal line ───────────────────────────────────────
const PLAN_START   = new Date("2025-03-03")
const GOAL_DATE    = new Date("2025-10-01")
const START_WEIGHT = 74
const GOAL_WEIGHT  = 57
const TOTAL_DAYS   = (GOAL_DATE - PLAN_START) / 86400000

function targetWeightOnDate(dateStr) {
  const d = new Date(dateStr)
  const daysSinceStart = (d - PLAN_START) / 86400000
  const t = Math.max(0, Math.min(1, daysSinceStart / TOTAL_DAYS))
  return START_WEIGHT - (START_WEIGHT - GOAL_WEIGHT) * t
}

function WeightChart({ entries }) {
  const W = 320, H = 140, PAD = { t:10, r:14, b:30, l:36 }

  // Build goal line points: start → today → goal date
  const today = new Date()
  const goalPoints = [
    { date: "2025-03-03", weight: START_WEIGHT },
    { date: GOAL_DATE.toISOString().split("T")[0], weight: GOAL_WEIGHT },
  ]

  const allWeights = [
    ...entries.map(e => e.weight_kg),
    START_WEIGHT, GOAL_WEIGHT
  ]
  const minW = Math.min(...allWeights) - 1
  const maxW = Math.max(...allWeights) + 1

  // Date range: plan start → goal date
  const startMs = PLAN_START.getTime()
  const endMs   = GOAL_DATE.getTime()
  const totalMs = endMs - startMs

  const xByDate = dateStr => {
    const ms = new Date(dateStr).getTime()
    const t  = Math.max(0, Math.min(1, (ms - startMs) / totalMs))
    return PAD.l + t * (W - PAD.l - PAD.r)
  }
  const yByWeight = w => PAD.t + (1 - (w - minW) / (maxW - minW)) * (H - PAD.t - PAD.b)

  const goalLinePoints = goalPoints.map(p => `${xByDate(p.date)},${yByWeight(p.weight)}`).join(" ")

  const todayX = xByDate(today.toISOString().split("T")[0])

  const currentWeight = entries.length > 0 ? entries[entries.length - 1].weight_kg : null
  const targetNow     = targetWeightOnDate(today.toISOString().split("T")[0])
  const diff          = currentWeight !== null ? (currentWeight - targetNow).toFixed(1) : null
  const aheadBehind   = diff !== null ? (parseFloat(diff) <= 0 ? `${Math.abs(diff)} kg ahead of target 🎉` : `${diff} kg behind target`) : null

  return (
    <div>
      {/* Summary row */}
      <div style={{ display:"flex", justifyContent:"space-between", marginBottom:8, fontFamily:"sans-serif", flexWrap:"wrap", gap:4 }}>
        <div style={{ fontSize:11, color:"#999" }}>Start: <strong style={{ color:"#333" }}>{START_WEIGHT} kg</strong></div>
        {diff !== null && (
          <div style={{ fontSize:11, fontWeight:700, color:parseFloat(diff)<=0?"#3D7A52":"#C0392B", background:parseFloat(diff)<=0?"#EEF7EE":"#FEF0EE", borderRadius:6, padding:"2px 8px" }}>
            {aheadBehind}
          </div>
        )}
        <div style={{ fontSize:11, color:"#999" }}>Goal: <strong style={{ color:"#C8842A" }}>{GOAL_WEIGHT} kg</strong></div>
      </div>

      {entries.length < 1 && (
        <div style={{ textAlign:"center", padding:"16px 0", color:"#BBB", fontFamily:"sans-serif", fontSize:12 }}>
          Log your weight to see progress vs target
        </div>
      )}

      <svg width="100%" viewBox={`0 0 ${W} ${H}`} style={{ overflow:"visible" }}>
        <defs>
          <linearGradient id="wg" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#3D7A52" stopOpacity="0.25" />
            <stop offset="100%" stopColor="#3D7A52" stopOpacity="0" />
          </linearGradient>
        </defs>

        {/* Grid lines */}
        {[0,.25,.5,.75,1].map(t => {
          const y = PAD.t + t*(H-PAD.t-PAD.b)
          const v = (maxW - t*(maxW-minW)).toFixed(0)
          return (
            <g key={t}>
              <line x1={PAD.l} y1={y} x2={W-PAD.r} y2={y} stroke="#EBEBEB" strokeWidth={1} />
              <text x={PAD.l-4} y={y+4} textAnchor="end" fontSize={8} fill="#CCC" fontFamily="sans-serif">{v}</text>
            </g>
          )
        })}

        {/* Goal dashed line */}
        <polyline points={goalLinePoints} fill="none" stroke="#C8842A" strokeWidth={1.5} strokeDasharray="5,4" strokeLinejoin="round" opacity={0.7} />
        <text x={xByDate("2025-10-01")-2} y={yByWeight(GOAL_WEIGHT)-6} textAnchor="end" fontSize={8} fill="#C8842A" fontFamily="sans-serif">goal</text>

        {/* Today vertical line */}
        <line x1={todayX} y1={PAD.t} x2={todayX} y2={H-PAD.b} stroke="#DDD" strokeWidth={1} strokeDasharray="3,3" />
        <text x={todayX} y={H-PAD.b+14} textAnchor="middle" fontSize={7} fill="#BBB" fontFamily="sans-serif">today</text>

        {/* Actual weight area + line */}
        {entries.length >= 2 && (() => {
          const pts = entries.map(e => `${xByDate(e.date)},${yByWeight(e.weight_kg)}`).join(" ")
          const area = `${xByDate(entries[0].date)},${H-PAD.b} ${pts} ${xByDate(entries[entries.length-1].date)},${H-PAD.b}`
          return (
            <>
              <polygon points={area} fill="url(#wg)" />
              <polyline points={pts} fill="none" stroke="#3D7A52" strokeWidth={2.5} strokeLinejoin="round" />
            </>
          )
        })()}

        {/* Dots */}
        {entries.map((e, i) => (
          <circle key={i} cx={xByDate(e.date)} cy={yByWeight(e.weight_kg)} r={3.5} fill="#3D7A52" />
        ))}

        {/* Month labels on x axis */}
        {["Mar","Apr","May","Jun","Jul","Aug","Sep","Oct"].map((m, i) => {
          const dateStr = `2025-${String(i+3).padStart(2,"0")}-01`
          if (i+3 > 10) return null
          const x = xByDate(dateStr)
          return <text key={m} x={x} y={H-PAD.b+22} textAnchor="middle" fontSize={7} fill="#CCC" fontFamily="sans-serif">{m}</text>
        })}
      </svg>

      {/* Legend */}
      <div style={{ display:"flex", gap:14, marginTop:6, fontFamily:"sans-serif", fontSize:10, color:"#999" }}>
        <div style={{ display:"flex", alignItems:"center", gap:4 }}>
          <svg width={20} height={8}><line x1={0} y1={4} x2={20} y2={4} stroke="#3D7A52" strokeWidth={2.5}/></svg>
          Actual
        </div>
        <div style={{ display:"flex", alignItems:"center", gap:4 }}>
          <svg width={20} height={8}><line x1={0} y1={4} x2={20} y2={4} stroke="#C8842A" strokeWidth={1.5} strokeDasharray="4,3"/></svg>
          Target (57 kg by Oct)
        </div>
      </div>
    </div>
  )
}

// ─── PROGRESS VIEW ────────────────────────────────────────────────────────────
function ProgressView({ weightLog, completions, onAddWeight, onDeleteWeight, startWeight }) {
  const [input, setInput] = useState("")
  const [date,  setDate]  = useState(todayStr())
  const [err,   setErr]   = useState("")

  const handleAdd = () => {
    const w = parseFloat(input)
    if (isNaN(w) || w < 20 || w > 300) { setErr("Enter a valid weight (20–300 kg)"); return }
    setErr("")
    onAddWeight(date, w)
    setInput("")
  }

  // Count completed days
  const completedDays = new Set(completions.map(c => c.date)).size
  const totalWorkouts = completions.filter(c => c.type === "workout").length
  const goalWeight = 57

  return (
    <div style={{ overflowY:"auto",padding:"14px 14px 24px",display:"flex",flexDirection:"column",gap:14 }}>

      {/* Stats row */}
      <div style={{ display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:8 }}>
        {[
          { label:"Start", val:`${startWeight} kg`, color:"#666" },
          { label:"Goal",  val:`${goalWeight} kg`,  color:"#C8842A" },
          { label:"Workouts done", val:totalWorkouts, color:"#3D7A52" },
        ].map(s => (
          <div key={s.label} style={{ background:"#FFF",borderRadius:10,padding:"10px 8px",textAlign:"center" }}>
            <div style={{ fontSize:9,color:"#BBB",fontFamily:"sans-serif",letterSpacing:"0.5px",textTransform:"uppercase" }}>{s.label}</div>
            <div style={{ fontSize:16,fontWeight:700,color:s.color,fontFamily:"sans-serif",marginTop:2 }}>{s.val}</div>
          </div>
        ))}
      </div>

      {/* Weight chart */}
      <div style={{ background:"#FFF",borderRadius:12,padding:16 }}>
        <div style={{ fontSize:9,color:"#3D7A52",fontFamily:"sans-serif",letterSpacing:"2px",textTransform:"uppercase",fontWeight:700,marginBottom:10 }}>⚖️ Weight Progress</div>
        <WeightChart entries={weightLog} />
      </div>

      {/* Log weight */}
      <div style={{ background:"#FFF",borderRadius:12,padding:16 }}>
        <div style={{ fontSize:9,color:"#3D7A52",fontFamily:"sans-serif",letterSpacing:"2px",textTransform:"uppercase",fontWeight:700,marginBottom:12 }}>Log Today's Weight</div>
        <div style={{ display:"flex",gap:8,marginBottom:8 }}>
          <input type="date" value={date} onChange={e=>setDate(e.target.value)}
            style={{ flex:1,padding:"8px 10px",border:"1.5px solid #E0E0E0",borderRadius:8,fontFamily:"sans-serif",fontSize:13,outline:"none" }} />
          <input type="number" value={input} onChange={e=>setInput(e.target.value)} placeholder="kg" step="0.1"
            style={{ width:80,padding:"8px 10px",border:"1.5px solid #E0E0E0",borderRadius:8,fontFamily:"sans-serif",fontSize:13,outline:"none" }}
            onKeyDown={e=>e.key==="Enter"&&handleAdd()} />
          <button onClick={handleAdd} style={{ background:"#1E3214",color:"#FFF",border:"none",borderRadius:8,padding:"8px 16px",fontFamily:"sans-serif",fontSize:13,fontWeight:700,cursor:"pointer" }}>Log</button>
        </div>
        {err && <div style={{ fontSize:11,color:"#C0392B",fontFamily:"sans-serif" }}>{err}</div>}
      </div>

      {/* History */}
      {weightLog.length > 0 && (
        <div style={{ background:"#FFF",borderRadius:12,padding:16 }}>
          <div style={{ fontSize:9,color:"#999",fontFamily:"sans-serif",letterSpacing:"2px",textTransform:"uppercase",fontWeight:700,marginBottom:10 }}>History</div>
          <div style={{ display:"flex",flexDirection:"column",gap:6 }}>
            {[...weightLog].reverse().slice(0,10).map(e => (
              <div key={e.id||e.date} style={{ display:"flex",justifyContent:"space-between",alignItems:"center",padding:"6px 8px",background:"#FAFAF7",borderRadius:8 }}>
                <span style={{ fontSize:12,fontFamily:"sans-serif",color:"#555" }}>{e.date}</span>
                <span style={{ fontSize:14,fontWeight:700,fontFamily:"sans-serif",color:"#1E3214" }}>{e.weight_kg} kg</span>
                <button onClick={()=>onDeleteWeight(e.id||e.date)} style={{ background:"none",border:"none",cursor:"pointer",color:"#CCC",fontSize:14,padding:"0 4px" }}>×</button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

// ─── LIBRARY VIEW ─────────────────────────────────────────────────────────────
function LibraryView({ mode }) {
  const isMeal = mode === "meals"
  const cats   = isMeal ? Object.keys(MEAL_LIBRARY) : EX_TYPES
  const [active,   setActive]   = useState(cats[0])
  const [search,   setSearch]   = useState("")
  const [maxTime,  setMaxTime]  = useState(isMeal ? 30 : 60)
  const [homeOnly, setHomeOnly] = useState(false)
  useEffect(() => { setActive(cats[0]); setSearch("") }, [mode])

  const meta = isMeal ? MEAL_META[active] : EX_META[active]
  const lib  = isMeal ? MEAL_LIBRARY[active] : EXERCISE_LIBRARY[active]

  const filtered = lib.filter(item => {
    const s   = search.toLowerCase()
    const tOk = (isMeal ? item.time : item.duration) <= maxTime
    const sOk = !s || item.name.toLowerCase().includes(s) || item.desc.toLowerCase().includes(s)
    const hOk = !homeOnly || item.homeOk !== false
    return tOk && sOk && (isMeal || hOk)
  })

  return (
    <div style={{ display:"flex",flexDirection:"column",height:"100%",overflow:"hidden" }}>
      <div style={{ display:"flex",background:"#FFF",borderBottom:"1.5px solid #EBEBEB",flexShrink:0,overflowX:"auto" }}>
        {cats.map(t => {
          const m = isMeal ? MEAL_META[t] : EX_META[t]
          const count = isMeal ? MEAL_LIBRARY[t].length : EXERCISE_LIBRARY[t].length
          return (
            <button key={t} onClick={()=>{ setActive(t); setSearch("") }} style={{ flex:1,minWidth:58,padding:"10px 4px 8px",border:"none",borderBottom:active===t?`3px solid ${m.accent}`:"3px solid transparent",background:"transparent",color:active===t?m.accent:"#AAA",fontFamily:"sans-serif",fontSize:10,fontWeight:active===t?700:400,cursor:"pointer" }}>
              <div style={{ fontSize:15,marginBottom:2 }}>{m.emoji}</div>
              {m.label}
              <div style={{ fontSize:9,color:active===t?m.accent:"#CCC",marginTop:1 }}>{count}</div>
            </button>
          )
        })}
      </div>
      <div style={{ background:"#FFF",padding:"10px 14px",borderBottom:"1px solid #EBEBEB",flexShrink:0 }}>
        <input value={search} onChange={e=>setSearch(e.target.value)} placeholder={`Search ${meta.label.toLowerCase()}…`}
          style={{ width:"100%",padding:"8px 12px",borderRadius:8,border:"1.5px solid #E0E0E0",fontFamily:"sans-serif",fontSize:13,background:"#FAFAFA",boxSizing:"border-box",outline:"none",color:"#333",marginBottom:8 }} />
        <div style={{ display:"flex",alignItems:"center",gap:10 }}>
          <span style={{ fontSize:10,color:"#999",fontFamily:"sans-serif",whiteSpace:"nowrap" }}>{isMeal?"Max cook:":"Max time:"}</span>
          <input type="range" min={0} max={isMeal?30:90} step={isMeal?5:10} value={maxTime} onChange={e=>setMaxTime(+e.target.value)} style={{ flex:1,accentColor:meta.accent }} />
          <span style={{ fontSize:11,color:"#555",fontFamily:"sans-serif",minWidth:40 }}>{maxTime} min</span>
        </div>
        {!isMeal && (
          <div style={{ display:"flex",alignItems:"center",gap:8,marginTop:6,cursor:"pointer" }} onClick={()=>setHomeOnly(!homeOnly)}>
            <div style={{ width:18,height:18,borderRadius:4,border:`2px solid ${homeOnly?meta.accent:"#DDD"}`,background:homeOnly?meta.accent:"#FFF",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0 }}>
              {homeOnly && <span style={{ color:"#FFF",fontSize:11 }}>✓</span>}
            </div>
            <span style={{ fontSize:11,fontFamily:"sans-serif",color:"#666" }}>Home-friendly only 🏠</span>
          </div>
        )}
      </div>
      <div style={{ padding:"5px 14px 2px",fontFamily:"sans-serif",fontSize:10,color:"#BBB",flexShrink:0 }}>{filtered.length} options</div>
      <div style={{ overflowY:"auto",padding:"4px 12px 20px",display:"flex",flexDirection:"column",gap:7 }}>
        {filtered.length===0 && <div style={{ textAlign:"center",padding:28,color:"#BBB",fontFamily:"sans-serif",fontSize:13 }}>No matches</div>}
        {filtered.map(item => (
          <div key={item.id} style={{ background:meta.bg,borderRadius:10,padding:"11px 13px",borderLeft:`3px solid ${meta.accent}`,display:"flex",justifyContent:"space-between",alignItems:"flex-start",gap:8 }}>
            <div style={{ flex:1 }}>
              <div style={{ display:"flex",alignItems:"center",gap:6,flexWrap:"wrap" }}>
                <span style={{ fontSize:13,fontWeight:700,color:"#1A1A1A" }}>{item.name}</span>
                {!isMeal && item.homeOk && <span style={{ fontSize:9,background:"#4A8C5C",color:"#fff",borderRadius:4,padding:"1px 4px",fontFamily:"sans-serif" }}>🏠 Home</span>}
              </div>
              <div style={{ fontSize:11,color:"#777",fontFamily:"sans-serif",lineHeight:"1.4",marginTop:3 }}>{item.desc}</div>
              <div style={{ fontSize:10,color:"#BBB",fontFamily:"sans-serif",marginTop:4,display:"flex",gap:10,flexWrap:"wrap" }}>
                {isMeal ? <span>⏱ {timeLbl(item.time)}</span> : <>
                  <span>⏱ {durLbl(item.duration)}</span>
                  {item.duration>0 && <span>🔥 ~{item.kcalBurn} kcal</span>}
                  {item.intensity!=="none" && <span style={{ color:INTENSITY_COLOR[item.intensity],textTransform:"capitalize",fontWeight:600 }}>● {item.intensity}</span>}
                </>}
              </div>
            </div>
            <div style={{ textAlign:"right",flexShrink:0 }}>
              {isMeal
                ? <><div style={{ fontSize:14,fontWeight:700,color:meta.accent,fontFamily:"sans-serif" }}>{item.kcal}</div><div style={{ fontSize:9,color:"#CCC",fontFamily:"sans-serif" }}>kcal</div></>
                : item.duration>0
                  ? <><div style={{ fontSize:14,fontWeight:700,color:meta.accent,fontFamily:"sans-serif" }}>{item.kcalBurn}</div><div style={{ fontSize:9,color:"#CCC",fontFamily:"sans-serif" }}>burn</div></>
                  : <div style={{ fontSize:22 }}>😴</div>
              }
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

// ─── MAIN APP ─────────────────────────────────────────────────────────────────
export default function App() {
  const [user,        setUser]        = useState(null)
  const [loading,     setLoading]     = useState(true)
  const [mealPlan,    setMealPlan]    = useState([...DEFAULT_MEAL_PLAN])
  const [exPlan,      setExPlan]      = useState([...DEFAULT_EXERCISE_PLAN])
  const [completions, setCompletions] = useState([])   // { date, type }
  const [weightLog,   setWeightLog]   = useState([])   // { id, date, weight_kg }
  const [activeWeek,  setActiveWeek]  = useState(0)
  const [activeDay,   setActiveDay]   = useState(0)
  const [view,        setView]        = useState("plan")
  const [swap,        setSwap]        = useState({ open:false, mode:null, type:null })
  const [workoutPlan, setWorkoutPlan] = useState({ open:false })
  const [notifStatus, setNotifStatus] = useState("default") // default | granted | denied
  const [saving,      setSaving]      = useState(false)

  // ── Init ────────────────────────────────────────────────────────────────────
  useEffect(() => {
    (async () => {
      try {
        const u = await ensureAuth()
        setUser(u)
        await Promise.all([loadPlan(u.id), loadCompletions(u.id), loadWeightLog(u.id)])
      } catch (e) { console.error("Auth error", e) }
      finally { setLoading(false) }
    })()
    if ("Notification" in window) setNotifStatus(Notification.permission)
    registerSW()
  }, [])

  const registerSW = async () => {
    if (!("serviceWorker" in navigator)) return
    try { await navigator.serviceWorker.register("/fitness-planner/sw.js") } catch (e) { console.warn("SW registration failed", e) }
  }

  // ── Supabase loaders ────────────────────────────────────────────────────────
  const loadPlan = async userId => {
    const { data } = await supabase.from("user_plans").select("*").eq("user_id", userId)
    if (!data?.length) return
    const mp = [...DEFAULT_MEAL_PLAN]
    const ep = [...DEFAULT_EXERCISE_PLAN]
    data.forEach(row => {
      if (row.meal_type) { if (mp[row.day_index]) mp[row.day_index][row.meal_type] = row.item_id }
      else { ep[row.day_index] = row.item_id }
    })
    setMealPlan(mp)
    setExPlan(ep)
  }

  const loadCompletions = async userId => {
    const thirtyDaysAgo = new Date(); thirtyDaysAgo.setDate(thirtyDaysAgo.getDate()-30)
    const { data } = await supabase.from("completions").select("*").eq("user_id", userId).gte("date", dateStr(thirtyDaysAgo))
    setCompletions(data || [])
  }

  const loadWeightLog = async userId => {
    const { data } = await supabase.from("weight_log").select("*").eq("user_id", userId).order("date", { ascending:true })
    setWeightLog(data || [])
  }

  // ── Plan save ───────────────────────────────────────────────────────────────
  const savePlanRow = async (dayIndex, mealType, itemId) => {
    if (!user) return
    await supabase.from("user_plans").upsert({
      user_id: user.id, day_index: dayIndex, meal_type: mealType || null, item_id: itemId
    }, { onConflict: "user_id,day_index,meal_type" })
  }

  // ── Swap handlers ───────────────────────────────────────────────────────────
  const dayIndex = activeWeek * 7 + activeDay
  const dayMeals = mealPlan[dayIndex] || DEFAULT_MEAL_PLAN[0]
  const dayExId  = exPlan[dayIndex] || "r1"
  const dayEx    = getExercise(dayExId)
  const isFriday = activeDay === 4

  const handleMealSelect = async id => {
    const np = [...mealPlan]
    np[dayIndex] = { ...np[dayIndex], [swap.type]: id }
    setMealPlan(np)
    await savePlanRow(dayIndex, swap.type, id)
  }
  const handleExSelect = async id => {
    const np = [...exPlan]; np[dayIndex] = id; setExPlan(np)
    await savePlanRow(dayIndex, null, id)
  }

  // ── Completion toggle ───────────────────────────────────────────────────────
  const toggleComplete = async (type) => {
    if (!user) return
    const date = (() => {
      const d = new Date("2025-03-03") // start date Mon W1
      d.setDate(d.getDate() + dayIndex)
      return dateStr(d)
    })()
    const key = `${date}__${type}`
    const exists = completions.find(c => c.date===date && c.type===type)
    if (exists) {
      setCompletions(prev => prev.filter(c => !(c.date===date && c.type===type)))
      await supabase.from("completions").delete().eq("user_id", user.id).eq("date", date).eq("type", type)
    } else {
      const newEntry = { user_id:user.id, date, type }
      setCompletions(prev => [...prev, { date, type }])
      await supabase.from("completions").upsert(newEntry, { onConflict:"user_id,date,type" })
    }
  }

  const isComplete = (type) => {
    const d = new Date("2025-03-03"); d.setDate(d.getDate() + dayIndex)
    const date = dateStr(d)
    return completions.some(c => c.date===date && c.type===type)
  }

  // ── Weight log ──────────────────────────────────────────────────────────────
  const addWeight = async (date, weight_kg) => {
    if (!user) return
    const row = { user_id:user.id, date, weight_kg }
    const { data } = await supabase.from("weight_log").upsert(row, { onConflict:"user_id,date" }).select()
    setWeightLog(prev => {
      const filtered = prev.filter(e => e.date !== date)
      return [...filtered, data?.[0] || row].sort((a,b) => a.date.localeCompare(b.date))
    })
  }

  const deleteWeight = async (idOrDate) => {
    if (!user) return
    await supabase.from("weight_log").delete().eq("id", idOrDate)
    setWeightLog(prev => prev.filter(e => e.id !== idOrDate))
  }

  // ── Notifications ────────────────────────────────────────────────────────────
  const requestNotifications = async () => {
    if (!("Notification" in window) || !("serviceWorker" in navigator)) {
      alert("Push notifications are not supported in this browser.")
      return
    }
    const permission = await Notification.requestPermission()
    setNotifStatus(permission)
    if (permission !== "granted") return
    try {
      const reg = await navigator.serviceWorker.ready
      const sub = await reg.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: urlBase64ToUint8Array(VAPID_PUBLIC_KEY)
      })
      await supabase.from("push_subscriptions").upsert({
        user_id: user.id,
        subscription: sub.toJSON(),
        meal_reminder: true,
        workout_reminder: true,
        weekly_summary: true,
      }, { onConflict: "user_id" })
    } catch (e) { console.error("Push subscription failed", e) }
  }

  const disableNotifications = async () => {
    if (!user) return
    const reg = await navigator.serviceWorker.ready
    const sub = await reg.pushManager.getSubscription()
    if (sub) await sub.unsubscribe()
    await supabase.from("push_subscriptions").delete().eq("user_id", user.id)
    setNotifStatus("default")
  }

  // ── Computed ────────────────────────────────────────────────────────────────
  const exMeta    = dayEx ? EX_META[dayEx.type] : EX_META.recovery
  const mealKcal  = MEAL_TYPES.reduce((s,t) => { const m=getMeal(dayMeals[t]); return s+(m?.kcal||0) }, 0)
  const netKcal   = mealKcal - (dayEx?.kcalBurn||0)
  const workoutDone = isComplete("workout")

  // ── Loading screen ──────────────────────────────────────────────────────────
  if (loading) return (
    <div style={{ height:"100vh",display:"flex",alignItems:"center",justifyContent:"center",background:"#1E3214",flexDirection:"column",gap:16 }}>
      <div style={{ fontSize:32 }}>🌿</div>
      <div style={{ fontFamily:"sans-serif",color:"#9DC88D",fontSize:13 }}>Loading your plan…</div>
    </div>
  )

  return (
    <div style={{ fontFamily:"'Georgia',serif",background:"#F5F3EF",height:"100vh",display:"flex",flexDirection:"column",maxWidth:480,margin:"0 auto",overflow:"hidden" }}>

      {/* HEADER */}
      <div style={{ background:"#1E3214",padding:"12px 18px 10px",flexShrink:0 }}>
        <div style={{ display:"flex",justifyContent:"space-between",alignItems:"flex-end" }}>
          <div>
            <div style={{ fontSize:9,letterSpacing:"2.5px",color:"#7AAD6A",textTransform:"uppercase",fontFamily:"sans-serif",marginBottom:2 }}>March – April 2025</div>
            <div style={{ fontSize:19,color:"#FFF",fontWeight:"bold" }}>
              {view==="plan"?"My Plan":view==="progress"?"Progress":view==="meals"?"Meal Library":"Exercise Library"}
            </div>
          </div>
          {/* Notification bell */}
          <button onClick={notifStatus==="granted" ? disableNotifications : requestNotifications}
            title={notifStatus==="granted"?"Notifications on – tap to disable":"Enable notifications"}
            style={{ background:"transparent",border:"none",cursor:"pointer",fontSize:20,opacity:notifStatus==="denied"?0.3:1 }}>
            {notifStatus==="granted" ? "🔔" : "🔕"}
          </button>
        </div>
      </div>

      {/* PLAN VIEW */}
      {view === "plan" && (
        <>
          <div style={{ display:"flex",background:"#162810",flexShrink:0 }}>
            {WEEK_THEMES.map((th,i) => (
              <button key={i} onClick={()=>{ setActiveWeek(i); setActiveDay(0) }} style={{ flex:1,padding:"8px 2px",border:"none",background:activeWeek===i?"#3A6228":"transparent",color:activeWeek===i?"#FFF":"#6A9A5A",fontFamily:"sans-serif",fontSize:10,fontWeight:activeWeek===i?700:400,cursor:"pointer" }}>
                W{i+1}
              </button>
            ))}
          </div>
          <div style={{ background:"#ECF3E8",padding:"6px 16px",fontFamily:"sans-serif",fontSize:10,color:"#4A7A3A",letterSpacing:"1px",textTransform:"uppercase",fontWeight:600,flexShrink:0,display:"flex",justifyContent:"space-between",alignItems:"center" }}>
            <span>{WEEK_THEMES[activeWeek]}</span>
            {isFriday && <span style={{ background:"#4A7A3A",color:"#fff",fontSize:8,padding:"2px 7px",borderRadius:10 }}>🏠 WFH</span>}
          </div>
          <div style={{ display:"flex",background:"#FFF",borderBottom:"1px solid #EBEBEB",flexShrink:0 }}>
            {DAY_LABELS.map((d,i) => (
              <button key={i} onClick={()=>setActiveDay(i)} style={{ flex:1,padding:"10px 3px",border:"none",background:activeDay===i?"#1E3214":"transparent",color:activeDay===i?"#FFF":"#999",fontFamily:"sans-serif",fontSize:11,fontWeight:activeDay===i?700:400,cursor:"pointer" }}>{d}</button>
            ))}
          </div>
          {/* Stats bar */}
          <div style={{ background:"#FFF",borderBottom:"1px solid #EBEBEB",padding:"7px 12px",display:"flex",gap:6,fontFamily:"sans-serif",flexShrink:0 }}>
            {[
              { label:"Food",  val:`${mealKcal} kcal`, color:"#C8842A" },
              { label:"Burn",  val:dayEx?.kcalBurn>0?`−${dayEx.kcalBurn}`:"Rest", color:"#C0392B" },
              { label:"Net",   val:`${Math.max(0,netKcal)} kcal`, color:netKcal<=1300?"#3D7A52":"#555" },
            ].map(s => (
              <div key={s.label} style={{ flex:1,textAlign:"center",background:"#FAFAFA",borderRadius:8,padding:"5px 4px" }}>
                <div style={{ fontSize:9,color:"#BBB",letterSpacing:"0.5px",textTransform:"uppercase" }}>{s.label}</div>
                <div style={{ fontSize:12,fontWeight:700,color:s.color,marginTop:1 }}>{s.val}</div>
              </div>
            ))}
          </div>

          {/* Scrollable content */}
          <div style={{ overflowY:"auto",padding:"10px 12px 20px",display:"flex",flexDirection:"column",gap:8 }}>

            {/* WORKOUT CARD */}
            <div>
              <div style={{ fontSize:9,fontFamily:"sans-serif",letterSpacing:"2px",color:"#999",textTransform:"uppercase",marginBottom:5,paddingLeft:2 }}>Today's Workout</div>
              {dayEx && (
                <div style={{ background:exMeta.bg,border:`1.5px solid ${workoutDone?"#3D7A52":"#E8E8E8"}`,borderRadius:12,padding:14,position:"relative" }}>
                  <div style={{ display:"flex",justifyContent:"space-between",alignItems:"flex-start",gap:10 }}>
                    <div style={{ flex:1, cursor:"pointer" }} onClick={()=>setSwap({ open:true, mode:"exercise", type:"cardio" })}>
                      <div style={{ display:"flex",alignItems:"center",gap:6,marginBottom:4,flexWrap:"wrap" }}>
                        <span style={{ fontSize:9,fontFamily:"sans-serif",letterSpacing:"1.5px",textTransform:"uppercase",color:exMeta.accent,fontWeight:700 }}>{exMeta.emoji} {exMeta.label}</span>
                        {dayEx.homeOk && <span style={{ fontSize:8,background:"#4A8C5C",color:"#fff",padding:"1px 5px",borderRadius:4,fontFamily:"sans-serif",fontWeight:700 }}>🏠 Home OK</span>}
                        <span style={{ fontSize:8,fontFamily:"sans-serif",fontWeight:700,color:INTENSITY_COLOR[dayEx.intensity],textTransform:"capitalize" }}>● {dayEx.intensity}</span>
                      </div>
                      <div style={{ fontSize:16,fontWeight:"bold",color:workoutDone?"#3D7A52":"#1A1A1A",textDecoration:workoutDone?"line-through":"none" }}>{dayEx.name}</div>
                      <div style={{ fontSize:11,color:"#666",fontFamily:"sans-serif",lineHeight:"1.45",marginTop:4 }}>{dayEx.desc}</div>
                      {dayEx.equipment!=="None" && <div style={{ fontSize:10,color:"#AAA",fontFamily:"sans-serif",marginTop:5 }}>🎒 {dayEx.equipment}</div>}
                      <div style={{ fontSize:9,color:"#CCC",fontFamily:"sans-serif",marginTop:6 }}>TAP FOR FULL PLAN →</div>
                    </div>
                    <div style={{ display:"flex",flexDirection:"column",alignItems:"flex-end",gap:8,flexShrink:0 }}>
                      {dayEx.duration > 0 ? (
                        <div style={{ textAlign:"right" }}>
                          <div style={{ fontSize:15,fontWeight:700,color:exMeta.accent,fontFamily:"sans-serif" }}>{dayEx.duration}</div>
                          <div style={{ fontSize:9,color:"#BBB",fontFamily:"sans-serif" }}>min</div>
                          <div style={{ fontSize:12,fontWeight:700,color:"#C0392B",fontFamily:"sans-serif",marginTop:4 }}>−{dayEx.kcalBurn}</div>
                          <div style={{ fontSize:9,color:"#BBB",fontFamily:"sans-serif" }}>kcal</div>
                        </div>
                      ) : <div style={{ fontSize:26 }}>😴</div>}
                      {/* Swap + Done buttons */}
                      <button onClick={(e)=>{ e.stopPropagation(); setSwap({ open:true, mode:"exercise", type:"cardio" }) }} style={{ background:"#FFF",border:"2px solid #DDD",borderRadius:8,padding:"6px 10px",cursor:"pointer",fontFamily:"sans-serif",fontSize:11,fontWeight:700,color:"#AAA",whiteSpace:"nowrap" }}>↕ Swap</button>
                      <button onClick={()=>toggleComplete("workout")} style={{ background:workoutDone?"#3D7A52":"#FFF",border:`2px solid ${workoutDone?"#3D7A52":"#DDD"}`,borderRadius:8,padding:"6px 10px",cursor:"pointer",fontFamily:"sans-serif",fontSize:11,fontWeight:700,color:workoutDone?"#FFF":"#AAA",whiteSpace:"nowrap" }}>
                        {workoutDone ? "✓ Done" : "Mark done"}
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* MEAL CARDS */}
            <div>
              <div style={{ fontSize:9,fontFamily:"sans-serif",letterSpacing:"2px",color:"#999",textTransform:"uppercase",marginBottom:5,paddingLeft:2 }}>Today's Meals</div>
              <div style={{ display:"flex",flexDirection:"column",gap:7 }}>
                {MEAL_TYPES.map(type => {
                  const meal = getMeal(dayMeals[type])
                  const m    = MEAL_META[type]
                  const done = isComplete(`meal_${type}`)
                  if (!meal) return null
                  return (
                    <div key={type} style={{ background:"#FFF",border:`1.5px solid ${done?"#3D7A52":"#EBEBEB"}`,borderRadius:10,padding:"11px 13px" }}>
                      <div style={{ display:"flex",justifyContent:"space-between",alignItems:"flex-start",gap:8 }}>
                        <div style={{ flex:1,cursor:"pointer" }} onClick={()=>setSwap({ open:true, mode:"meal", type })}>
                          <div style={{ fontSize:9,fontFamily:"sans-serif",letterSpacing:"1.5px",textTransform:"uppercase",color:m.accent,fontWeight:700,marginBottom:2 }}>{m.emoji} {m.label}</div>
                          <div style={{ fontSize:14,fontWeight:700,color:done?"#3D7A52":"#1A1A1A",textDecoration:done?"line-through":"none" }}>{meal.name}</div>
                          <div style={{ fontSize:11,color:"#777",marginTop:2,fontFamily:"sans-serif",lineHeight:"1.35" }}>{meal.desc}</div>
                          <div style={{ fontSize:9,color:"#CCC",fontFamily:"sans-serif",marginTop:4 }}>⏱ {timeLbl(meal.time)} · TAP TO SWAP ↕</div>
                        </div>
                        <div style={{ display:"flex",flexDirection:"column",alignItems:"flex-end",gap:8,flexShrink:0 }}>
                          <div style={{ textAlign:"right" }}>
                            <div style={{ fontSize:14,fontWeight:700,color:m.accent,fontFamily:"sans-serif" }}>{meal.kcal}</div>
                            <div style={{ fontSize:9,color:"#CCC",fontFamily:"sans-serif" }}>kcal</div>
                          </div>
                          <button onClick={()=>toggleComplete(`meal_${type}`)} style={{ background:done?"#3D7A52":"#FFF",border:`2px solid ${done?"#3D7A52":"#DDD"}`,borderRadius:6,padding:"4px 8px",cursor:"pointer",fontFamily:"sans-serif",fontSize:10,fontWeight:700,color:done?"#FFF":"#AAA",whiteSpace:"nowrap" }}>
                            {done ? "✓" : "Done"}
                          </button>
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          </div>
        </>
      )}

      {/* PROGRESS VIEW */}
      {view === "progress" && (
        <ProgressView
          weightLog={weightLog}
          completions={completions}
          onAddWeight={addWeight}
          onDeleteWeight={deleteWeight}
          startWeight={74}
        />
      )}

      {/* SHOPPING / MEAL PREP VIEW */}
      {view === "shopping" && (
        <div style={{ flex:1, overflow:"hidden", display:"flex", flexDirection:"column" }}>
          <ShoppingList mealPlan={mealPlan} />
        </div>
      )}

      {/* LIBRARY VIEWS */}
      {(view === "meals" || view === "workouts") && (
        <div style={{ flex:1,overflow:"hidden",display:"flex",flexDirection:"column" }}>
          <LibraryView mode={view} />
        </div>
      )}

      {/* BOTTOM NAV */}
      <div style={{ display:"flex",background:"#FFF",borderTop:"1px solid #EBEBEB",flexShrink:0 }}>
        {[
          { id:"plan",     emoji:"📅", label:"Plan"      },
          { id:"progress", emoji:"📈", label:"Progress"  },
          { id:"shopping", emoji:"🛒", label:"Shopping"  },
          { id:"meals",    emoji:"🥗", label:"Meals"     },
          { id:"workouts", emoji:"🏋️", label:"Workouts"  },
        ].map(tab => (
          <button key={tab.id} onClick={()=>setView(tab.id)} style={{ flex:1,padding:"11px 4px 10px",border:"none",background:"transparent",color:view===tab.id?"#1E3214":"#BBBBBB",fontFamily:"sans-serif",fontSize:10,fontWeight:view===tab.id?700:400,cursor:"pointer",borderTop:view===tab.id?"2px solid #1E3214":"2px solid transparent" }}>
            <div style={{ fontSize:17,marginBottom:2 }}>{tab.emoji}</div>
            {tab.label}
          </button>
        ))}
      </div>

      {/* WORKOUT PLAN DRAWER */}
      <WorkoutPlanDrawer
        open={workoutPlan.open}
        exercise={dayEx}
        onClose={()=>setWorkoutPlan({ open:false })}
      />

      {/* SWAP DRAWER */}
      <SwapDrawer
        open={swap.open}
        mode={swap.mode}
        type={swap.type}
        currentId={swap.mode==="meal" ? dayMeals[swap.type] : dayExId}
        onSelect={swap.mode==="meal" ? handleMealSelect : handleExSelect}
        onClose={()=>setSwap({ open:false, mode:null, type:null })}
      />
    </div>
  )
}
