// Full workout plans: warm-up → exercises → cool-down
// Each exercise has: name, sets, reps/duration, rest, notes

export const WORKOUT_PLANS = {

  // ── CARDIO ──────────────────────────────────────────────────────────────────

  c1: {
    title: "Spinning Class",
    totalTime: 45,
    warmup: [
      { name: "Easy pedal, low resistance", duration: "5 min", note: "RPM 70–80, just get the legs moving" },
    ],
    blocks: [
      { heading: "Main Session — follow instructor", exercises: [
        { name: "Seated climb", sets: 3, reps: "3 min", rest: "1 min easy", note: "Resistance 6–8, RPM 60–70" },
        { name: "Standing sprint", sets: 4, reps: "30 sec", rest: "30 sec seated", note: "Max effort, resistance 4–5" },
        { name: "Hill climb interval", sets: 3, reps: "2 min", rest: "1 min", note: "Resistance 8–10, push through it" },
        { name: "Flat sprint", sets: 5, reps: "20 sec", rest: "40 sec", note: "RPM 110+, low resistance" },
      ]},
    ],
    cooldown: [
      { name: "Easy pedal", duration: "3 min", note: "Drop resistance to 1–2" },
      { name: "Seated stretch — quads, hamstrings, hip flexors", duration: "2 min", note: "" },
    ],
  },

  c2: {
    title: "Home Spinning",
    totalTime: 30,
    warmup: [{ name: "Easy pedal", duration: "3 min", note: "Low resistance, comfortable pace" }],
    blocks: [
      { heading: "Interval Session", exercises: [
        { name: "Moderate steady ride", sets: 1, reps: "5 min", rest: "", note: "Resistance 4–5, find your rhythm" },
        { name: "Hard effort", sets: 5, reps: "2 min", rest: "1 min easy", note: "Resistance 7–8, push hard" },
        { name: "Sprint burst", sets: 4, reps: "30 sec", rest: "30 sec", note: "Max speed, low resistance" },
      ]},
    ],
    cooldown: [
      { name: "Easy pedal", duration: "3 min", note: "" },
      { name: "Standing quad stretch + calf stretch", duration: "2 min", note: "" },
    ],
  },

  c3: {
    title: "Treadmill Walk",
    totalTime: 45,
    warmup: [{ name: "Flat walk 4.5 km/h", duration: "5 min", note: "Easy warm-up pace" }],
    blocks: [
      { heading: "Incline Walk", exercises: [
        { name: "Incline walk", sets: 1, reps: "35 min", rest: "", note: "Speed 5 km/h · Incline 4–6% · Keep arms relaxed" },
      ]},
    ],
    cooldown: [
      { name: "Flat walk 4 km/h", duration: "3 min", note: "" },
      { name: "Calf stretch + hip flexor stretch", duration: "2 min", note: "" },
    ],
  },

  c4: {
    title: "Treadmill Run",
    totalTime: 30,
    warmup: [{ name: "Brisk walk 6 km/h", duration: "5 min", note: "" }],
    blocks: [
      { heading: "Steady Run", exercises: [
        { name: "Moderate run", sets: 1, reps: "20 min", rest: "", note: "Speed 8–9 km/h · Incline 1% · Conversational pace" },
      ]},
    ],
    cooldown: [
      { name: "Walk 5 km/h", duration: "3 min", note: "" },
      { name: "Quad, hamstring, calf stretch", duration: "2 min", note: "" },
    ],
  },

  c5: {
    title: "Treadmill Intervals",
    totalTime: 35,
    warmup: [{ name: "Walk 6 km/h", duration: "5 min", note: "" }],
    blocks: [
      { heading: "8 Rounds — 2 min on / 1 min off", exercises: [
        { name: "Fast run", sets: 8, reps: "2 min", rest: "1 min walk", note: "Speed 10–11 km/h · Push hard" },
      ]},
    ],
    cooldown: [
      { name: "Walk 5 km/h", duration: "2 min", note: "" },
      { name: "Full leg stretch", duration: "3 min", note: "" },
    ],
  },

  c6: {
    title: "Indoor Walk",
    totalTime: 30,
    warmup: [],
    blocks: [
      { heading: "Brisk Walk", exercises: [
        { name: "Brisk walk", sets: 1, reps: "30 min", rest: "", note: "Keep pace fast enough that talking is slightly hard · Swing your arms" },
      ]},
    ],
    cooldown: [{ name: "2 min gentle walk + full body stretch", duration: "2 min", note: "" }],
  },

  c7: {
    title: "Long Indoor Walk",
    totalTime: 45,
    warmup: [],
    blocks: [
      { heading: "Steady Walk", exercises: [
        { name: "Steady walk", sets: 1, reps: "45 min", rest: "", note: "Comfortable pace · Podcast or music recommended · Aim for 5,000+ steps" },
      ]},
    ],
    cooldown: [{ name: "Hip flexor + calf stretch", duration: "2 min", note: "" }],
  },

  c8: {
    title: "Outdoor Walk",
    totalTime: 45,
    warmup: [],
    blocks: [
      { heading: "Outdoor Steady Walk", exercises: [
        { name: "Brisk outdoor walk", sets: 1, reps: "45 min", rest: "", note: "Aim for varied terrain · Hills add bonus calorie burn" },
      ]},
    ],
    cooldown: [{ name: "Slow down for last 5 min + stretch calves and quads", duration: "5 min", note: "" }],
  },

  c9: {
    title: "Outdoor Bike Ride",
    totalTime: 60,
    warmup: [{ name: "Easy flat cycling", duration: "10 min", note: "Low gear, relaxed pace" }],
    blocks: [
      { heading: "Main Ride", exercises: [
        { name: "Steady cycling", sets: 1, reps: "45 min", rest: "", note: "Moderate effort · Aim for 18–22 km/h on flat · Enjoy the route" },
      ]},
    ],
    cooldown: [{ name: "Easy spin home", duration: "5 min", note: "Drop to lowest gear" }],
  },

  c10: {
    title: "Outdoor Bike – Intervals",
    totalTime: 60,
    warmup: [{ name: "Easy cycling", duration: "10 min", note: "" }],
    blocks: [
      { heading: "5 × 3 min Hard Efforts", exercises: [
        { name: "Hard effort sprint", sets: 5, reps: "3 min", rest: "2 min easy cycling", note: "Push to 85–90% max effort · Recover fully between" },
        { name: "Steady moderate ride", sets: 1, reps: "15 min", rest: "", note: "After intervals, maintain moderate effort" },
      ]},
    ],
    cooldown: [{ name: "Easy spin + stretch", duration: "5 min", note: "" }],
  },

  c11: {
    title: "Jump Rope",
    totalTime: 20,
    warmup: [{ name: "March on the spot + arm circles", duration: "2 min", note: "" }],
    blocks: [
      { heading: "3 × 5 Min Rounds", exercises: [
        { name: "Basic jump rope", sets: 3, reps: "5 min", rest: "1 min walk", note: "Steady rhythm · Land softly on balls of feet · Breathe!" },
        { name: "High knees jump rope (if energy)", sets: 1, reps: "1 min", rest: "", note: "Bonus round if you have it in you" },
      ]},
    ],
    cooldown: [{ name: "Walk + calf stretch + ankle circles", duration: "2 min", note: "" }],
  },

  c12: {
    title: "Stair Climbing",
    totalTime: 20,
    warmup: [{ name: "Walk up and down once slowly", duration: "2 min", note: "" }],
    blocks: [
      { heading: "20 Min Continuous Climb", exercises: [
        { name: "Stair climb", sets: 1, reps: "20 min", rest: "", note: "Up the stairs, walk back down, repeat · Take 2 steps at a time for glute focus · Keep back upright" },
      ]},
    ],
    cooldown: [{ name: "Slow walk + quad and calf stretch", duration: "3 min", note: "" }],
  },

  // ── YOGA ────────────────────────────────────────────────────────────────────

  y1: {
    title: "Morning Yoga",
    totalTime: 20,
    warmup: [],
    blocks: [
      { heading: "Wake-Up Flow", exercises: [
        { name: "Cat-cow", sets: 1, reps: "10 breaths", rest: "", note: "Slow and controlled, sync with breath" },
        { name: "Child's pose", sets: 1, reps: "5 breaths", rest: "", note: "Wide knees, arms extended" },
        { name: "Sun salutation A", sets: 3, reps: "1 round", rest: "1 breath", note: "Slow — inhale up, exhale fold" },
        { name: "Low lunge each side", sets: 1, reps: "5 breaths each", rest: "", note: "Hip flexor opener" },
        { name: "Seated forward fold", sets: 1, reps: "8 breaths", rest: "", note: "" },
        { name: "Supine twist each side", sets: 1, reps: "5 breaths each", rest: "", note: "" },
      ]},
    ],
    cooldown: [{ name: "Savasana", duration: "2 min", note: "Lie flat, eyes closed, breathe" }],
  },

  y2: {
    title: "Vinyasa Flow",
    totalTime: 45,
    warmup: [{ name: "Child's pose + cat-cow", duration: "3 min", note: "" }],
    blocks: [
      { heading: "Standing Flow", exercises: [
        { name: "Sun salutation B", sets: 4, reps: "1 round", rest: "3 breaths", note: "Build heat" },
        { name: "Warrior I → Warrior II → Reverse Warrior", sets: 2, reps: "Each side, 5 breaths per pose", rest: "", note: "" },
        { name: "Triangle pose", sets: 1, reps: "5 breaths each side", rest: "", note: "" },
        { name: "Chair pose flow", sets: 3, reps: "5 breaths", rest: "vinyasa between", note: "Thighs parallel to floor" },
      ]},
      { heading: "Floor Work", exercises: [
        { name: "Locust pose", sets: 3, reps: "5 breaths", rest: "5 breaths rest", note: "Back strength" },
        { name: "Bridge pose", sets: 3, reps: "8 breaths", rest: "lower between", note: "" },
        { name: "Happy baby", sets: 1, reps: "8 breaths", rest: "", note: "" },
      ]},
    ],
    cooldown: [{ name: "Savasana", duration: "3 min", note: "" }],
  },

  y3: {
    title: "Yin Yoga",
    totalTime: 45,
    warmup: [],
    blocks: [
      { heading: "Deep Passive Holds — 3–5 min each", exercises: [
        { name: "Butterfly (bound angle)", sets: 1, reps: "4 min", rest: "1 min neutral", note: "Hips · Let gravity do the work" },
        { name: "Dragon (low lunge) — each side", sets: 1, reps: "3 min each", rest: "1 min between", note: "Hip flexors + quads" },
        { name: "Swan / sleeping swan — each side", sets: 1, reps: "4 min each", rest: "1 min between", note: "Piriformis + outer hip" },
        { name: "Caterpillar (seated forward fold)", sets: 1, reps: "5 min", rest: "", note: "Spine + hamstrings · Round the back" },
        { name: "Supported fish", sets: 1, reps: "4 min", rest: "", note: "Blanket under thoracic spine · Chest opener" },
      ]},
    ],
    cooldown: [{ name: "Savasana", duration: "5 min", note: "This is part of the practice — don't skip it" }],
  },

  y4: {
    title: "Power Yoga",
    totalTime: 45,
    warmup: [{ name: "Sun salutations A × 3", duration: "5 min", note: "" }],
    blocks: [
      { heading: "Strength Sequence", exercises: [
        { name: "Plank hold", sets: 3, reps: "30 sec", rest: "15 sec", note: "Hips level, core tight" },
        { name: "Chaturanga push-up", sets: 3, reps: "8 reps", rest: "vinyasa", note: "Elbows close to body" },
        { name: "Warrior III", sets: 2, reps: "5 breaths each side", rest: "", note: "Balance + posterior chain" },
        { name: "Side plank each side", sets: 2, reps: "20 sec each", rest: "10 sec", note: "" },
        { name: "Crow pose attempts", sets: 3, reps: "10 sec", rest: "rest", note: "Arms bent, lean forward, lift toes" },
        { name: "Boat pose (navasana)", sets: 3, reps: "5 breaths", rest: "lower between", note: "Core fire!" },
      ]},
    ],
    cooldown: [
      { name: "Pigeon pose each side", duration: "2 min each", note: "" },
      { name: "Savasana", duration: "3 min", note: "" },
    ],
  },

  y5: {
    title: "Yoga – Core Focus",
    totalTime: 30,
    warmup: [{ name: "Cat-cow + bird dog", duration: "3 min", note: "" }],
    blocks: [
      { heading: "Core Series", exercises: [
        { name: "Plank hold", sets: 3, reps: "30 sec", rest: "15 sec", note: "" },
        { name: "Side plank each side", sets: 2, reps: "20 sec each", rest: "10 sec", note: "" },
        { name: "Boat pose", sets: 4, reps: "5 breaths", rest: "lower between", note: "Legs as straight as you can" },
        { name: "Hollow body hold", sets: 3, reps: "20 sec", rest: "15 sec", note: "Lower back pressed into mat" },
        { name: "Superman hold", sets: 3, reps: "10 reps", rest: "15 sec", note: "Arms and legs off floor" },
        { name: "Dead bug", sets: 3, reps: "8 reps each side", rest: "15 sec", note: "Slow and controlled" },
      ]},
    ],
    cooldown: [{ name: "Child's pose + supine twist", duration: "3 min", note: "" }],
  },

  y6: {
    title: "Restorative Yoga",
    totalTime: 40,
    warmup: [],
    blocks: [
      { heading: "Fully Supported Poses — use blankets/pillows", exercises: [
        { name: "Supported child's pose", sets: 1, reps: "5 min", rest: "", note: "Bolster under chest · Full release" },
        { name: "Legs up the wall", sets: 1, reps: "7 min", rest: "", note: "Lie on back, legs resting on wall · Amazing for recovery" },
        { name: "Supported bridge", sets: 1, reps: "5 min", rest: "", note: "Block or pillow under sacrum · Chest open" },
        { name: "Reclined bound angle", sets: 1, reps: "5 min", rest: "", note: "Soles of feet together · Arms wide" },
        { name: "Supported savasana", sets: 1, reps: "8 min", rest: "", note: "Pillow under knees, eye pillow if available" },
      ]},
    ],
    cooldown: [],
  },

  // ── PILATES ──────────────────────────────────────────────────────────────────

  p1: {
    title: "Mat Pilates",
    totalTime: 45,
    warmup: [{ name: "Breathing + pelvic tilts", duration: "3 min", note: "" }],
    blocks: [
      { heading: "Classic Repertoire", exercises: [
        { name: "The Hundred", sets: 1, reps: "100 pumps", rest: "30 sec", note: "Legs at 45°, pump arms 5 in / 5 out with breath" },
        { name: "Roll Up", sets: 5, reps: "reps", rest: "15 sec", note: "Peel spine off mat slowly" },
        { name: "Single Leg Circles", sets: 1, reps: "5 each direction each leg", rest: "15 sec", note: "Stabilise the pelvis" },
        { name: "Rolling Like a Ball", sets: 6, reps: "reps", rest: "10 sec", note: "Balance on tailbone at top and bottom" },
        { name: "Single Leg Stretch", sets: 1, reps: "10 each side", rest: "15 sec", note: "Alternate · Keep chin to chest" },
        { name: "Double Leg Stretch", sets: 8, reps: "reps", rest: "20 sec", note: "" },
        { name: "Scissors", sets: 1, reps: "8 each side", rest: "15 sec", note: "" },
        { name: "Teaser", sets: 3, reps: "reps", rest: "20 sec", note: "Legs at 45°, arms reach forward · Core challenge" },
        { name: "Side Kick Series", sets: 1, reps: "10 each direction each side", rest: "between sides", note: "Front/back and up/down" },
        { name: "Swimming", sets: 3, reps: "20 sec", rest: "10 sec", note: "Alternate arm + leg lifts" },
      ]},
    ],
    cooldown: [{ name: "Spine stretch + mermaid stretch", duration: "2 min", note: "" }],
  },

  p2: {
    title: "Pilates Core",
    totalTime: 30,
    warmup: [{ name: "Imprinting + pelvic clock", duration: "3 min", note: "" }],
    blocks: [
      { heading: "Deep Core Stabilisation", exercises: [
        { name: "Dead Bug", sets: 3, reps: "8 each side", rest: "15 sec", note: "Back flat, slow controlled movement" },
        { name: "Plank with shoulder taps", sets: 3, reps: "10 each side", rest: "20 sec", note: "No hip rotation" },
        { name: "The Hundred (modified)", sets: 1, reps: "60 pumps", rest: "30 sec", note: "Legs at tabletop if needed" },
        { name: "Leg Lowers", sets: 3, reps: "8 reps", rest: "15 sec", note: "Both legs · Lower only as far as back stays flat" },
        { name: "Criss-cross (bicycle)", sets: 3, reps: "10 each side", rest: "20 sec", note: "Slow, full rotation" },
        { name: "Plank hold", sets: 3, reps: "30 sec", rest: "15 sec", note: "" },
      ]},
    ],
    cooldown: [{ name: "Child's pose + supine twist", duration: "3 min", note: "" }],
  },

  p3: {
    title: "Pilates – Legs & Glutes",
    totalTime: 30,
    warmup: [{ name: "Hip circles + clam shell", duration: "3 min", note: "" }],
    blocks: [
      { heading: "Side-Lying Series (right side first, then left)", exercises: [
        { name: "Clam shells", sets: 3, reps: "15 reps each side", rest: "10 sec", note: "Keep hips stacked" },
        { name: "Side leg lift", sets: 3, reps: "12 reps each side", rest: "10 sec", note: "" },
        { name: "Side leg circles", sets: 2, reps: "8 each direction", rest: "10 sec", note: "" },
        { name: "Inner thigh lift", sets: 3, reps: "12 reps each side", rest: "10 sec", note: "Bottom leg lifts" },
      ]},
      { heading: "Bridge Series", exercises: [
        { name: "Glute bridge hold", sets: 3, reps: "30 sec", rest: "15 sec", note: "Squeeze at the top" },
        { name: "Single leg bridge", sets: 3, reps: "10 each side", rest: "15 sec", note: "" },
        { name: "Bridge march", sets: 2, reps: "10 each side", rest: "20 sec", note: "Alternate knee lifts at top" },
      ]},
    ],
    cooldown: [{ name: "Figure 4 stretch + pigeon", duration: "3 min", note: "" }],
  },

  p4: {
    title: "Pilates – Full Body",
    totalTime: 50,
    warmup: [{ name: "Breathing + spinal mobility", duration: "4 min", note: "" }],
    blocks: [
      { heading: "Full Body", exercises: [
        { name: "The Hundred", sets: 1, reps: "100 pumps", rest: "30 sec", note: "" },
        { name: "Roll Up", sets: 5, reps: "reps", rest: "15 sec", note: "" },
        { name: "Leg circles", sets: 1, reps: "5 each direction, both legs", rest: "10 sec", note: "" },
        { name: "Side kick series", sets: 1, reps: "10 front/back + 10 up/down each side", rest: "between sides", note: "" },
        { name: "Push-up sequence", sets: 3, reps: "8 reps", rest: "20 sec", note: "Pilates push-up — heels together, elbows back" },
        { name: "Swimming", sets: 3, reps: "20 sec", rest: "10 sec", note: "" },
        { name: "Teaser", sets: 3, reps: "reps", rest: "20 sec", note: "" },
        { name: "Glute bridge", sets: 3, reps: "12 reps", rest: "15 sec", note: "" },
        { name: "Mermaid stretch", sets: 1, reps: "5 breaths each side", rest: "", note: "" },
      ]},
    ],
    cooldown: [{ name: "Roll down against wall + spine stretch", duration: "3 min", note: "" }],
  },

  p5: {
    title: "Pilates HIIT Fusion",
    totalTime: 40,
    warmup: [{ name: "March + arm swings + hip circles", duration: "3 min", note: "" }],
    blocks: [
      { heading: "Pilates–HIIT Circuit — 3 rounds", exercises: [
        { name: "Jumping jacks", sets: 3, reps: "30 sec", rest: "", note: "Cardio burst" },
        { name: "The Hundred", sets: 3, reps: "30 sec", rest: "", note: "" },
        { name: "High knees", sets: 3, reps: "30 sec", rest: "", note: "" },
        { name: "Double leg stretch", sets: 3, reps: "10 reps", rest: "", note: "" },
        { name: "Squat jumps", sets: 3, reps: "30 sec", rest: "", note: "" },
        { name: "Side plank each side", sets: 3, reps: "20 sec each", rest: "30 sec between rounds", note: "" },
      ]},
    ],
    cooldown: [{ name: "Full pilates cool-down stretch", duration: "5 min", note: "Spine twist, mermaid, child's pose" }],
  },

  // ── STRENGTH ─────────────────────────────────────────────────────────────────

  w1: {
    title: "Bodyweight Circuit",
    totalTime: 30,
    warmup: [{ name: "March, leg swings, arm circles", duration: "3 min", note: "" }],
    blocks: [
      { heading: "3 Rounds — minimal rest between exercises", exercises: [
        { name: "Squat", sets: 3, reps: "12 reps", rest: "15 sec", note: "Feet shoulder-width, knees track toes" },
        { name: "Reverse lunge", sets: 3, reps: "10 each side", rest: "15 sec", note: "" },
        { name: "Push-up", sets: 3, reps: "10 reps (or modified)", rest: "15 sec", note: "Knees down is fine — keep core tight" },
        { name: "Glute bridge", sets: 3, reps: "15 reps", rest: "15 sec", note: "Pause 1 sec at top" },
        { name: "Mountain climbers", sets: 3, reps: "20 sec", rest: "20 sec", note: "" },
      ]},
    ],
    cooldown: [{ name: "Hip flexor stretch + chest opener + quad stretch", duration: "3 min", note: "" }],
  },

  w2: {
    title: "Leg Day – Bodyweight",
    totalTime: 30,
    warmup: [{ name: "Leg swings + hip circles + shallow squats", duration: "3 min", note: "" }],
    blocks: [
      { heading: "Lower Body Focus", exercises: [
        { name: "Squat", sets: 4, reps: "15 reps", rest: "30 sec", note: "Full depth, weight in heels" },
        { name: "Reverse lunge", sets: 3, reps: "12 each side", rest: "20 sec", note: "" },
        { name: "Side lunge", sets: 3, reps: "10 each side", rest: "20 sec", note: "Push hips back" },
        { name: "Wall sit", sets: 3, reps: "30 sec", rest: "30 sec", note: "Thighs parallel to floor" },
        { name: "Single leg glute bridge", sets: 3, reps: "12 each side", rest: "20 sec", note: "" },
        { name: "Calf raise", sets: 3, reps: "20 reps", rest: "15 sec", note: "Slow down — 3 sec lower" },
      ]},
    ],
    cooldown: [{ name: "Pigeon stretch + quad stretch + hamstring stretch", duration: "4 min", note: "" }],
  },

  w3: {
    title: "Upper Body – Bodyweight",
    totalTime: 25,
    warmup: [{ name: "Shoulder rolls + arm circles + chest stretch", duration: "3 min", note: "" }],
    blocks: [
      { heading: "Upper Body Push & Pull", exercises: [
        { name: "Push-up", sets: 4, reps: "10 reps", rest: "30 sec", note: "Wide for chest, narrow for triceps" },
        { name: "Tricep dip (on chair)", sets: 3, reps: "12 reps", rest: "30 sec", note: "Keep hips close to chair" },
        { name: "Pike push-up", sets: 3, reps: "8 reps", rest: "30 sec", note: "Shoulders vertical over hands" },
        { name: "Superman hold", sets: 3, reps: "10 reps", rest: "20 sec", note: "Back strength — lift arms + legs" },
        { name: "Plank shoulder taps", sets: 3, reps: "12 each side", rest: "20 sec", note: "" },
      ]},
    ],
    cooldown: [{ name: "Chest stretch, lat stretch, tricep stretch", duration: "3 min", note: "" }],
  },

  w4: {
    title: "HIIT Bodyweight",
    totalTime: 25,
    warmup: [{ name: "March + jumping jacks + high knees", duration: "3 min", note: "" }],
    blocks: [
      { heading: "4 Rounds — 40 sec on / 20 sec rest", exercises: [
        { name: "Burpees", sets: 4, reps: "40 sec", rest: "20 sec", note: "Full burpee with jump" },
        { name: "Jump squats", sets: 4, reps: "40 sec", rest: "20 sec", note: "Land soft" },
        { name: "High knees", sets: 4, reps: "40 sec", rest: "20 sec", note: "Drive knees up, fast feet" },
        { name: "Mountain climbers", sets: 4, reps: "40 sec", rest: "20 sec", note: "Hips level" },
      ]},
    ],
    cooldown: [{ name: "Full body stretch — 5 min minimum", duration: "5 min", note: "You earned it" }],
  },

  w5: {
    title: "Core & Stability",
    totalTime: 20,
    warmup: [{ name: "Pelvic tilts + cat-cow", duration: "2 min", note: "" }],
    blocks: [
      { heading: "Functional Core", exercises: [
        { name: "Plank", sets: 3, reps: "30 sec", rest: "15 sec", note: "" },
        { name: "Side plank each side", sets: 2, reps: "25 sec each", rest: "10 sec", note: "" },
        { name: "Dead bug", sets: 3, reps: "8 each side", rest: "15 sec", note: "Lower back pressed down" },
        { name: "Bird dog", sets: 3, reps: "10 each side", rest: "15 sec", note: "Extend opposite arm + leg" },
        { name: "Hollow body hold", sets: 3, reps: "20 sec", rest: "15 sec", note: "Arms overhead, lower back flat" },
      ]},
    ],
    cooldown: [{ name: "Child's pose + spinal twist", duration: "3 min", note: "" }],
  },

  w6: {
    title: "Full Body Strength",
    totalTime: 50,
    warmup: [{ name: "Leg swings, arm circles, hip circles, shallow squats", duration: "5 min", note: "" }],
    blocks: [
      { heading: "4 × 8 Compound Movements", exercises: [
        { name: "Squat", sets: 4, reps: "8 reps", rest: "45 sec", note: "Slow down (3 sec) → explode up" },
        { name: "Romanian deadlift (single leg)", sets: 4, reps: "8 each side", rest: "45 sec", note: "Hinge at hip, slight knee bend, flat back" },
        { name: "Push-up (slow)", sets: 4, reps: "8 reps", rest: "45 sec", note: "3 sec down, 1 sec up" },
        { name: "Inverted row (under a table)", sets: 4, reps: "8 reps", rest: "45 sec", note: "Pull chest to table edge" },
        { name: "Reverse lunge to knee drive", sets: 3, reps: "10 each side", rest: "30 sec", note: "Balance challenge" },
        { name: "Plank", sets: 3, reps: "30 sec", rest: "20 sec", note: "" },
      ]},
    ],
    cooldown: [{ name: "Full body stretch — hip flexors, quads, chest, lats", duration: "5 min", note: "" }],
  },

  // ── RECOVERY ─────────────────────────────────────────────────────────────────

  r1: {
    title: "Rest Day",
    totalTime: 0,
    warmup: [],
    blocks: [
      { heading: "Today's job: recover", exercises: [
        { name: "Light walk", sets: 1, reps: "10–15 min optional", rest: "", note: "Only if you feel like it — zero obligation" },
        { name: "Hydration", sets: 1, reps: "2–3 litres water", rest: "", note: "Recovery happens best when well hydrated" },
        { name: "Sleep", sets: 1, reps: "7–9 hours tonight", rest: "", note: "This is when your body actually rebuilds" },
      ]},
    ],
    cooldown: [],
  },

  r2: {
    title: "Active Recovery Walk",
    totalTime: 20,
    warmup: [],
    blocks: [
      { heading: "Gentle Movement", exercises: [
        { name: "Slow walk", sets: 1, reps: "20 min", rest: "", note: "Truly easy — you should feel refreshed, not tired" },
      ]},
    ],
    cooldown: [{ name: "5 min static stretch — whatever feels tight", duration: "5 min", note: "" }],
  },

  r3: {
    title: "Foam Roll & Stretch",
    totalTime: 25,
    warmup: [],
    blocks: [
      { heading: "Foam Roll — 60 sec each area, slow", exercises: [
        { name: "IT band (side of thigh)", sets: 1, reps: "60 sec each side", rest: "", note: "Pause on tender spots" },
        { name: "Quads (front of thigh)", sets: 1, reps: "60 sec each", rest: "", note: "" },
        { name: "Glutes / piriformis", sets: 1, reps: "60 sec each", rest: "", note: "Cross ankle over knee" },
        { name: "Upper back (thoracic)", sets: 1, reps: "90 sec", rest: "", note: "Arms crossed over chest" },
        { name: "Calves", sets: 1, reps: "60 sec each", rest: "", note: "" },
      ]},
      { heading: "Static Stretch — hold 30–45 sec each", exercises: [
        { name: "Hip flexor lunge stretch", sets: 1, reps: "45 sec each side", rest: "", note: "" },
        { name: "Figure 4 glute stretch", sets: 1, reps: "45 sec each side", rest: "", note: "" },
        { name: "Standing quad stretch", sets: 1, reps: "30 sec each side", rest: "", note: "" },
        { name: "Doorway chest stretch", sets: 1, reps: "45 sec", rest: "", note: "" },
      ]},
    ],
    cooldown: [],
  },

  r4: {
    title: "Mobility Flow",
    totalTime: 20,
    warmup: [],
    blocks: [
      { heading: "Joint Mobility Circuit — 2 rounds", exercises: [
        { name: "Hip circles", sets: 2, reps: "10 each direction", rest: "", note: "Big slow circles" },
        { name: "90/90 hip switch", sets: 2, reps: "5 each side", rest: "", note: "Internal + external rotation" },
        { name: "Thoracic rotation (seated)", sets: 2, reps: "8 each side", rest: "", note: "Elbow to ceiling" },
        { name: "Ankle circles", sets: 2, reps: "10 each direction each foot", rest: "", note: "" },
        { name: "Wrist circles + finger stretches", sets: 2, reps: "10 each direction", rest: "", note: "" },
        { name: "Neck rolls (gentle)", sets: 2, reps: "5 each direction", rest: "", note: "Slow and controlled" },
        { name: "World's greatest stretch", sets: 2, reps: "5 each side", rest: "", note: "Lunge + rotation + reach — full body mobility" },
      ]},
    ],
    cooldown: [],
  },
}
