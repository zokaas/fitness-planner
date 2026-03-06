import { useState } from "react"
import { WORKOUT_PLANS } from "./workoutPlans"
import { EX_META, INTENSITY_COLOR } from "./data"

export function WorkoutPlanDrawer({ open, exercise, onClose }) {
  const [checked, setChecked] = useState({})

  if (!open || !exercise) return null

  const plan = WORKOUT_PLANS[exercise.id]
  if (!plan) return null

  const meta = EX_META[exercise.type] || EX_META.recovery
  const toggle = key => setChecked(p => ({ ...p, [key]: !p[key] }))

  const totalExercises = plan.blocks.reduce((s, b) => s + b.exercises.length, 0)
  const doneCount = Object.values(checked).filter(Boolean).length

  return (
    <>
      {/* Backdrop */}
      <div onClick={onClose} style={{ position:"fixed",inset:0,background:"rgba(0,0,0,0.55)",zIndex:60,backdropFilter:"blur(3px)" }} />

      {/* Sheet */}
      <div style={{ position:"fixed",bottom:0,left:0,right:0,background:"#FAFAF7",borderRadius:"22px 22px 0 0",zIndex:70,maxHeight:"92vh",display:"flex",flexDirection:"column",boxShadow:"0 -12px 60px rgba(0,0,0,0.25)" }}>

        {/* Pull handle */}
        <div style={{ display:"flex",justifyContent:"center",padding:"10px 0 4px" }}>
          <div style={{ width:38,height:4,background:"#DDD",borderRadius:2 }} />
        </div>

        {/* Header */}
        <div style={{ padding:"6px 18px 14px",borderBottom:"1px solid #EBEBEB",flexShrink:0 }}>
          <div style={{ display:"flex",justifyContent:"space-between",alignItems:"flex-start" }}>
            <div style={{ flex:1 }}>
              <div style={{ display:"flex",alignItems:"center",gap:8,marginBottom:4,flexWrap:"wrap" }}>
                <span style={{ fontSize:9,fontFamily:"sans-serif",letterSpacing:"1.5px",textTransform:"uppercase",color:meta.accent,fontWeight:700 }}>
                  {meta.emoji} {meta.label}
                </span>
                <span style={{ fontSize:9,fontFamily:"sans-serif",fontWeight:700,color:INTENSITY_COLOR[exercise.intensity],textTransform:"capitalize" }}>
                  ● {exercise.intensity}
                </span>
                {exercise.homeOk && (
                  <span style={{ fontSize:9,background:"#4A8C5C",color:"#fff",borderRadius:4,padding:"1px 6px",fontFamily:"sans-serif",fontWeight:700 }}>🏠 Home</span>
                )}
              </div>
              <div style={{ fontSize:20,fontWeight:"bold",color:"#1A1A1A",lineHeight:1.2 }}>{plan.title}</div>
              <div style={{ display:"flex",gap:12,marginTop:6,fontFamily:"sans-serif",fontSize:11,color:"#999" }}>
                {exercise.duration > 0 && <span>⏱ {exercise.duration} min</span>}
                {exercise.kcalBurn > 0 && <span>🔥 ~{exercise.kcalBurn} kcal</span>}
                {exercise.equipment !== "None" && <span>🎒 {exercise.equipment}</span>}
              </div>
            </div>
            <button onClick={onClose} style={{ background:"#F0F0F0",border:"none",borderRadius:"50%",width:32,height:32,cursor:"pointer",fontSize:18,display:"flex",alignItems:"center",justifyContent:"center",color:"#555",flexShrink:0,marginLeft:12 }}>×</button>
          </div>

          {/* Progress bar */}
          {totalExercises > 0 && (
            <div style={{ marginTop:12 }}>
              <div style={{ display:"flex",justifyContent:"space-between",fontFamily:"sans-serif",fontSize:10,color:"#BBB",marginBottom:5 }}>
                <span>Progress</span>
                <span>{doneCount} / {totalExercises} exercises</span>
              </div>
              <div style={{ height:5,background:"#EBEBEB",borderRadius:3,overflow:"hidden" }}>
                <div style={{ height:"100%",background:meta.accent,borderRadius:3,width:`${totalExercises>0?(doneCount/totalExercises)*100:0}%`,transition:"width 0.3s" }} />
              </div>
            </div>
          )}
        </div>

        {/* Scrollable content */}
        <div style={{ overflowY:"auto",padding:"12px 14px 32px",display:"flex",flexDirection:"column",gap:16 }}>

          {/* Warm-up */}
          {plan.warmup.length > 0 && (
            <Section title="🔥 Warm-Up" color="#C8842A" bg="#FFF8ED">
              {plan.warmup.map((item, i) => (
                <InfoRow key={i} emoji="→" name={item.name} detail={item.duration} note={item.note} />
              ))}
            </Section>
          )}

          {/* Main blocks */}
          {plan.blocks.map((block, bi) => (
            <Section key={bi} title={`💪 ${block.heading}`} color={meta.accent} bg={meta.bg}>
              {block.exercises.map((ex, ei) => {
                const key = `${bi}_${ei}`
                const done = checked[key]
                return (
                  <ExerciseRow
                    key={key}
                    exercise={ex}
                    done={done}
                    accent={meta.accent}
                    onToggle={() => toggle(key)}
                  />
                )
              })}
            </Section>
          ))}

          {/* Cool-down */}
          {plan.cooldown.length > 0 && (
            <Section title="🧊 Cool-Down" color="#2E5080" bg="#EBF0F8">
              {plan.cooldown.map((item, i) => (
                <InfoRow key={i} emoji="→" name={item.name} detail={item.duration} note={item.note} />
              ))}
            </Section>
          )}

          {/* All done banner */}
          {totalExercises > 0 && doneCount === totalExercises && (
            <div style={{ background:"#EEF7EE",border:"2px solid #3D7A52",borderRadius:12,padding:"16px",textAlign:"center" }}>
              <div style={{ fontSize:28,marginBottom:6 }}>🎉</div>
              <div style={{ fontFamily:"sans-serif",fontSize:15,fontWeight:700,color:"#3D7A52" }}>Workout complete!</div>
              <div style={{ fontFamily:"sans-serif",fontSize:11,color:"#999",marginTop:4 }}>Great work. Don't forget to log it as done.</div>
            </div>
          )}
        </div>
      </div>
    </>
  )
}

// ─── SUB-COMPONENTS ───────────────────────────────────────────────────────────

function Section({ title, color, bg, children }) {
  return (
    <div>
      <div style={{ fontSize:10,fontFamily:"sans-serif",fontWeight:700,color,letterSpacing:"1px",textTransform:"uppercase",marginBottom:8 }}>
        {title}
      </div>
      <div style={{ display:"flex",flexDirection:"column",gap:6 }}>
        {children}
      </div>
    </div>
  )
}

function InfoRow({ emoji, name, detail, note }) {
  return (
    <div style={{ background:"#FFF",borderRadius:8,padding:"9px 12px" }}>
      <div style={{ display:"flex",justifyContent:"space-between",alignItems:"center",gap:8 }}>
        <span style={{ fontFamily:"sans-serif",fontSize:13,color:"#333" }}>{name}</span>
        {detail && <span style={{ fontFamily:"sans-serif",fontSize:11,color:"#C8842A",fontWeight:700,flexShrink:0 }}>{detail}</span>}
      </div>
      {note && <div style={{ fontFamily:"sans-serif",fontSize:11,color:"#AAA",marginTop:3,lineHeight:"1.35" }}>{note}</div>}
    </div>
  )
}

function ExerciseRow({ exercise, done, accent, onToggle }) {
  return (
    <div onClick={onToggle} style={{ background:"#FFF",borderRadius:10,padding:"11px 12px",cursor:"pointer",border:`1.5px solid ${done ? accent : "#EBEBEB"}`,opacity:done?0.6:1,transition:"all 0.15s" }}>
      <div style={{ display:"flex",justifyContent:"space-between",alignItems:"flex-start",gap:10 }}>
        <div style={{ flex:1 }}>
          <div style={{ display:"flex",alignItems:"center",gap:8 }}>
            {/* Checkbox */}
            <div style={{ width:20,height:20,borderRadius:5,border:`2px solid ${done?accent:"#DDD"}`,background:done?accent:"#FFF",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0,transition:"all 0.15s" }}>
              {done && <span style={{ color:"#FFF",fontSize:12,lineHeight:1 }}>✓</span>}
            </div>
            <span style={{ fontFamily:"sans-serif",fontSize:13,fontWeight:700,color:"#1A1A1A",textDecoration:done?"line-through":"none" }}>
              {exercise.name}
            </span>
          </div>
          {exercise.note && (
            <div style={{ fontFamily:"sans-serif",fontSize:11,color:"#AAA",marginTop:4,marginLeft:28,lineHeight:"1.35" }}>
              {exercise.note}
            </div>
          )}
        </div>

        {/* Sets / reps / rest */}
        <div style={{ textAlign:"right",flexShrink:0 }}>
          {exercise.sets > 1 && (
            <div style={{ fontFamily:"sans-serif",fontSize:13,fontWeight:700,color:accent }}>
              {exercise.sets} × {exercise.reps}
            </div>
          )}
          {exercise.sets === 1 && (
            <div style={{ fontFamily:"sans-serif",fontSize:13,fontWeight:700,color:accent }}>
              {exercise.reps}
            </div>
          )}
          {exercise.rest && (
            <div style={{ fontFamily:"sans-serif",fontSize:10,color:"#CCC",marginTop:2 }}>
              rest {exercise.rest}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
