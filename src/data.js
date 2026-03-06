// ─── MEAL LIBRARY ─────────────────────────────────────────────────────────────

export const MEAL_LIBRARY = {
  breakfast: [
    { id:"b1",  name:"Overnight Oats – Classic",        desc:"80g oats + oat milk + banana + 1 tbsp peanut butter", kcal:380, time:0 },
    { id:"b2",  name:"Overnight Oats – Berry",          desc:"80g oats + oat milk + frozen berries + 1 tbsp peanut butter", kcal:370, time:0 },
    { id:"b3",  name:"Overnight Oats – Apple Cinnamon", desc:"80g oats + oat milk + sliced apple + cinnamon + 1 tbsp almond butter", kcal:380, time:0 },
    { id:"b4",  name:"Overnight Oats – Cherry Choc",    desc:"80g oats + oat milk + frozen cherries + dark chocolate chips", kcal:400, time:0 },
    { id:"b5",  name:"Overnight Oats – Mango",          desc:"80g oats + oat milk + mango chunks + 1 tbsp peanut butter", kcal:390, time:0 },
    { id:"b6",  name:"Overnight Oats – Peach",          desc:"80g oats + oat milk + peach slices + 1 tbsp almond butter", kcal:370, time:0 },
    { id:"b7",  name:"Overnight Oats – Strawberry",     desc:"80g oats + oat milk + strawberries + 1 tbsp almond butter", kcal:370, time:0 },
    { id:"b8",  name:"Greek Yogurt – Granola & Berry",  desc:"200g Greek yogurt + 30g granola + frozen berries (thawed)", kcal:350, time:2 },
    { id:"b9",  name:"Greek Yogurt – Banana & Honey",   desc:"200g Greek yogurt + 30g granola + banana + honey drizzle", kcal:370, time:2 },
    { id:"b10", name:"Greek Yogurt – Muesli & Kiwi",    desc:"200g Greek yogurt + 30g muesli + kiwi + 1 tsp chia seeds", kcal:360, time:2 },
    { id:"b11", name:"Greek Yogurt – Orange & Honey",   desc:"200g Greek yogurt + 30g granola + orange segments + 1 tsp honey", kcal:370, time:2 },
    { id:"b12", name:"Scrambled Eggs on Rye",           desc:"2 eggs + 2 rye crispbreads + sliced tomato + cucumber", kcal:320, time:8 },
    { id:"b13", name:"Smoked Salmon Scrambled Eggs",    desc:"2 eggs + 2 rye crispbreads + smoked salmon + dill + lemon", kcal:370, time:8 },
    { id:"b14", name:"Egg & Avocado Toast",             desc:"2 rye crispbreads + ½ mashed avocado + 2 poached eggs + chili flakes", kcal:380, time:10 },
    { id:"b15", name:"Fried Egg & Avocado on Rye",      desc:"2 rye crispbreads + ½ avocado + 2 fried eggs + sea salt + pepper", kcal:390, time:10 },
    { id:"b16", name:"Porridge – Berry",                desc:"80g oats + oat milk + handful of berries + drizzle of honey", kcal:360, time:10 },
    { id:"b17", name:"Porridge – Banana",               desc:"80g oats + oat milk + banana + 1 tsp honey + pinch cinnamon", kcal:380, time:10 },
    { id:"b18", name:"Porridge – Pear & Walnut",        desc:"80g oats + oat milk + sliced pear + cinnamon + walnut pieces", kcal:390, time:10 },
    { id:"b19", name:"Egg Fried Rice",                  desc:"2 eggs + leftover rice + peas + soy sauce + sesame oil", kcal:410, time:10 },
  ],
  lunch: [
    { id:"l1",  name:"Chicken Wrap",            desc:"Tortilla + 100g grilled chicken + salad leaves + cucumber + yogurt dressing", kcal:450, time:15 },
    { id:"l2",  name:"Chicken Caesar Wrap",     desc:"Tortilla + 100g chicken + romaine + parmesan + light Caesar dressing", kcal:440, time:10 },
    { id:"l3",  name:"Chicken Tikka Wrap",      desc:"Leftover chicken tikka in tortilla + salad + cucumber + mint yogurt", kcal:430, time:5 },
    { id:"l4",  name:"Tuna Rice Bowl",          desc:"150g rice + 1 can tuna + cucumber + ½ avocado + soy + lemon", kcal:470, time:10 },
    { id:"l5",  name:"Tuna Pasta Salad",        desc:"80g pasta + 1 can tuna + cherry tomatoes + cucumber + light mayo", kcal:440, time:15 },
    { id:"l6",  name:"Tuna Niçoise Bowl",       desc:"1 can tuna + boiled egg + green beans + cherry tomatoes + olives + lemon dressing", kcal:420, time:15 },
    { id:"l7",  name:"Quinoa Tuna Bowl",        desc:"100g quinoa + 1 can tuna + cucumber + cherry tomatoes + lemon + olive oil", kcal:430, time:10 },
    { id:"l8",  name:"Salmon Salad",            desc:"100g smoked salmon + big green salad + boiled egg + 2 crispbreads + lemon dressing", kcal:400, time:10 },
    { id:"l9",  name:"Smoked Salmon Wrap",      desc:"Tortilla + 80g smoked salmon + cream cheese + cucumber + dill", kcal:430, time:5 },
    { id:"l10", name:"Smoked Salmon Salad",     desc:"100g smoked salmon + mixed greens + avocado + capers + lemon dressing + crispbread", kcal:410, time:10 },
    { id:"l11", name:"Smoked Mackerel Salad",   desc:"100g smoked mackerel + big salad + boiled potato + capers + lemon dressing", kcal:430, time:15 },
    { id:"l12", name:"Smoked Mackerel Wrap",    desc:"Tortilla + 100g smoked mackerel + cucumber + cream cheese + dill", kcal:430, time:5 },
    { id:"l13", name:"Prawn Salad",             desc:"100g cooked prawns + mixed salad + avocado + cherry tomatoes + lemon dressing", kcal:360, time:10 },
    { id:"l14", name:"Turkey Pasta Salad",      desc:"80g pasta (cold) + 100g turkey + cherry tomatoes + pesto + spinach", kcal:440, time:15 },
    { id:"l15", name:"Quinoa Chicken Bowl",     desc:"100g quinoa + 100g grilled chicken + cherry tomatoes + cucumber + lemon", kcal:430, time:15 },
    { id:"l16", name:"Chickpea Salad",          desc:"1 can chickpeas + cherry tomatoes + cucumber + red onion + olive oil + feta", kcal:420, time:10 },
    { id:"l17", name:"Chickpea & Spinach Bowl", desc:"1 can chickpeas + baby spinach + roasted peppers + feta + olive oil", kcal:400, time:10 },
    { id:"l18", name:"Chickpea Wrap",           desc:"Tortilla + ½ can chickpeas (mashed) + feta + spinach + cherry tomatoes", kcal:410, time:10 },
    { id:"l19", name:"Beef Lettuce Wraps",      desc:"100g lean beef mince + garlic + soy + ginger + lettuce leaves", kcal:340, time:15 },
    { id:"l20", name:"Lentil Soup",             desc:"Red lentil soup (leftover or fresh) + 1 slice rye bread", kcal:380, time:5 },
    { id:"l21", name:"Leftover Chicken Tikka",  desc:"Leftover chicken tikka + 100g rice + side salad", kcal:420, time:5 },
    { id:"l22", name:"Leftover Turkey Chilli",  desc:"Leftover chilli + 100g rice + side salad", kcal:420, time:5 },
    { id:"l23", name:"Leftover Prawn Curry",    desc:"Leftover prawn curry + 100g rice", kcal:420, time:5 },
  ],
  dinner: [
    { id:"d1",  name:"Baked Salmon & Veg",        desc:"150g salmon + roasted courgette, peppers & broccoli + small potato", kcal:440, time:25 },
    { id:"d2",  name:"Salmon & Sweet Potato",     desc:"150g salmon + 1 medium sweet potato (baked) + green beans", kcal:450, time:30 },
    { id:"d3",  name:"Salmon & Broccoli Bowl",    desc:"150g salmon + large broccoli + 100g rice + soy + garlic", kcal:450, time:20 },
    { id:"d4",  name:"Salmon Teriyaki",           desc:"150g salmon + teriyaki sauce + 150g rice + edamame", kcal:470, time:20 },
    { id:"d5",  name:"Salmon & Asparagus",        desc:"150g salmon + bunch of asparagus + 100g rice + lemon + olive oil", kcal:440, time:20 },
    { id:"d6",  name:"Baked Cod & Veg",           desc:"150g cod fillet + courgette + cherry tomatoes + olive oil + lemon + herbs", kcal:380, time:25 },
    { id:"d7",  name:"Baked Cod & Sweet Potato",  desc:"150g cod + 1 sweet potato + green salad + lemon + dill", kcal:390, time:30 },
    { id:"d8",  name:"Cod Tacos",                 desc:"2 small tortillas + 150g baked cod + shredded cabbage + lime + Greek yogurt", kcal:420, time:20 },
    { id:"d9",  name:"Prawn Stir Fry",            desc:"150g prawns + frozen stir fry veg + noodles + soy + ginger + garlic", kcal:400, time:15 },
    { id:"d10", name:"Prawn & Veg Curry",         desc:"150g prawns + light coconut milk + curry paste + onion + peppers + 150g rice", kcal:450, time:25 },
    { id:"d11", name:"Prawn Noodles",             desc:"150g prawns + rice noodles + pak choi + soy + sesame oil + spring onion", kcal:400, time:15 },
    { id:"d12", name:"Chicken Stir Fry",          desc:"120g chicken strips + frozen stir fry veg + soy sauce + 150g rice", kcal:430, time:20 },
    { id:"d13", name:"Chicken Tikka",             desc:"150g chicken + tikka paste + 150g rice + cucumber yogurt dip", kcal:460, time:25 },
    { id:"d14", name:"Chicken Fajita Bowl",       desc:"150g chicken strips + peppers + onion + fajita spices + 150g rice + yogurt", kcal:470, time:20 },
    { id:"d15", name:"Chicken & Spinach Pasta",   desc:"100g chicken + spinach + garlic + light cream cheese + 80g pasta", kcal:470, time:20 },
    { id:"d16", name:"Roast Chicken Bowl",        desc:"150g chicken thigh + roasted root veg + 100g rice", kcal:460, time:30 },
    { id:"d17", name:"Baked Chicken Thighs",      desc:"200g chicken thighs + roasted sweet potato + broccoli + garlic + herbs", kcal:460, time:30 },
    { id:"d18", name:"Sheet Pan Chicken",         desc:"200g chicken thighs + roasted peppers, onion, courgette + herbs + small potato", kcal:460, time:30 },
    { id:"d19", name:"Turkey Pasta",              desc:"80g pasta + 100g minced turkey + jarred tomato sauce + spinach", kcal:460, time:20 },
    { id:"d20", name:"Turkey Meatballs",          desc:"150g turkey meatballs + tomato sauce + 80g pasta + parmesan", kcal:460, time:25 },
    { id:"d21", name:"Turkey Bolognese",          desc:"150g minced turkey + tomato sauce + 80g pasta + parmesan", kcal:450, time:25 },
    { id:"d22", name:"Turkey Chilli",             desc:"150g minced turkey + kidney beans + canned tomato + chilli + 100g rice", kcal:440, time:25 },
    { id:"d23", name:"Minced Beef Rice Bowl",     desc:"120g lean minced beef + onion + garlic + soy + 150g rice + cucumber", kcal:480, time:20 },
    { id:"d24", name:"Beef Stir Fry",             desc:"120g lean beef strips + frozen stir fry veg + noodles + soy + ginger", kcal:450, time:20 },
    { id:"d25", name:"Beef & Broccoli Bowl",      desc:"120g beef strips + broccoli + garlic + oyster sauce + 150g rice", kcal:460, time:20 },
    { id:"d26", name:"Red Lentil Soup",           desc:"Red lentils + onion + carrot + canned tomatoes + cumin + rye bread", kcal:380, time:25 },
    { id:"d27", name:"Lentil Dal",                desc:"Red lentils + light coconut milk + onion + garlic + cumin + coriander + rye bread", kcal:420, time:25 },
    { id:"d28", name:"Black Bean Soup",           desc:"2 cans black beans + onion + garlic + cumin + smoked paprika + rye bread", kcal:400, time:20 },
  ],
  snack: [
    { id:"s1",  name:"Apple + Peanut Butter",           desc:"1 apple + 1 tbsp peanut butter", kcal:160, time:1 },
    { id:"s2",  name:"Apple + Almonds",                  desc:"1 apple + small handful of almonds", kcal:175, time:0 },
    { id:"s3",  name:"Apple + Greek Yogurt",             desc:"1 apple + 100g Greek yogurt + 1 tsp honey", kcal:165, time:1 },
    { id:"s4",  name:"Banana + Almonds",                 desc:"1 banana + small handful of almonds", kcal:190, time:0 },
    { id:"s5",  name:"Banana + Peanut Butter",           desc:"1 banana + 1 tsp peanut butter", kcal:165, time:1 },
    { id:"s6",  name:"Almonds",                          desc:"Small handful (~25g)", kcal:145, time:0 },
    { id:"s7",  name:"Greek Yogurt – Plain",             desc:"150g plain Greek yogurt", kcal:90, time:1 },
    { id:"s8",  name:"Greek Yogurt + Honey",             desc:"150g Greek yogurt + 1 tsp honey", kcal:110, time:1 },
    { id:"s9",  name:"Greek Yogurt + Honey + Walnuts",   desc:"150g Greek yogurt + 1 tsp honey + walnuts", kcal:160, time:1 },
    { id:"s10", name:"Greek Yogurt + Berries",           desc:"150g Greek yogurt + handful of berries", kcal:100, time:1 },
    { id:"s11", name:"Greek Yogurt + Berries + Granola", desc:"150g Greek yogurt + berries + granola sprinkle", kcal:160, time:1 },
    { id:"s12", name:"Boiled Egg + Crispbread",          desc:"1 boiled egg + 1 rye crispbread", kcal:130, time:8 },
    { id:"s13", name:"Boiled Egg + Crispbread + Cucumber", desc:"1 boiled egg + 1 rye crispbread + cucumber slices", kcal:140, time:8 },
  ],
}

// ─── EXERCISE LIBRARY ─────────────────────────────────────────────────────────

export const EXERCISE_LIBRARY = {
  cardio: [
    { id:"c1",  name:"Spinning Class",          desc:"High-energy studio class. 45 min of intervals, hill climbs and sprints.", duration:45, kcalBurn:420, intensity:"high",   equipment:"Spin bike", homeOk:false },
    { id:"c2",  name:"Home Spinning",           desc:"Self-guided ride on a home bike. Set your own pace and intervals.", duration:30, kcalBurn:270, intensity:"medium", equipment:"Spin bike", homeOk:true  },
    { id:"c3",  name:"Treadmill Walk",          desc:"Steady-pace walk at a slight incline. Great for active recovery.", duration:45, kcalBurn:200, intensity:"low",    equipment:"Treadmill", homeOk:false },
    { id:"c4",  name:"Treadmill Run",           desc:"Moderate-pace run. Mix flat and incline for calorie burn.", duration:30, kcalBurn:310, intensity:"high",   equipment:"Treadmill", homeOk:false },
    { id:"c5",  name:"Treadmill Intervals",     desc:"Alternate 2 min fast run with 1 min walk. Repeat 8 rounds.", duration:35, kcalBurn:340, intensity:"high",   equipment:"Treadmill", homeOk:false },
    { id:"c6",  name:"Indoor Walk",             desc:"Brisk walk indoors — around the block, shopping centre, or stairs.", duration:30, kcalBurn:120, intensity:"low",    equipment:"None", homeOk:true  },
    { id:"c7",  name:"Long Indoor Walk",        desc:"45 min steady walk. Great for Fridays or light days.", duration:45, kcalBurn:180, intensity:"low",    equipment:"None", homeOk:true  },
    { id:"c8",  name:"Outdoor Walk",            desc:"Fresh-air walk at comfortable pace.", duration:45, kcalBurn:190, intensity:"low",    equipment:"None", homeOk:true  },
    { id:"c9",  name:"Outdoor Bike Ride",       desc:"Easy outdoor cycling once weather permits (April onwards).", duration:60, kcalBurn:380, intensity:"medium", equipment:"Bicycle", homeOk:true  },
    { id:"c10", name:"Outdoor Bike – Intervals",desc:"Outdoor cycling with 5×3 min hard efforts. April onwards.", duration:60, kcalBurn:450, intensity:"high",   equipment:"Bicycle", homeOk:true  },
    { id:"c11", name:"Jump Rope",               desc:"3×5 min rounds with 1 min rest between. Burns serious calories.", duration:20, kcalBurn:220, intensity:"high",   equipment:"Jump rope", homeOk:true  },
    { id:"c12", name:"Stair Climbing",          desc:"Up and down stairs at home or a tall building. 20 min continuous.", duration:20, kcalBurn:180, intensity:"medium", equipment:"None", homeOk:true  },
  ],
  yoga: [
    { id:"y1",  name:"Morning Yoga",            desc:"Gentle wake-up flow. Sun salutations, hip openers, light stretching.", duration:20, kcalBurn:70,  intensity:"low",    equipment:"Yoga mat", homeOk:true },
    { id:"y2",  name:"Vinyasa Flow",            desc:"Dynamic linked sequence. Builds strength and cardio at the same time.", duration:45, kcalBurn:200, intensity:"medium", equipment:"Yoga mat", homeOk:true },
    { id:"y3",  name:"Yin Yoga",                desc:"Deep passive stretches held 3–5 min. Perfect for rest days.", duration:45, kcalBurn:80,  intensity:"low",    equipment:"Yoga mat", homeOk:true },
    { id:"y4",  name:"Power Yoga",              desc:"Strength-focused yoga. Planks, warriors, arm balances.", duration:45, kcalBurn:230, intensity:"medium", equipment:"Yoga mat", homeOk:true },
    { id:"y5",  name:"Yoga – Core Focus",       desc:"Boat pose, plank variations, side plank. Targets deep core muscles.", duration:30, kcalBurn:110, intensity:"low",    equipment:"Yoga mat", homeOk:true },
    { id:"y6",  name:"Restorative Yoga",        desc:"Supported, fully passive poses. Stress relief and recovery.", duration:40, kcalBurn:60,  intensity:"low",    equipment:"Yoga mat", homeOk:true },
  ],
  pilates: [
    { id:"p1",  name:"Mat Pilates",             desc:"Classic pilates repertoire. Hundred, roll-up, scissors, teaser.", duration:45, kcalBurn:190, intensity:"medium", equipment:"Mat", homeOk:true },
    { id:"p2",  name:"Pilates Core",            desc:"30 min focused on deep core stabilisation and posture muscles.", duration:30, kcalBurn:140, intensity:"low",    equipment:"Mat", homeOk:true },
    { id:"p3",  name:"Pilates – Legs & Glutes", desc:"Side-lying series, clams, bridges. Lower body toning.", duration:30, kcalBurn:150, intensity:"medium", equipment:"Mat", homeOk:true },
    { id:"p4",  name:"Pilates – Full Body",     desc:"50 min class covering all major muscle groups.", duration:50, kcalBurn:220, intensity:"medium", equipment:"Mat", homeOk:true },
    { id:"p5",  name:"Pilates HIIT Fusion",     desc:"Pilates movements at higher tempo with cardio bursts between sets.", duration:40, kcalBurn:280, intensity:"high",   equipment:"Mat", homeOk:true },
  ],
  strength: [
    { id:"w1",  name:"Bodyweight Circuit",      desc:"Squats, lunges, push-ups, glute bridges. 3 rounds, 10 reps each.", duration:30, kcalBurn:210, intensity:"medium", equipment:"None", homeOk:true },
    { id:"w2",  name:"Leg Day – Bodyweight",    desc:"Squats, reverse lunges, side lunges, wall sit, calf raises.", duration:30, kcalBurn:190, intensity:"medium", equipment:"None", homeOk:true },
    { id:"w3",  name:"Upper Body – Bodyweight", desc:"Push-up variations, tricep dips on chair, shoulder press with bag.", duration:25, kcalBurn:160, intensity:"medium", equipment:"Chair", homeOk:true },
    { id:"w4",  name:"HIIT Bodyweight",         desc:"Burpees, high knees, jump squats, mountain climbers. 4 rounds.", duration:25, kcalBurn:300, intensity:"high",   equipment:"None", homeOk:true },
    { id:"w5",  name:"Core & Stability",        desc:"Planks, dead bugs, bird dogs, hollow body hold.", duration:20, kcalBurn:100, intensity:"low",    equipment:"Mat", homeOk:true },
    { id:"w6",  name:"Full Body Strength",      desc:"Compound movements: squats, hinges, push, pull. 4×8 reps.", duration:50, kcalBurn:270, intensity:"medium", equipment:"None", homeOk:true },
  ],
  recovery: [
    { id:"r1",  name:"Rest Day",                desc:"Full rest. Light stretching only if desired. Your body rebuilds on rest days.", duration:0,  kcalBurn:0,   intensity:"none",   equipment:"None", homeOk:true },
    { id:"r2",  name:"Active Recovery Walk",    desc:"Slow, gentle 20 min walk. Keeps you moving without taxing recovery.", duration:20, kcalBurn:70,  intensity:"low",    equipment:"None", homeOk:true },
    { id:"r3",  name:"Foam Roll & Stretch",     desc:"15 min foam rolling + 10 min static stretch.", duration:25, kcalBurn:50,  intensity:"low",    equipment:"Foam roller", homeOk:true },
    { id:"r4",  name:"Mobility Flow",           desc:"Hip circles, thoracic rotations, ankle mobility.", duration:20, kcalBurn:40,  intensity:"low",    equipment:"None", homeOk:true },
  ],
}

// ─── DEFAULT PLAN ─────────────────────────────────────────────────────────────

export const DEFAULT_MEAL_PLAN = [
  { breakfast:"b1",  lunch:"l1",  dinner:"d1",  snack:"s1"  }, { breakfast:"b8",  lunch:"l4",  dinner:"d12", snack:"s6"  },
  { breakfast:"b12", lunch:"l14", dinner:"d26", snack:"s12" }, { breakfast:"b1",  lunch:"l8",  dinner:"d20", snack:"s7"  },
  { breakfast:"b9",  lunch:"l1",  dinner:"d2",  snack:"s1"  }, { breakfast:"b13", lunch:"l4",  dinner:"d24", snack:"s6"  },
  { breakfast:"b16", lunch:"l20", dinner:"d16", snack:"s10" },
  { breakfast:"b3",  lunch:"l15", dinner:"d6",  snack:"s4"  }, { breakfast:"b9",  lunch:"l9",  dinner:"d23", snack:"s1"  },
  { breakfast:"b14", lunch:"l16", dinner:"d22", snack:"s8"  }, { breakfast:"b2",  lunch:"l14", dinner:"d3",  snack:"s12" },
  { breakfast:"b17", lunch:"l15", dinner:"d9",  snack:"s6"  }, { breakfast:"b15", lunch:"l6",  dinner:"d13", snack:"s3"  },
  { breakfast:"b2",  lunch:"l21", dinner:"d27", snack:"s4"  },
  { breakfast:"b5",  lunch:"l2",  dinner:"d7",  snack:"s8"  }, { breakfast:"b12", lunch:"l17", dinner:"d4",  snack:"s2"  },
  { breakfast:"b10", lunch:"l19", dinner:"d28", snack:"s12" }, { breakfast:"b4",  lunch:"l11", dinner:"d21", snack:"s10" },
  { breakfast:"b18", lunch:"l13", dinner:"d15", snack:"s4"  }, { breakfast:"b13", lunch:"l3",  dinner:"d10", snack:"s1"  },
  { breakfast:"b6",  lunch:"l23", dinner:"d17", snack:"s9"  },
  { breakfast:"b1",  lunch:"l5",  dinner:"d5",  snack:"s2"  }, { breakfast:"b11", lunch:"l10", dinner:"d14", snack:"s12" },
  { breakfast:"b17", lunch:"l18", dinner:"d25", snack:"s10" }, { breakfast:"b2",  lunch:"l7",  dinner:"d8",  snack:"s5"  },
  { breakfast:"b13", lunch:"l2",  dinner:"d11", snack:"s3"  }, { breakfast:"b19", lunch:"l12", dinner:"d22", snack:"s6"  },
  { breakfast:"b3",  lunch:"l22", dinner:"d18", snack:"s11" },
]

export const DEFAULT_EXERCISE_PLAN = [
  "c1","p1","c4","y2","y1","c8","r1",
  "c1","w2","c5","p4","y2","c9","r3",
  "c1","p3","c4","w3","y4","c9","r2",
  "c1","w1","c5","p1","y2","c8","r4",
]

// ─── METADATA ─────────────────────────────────────────────────────────────────

export const MEAL_META = {
  breakfast: { label:"Breakfast", accent:"#C8842A", bg:"#FFF8ED", emoji:"☀️" },
  lunch:     { label:"Lunch",     accent:"#3D7A52", bg:"#EEF7EE", emoji:"🥗" },
  dinner:    { label:"Dinner",    accent:"#2E5080", bg:"#EBF0F8", emoji:"🍽️" },
  snack:     { label:"Snack",     accent:"#7A3D80", bg:"#F5EEF8", emoji:"🍎" },
}

export const EX_META = {
  cardio:   { label:"Cardio",   accent:"#C0392B", bg:"#FEF0EE", emoji:"🏃" },
  yoga:     { label:"Yoga",     accent:"#1A7A6E", bg:"#EBF8F6", emoji:"🧘" },
  pilates:  { label:"Pilates",  accent:"#7A5C1E", bg:"#FBF5E6", emoji:"🤸" },
  strength: { label:"Strength", accent:"#2D3A8C", bg:"#EEF0FC", emoji:"💪" },
  recovery: { label:"Recovery", accent:"#5A7A3A", bg:"#EFF6E8", emoji:"🌿" },
}

export const INTENSITY_COLOR = { none:"#CCC", low:"#4A8C5C", medium:"#C8842A", high:"#C0392B" }
export const MEAL_TYPES  = ["breakfast","lunch","dinner","snack"]
export const EX_TYPES    = ["cardio","yoga","pilates","strength","recovery"]
export const WEEK_THEMES = ["Building the habit","Adding variety","Keeping it fresh","Locking it in"]
export const DAY_LABELS  = ["Mon","Tue","Wed","Thu","Fri","Sat","Sun"]

// ─── HELPERS ─────────────────────────────────────────────────────────────────

export const getMeal = id => {
  for (const t of MEAL_TYPES) {
    const f = MEAL_LIBRARY[t].find(m => m.id === id)
    if (f) return { ...f, type: t }
  }
  return null
}

export const getExercise = id => {
  for (const t of EX_TYPES) {
    const f = EXERCISE_LIBRARY[t].find(e => e.id === id)
    if (f) return { ...f, type: t }
  }
  return null
}

export const timeLbl = m => m === 0 ? "No cook" : `${m} min`
export const durLbl  = m => m === 0 ? "Rest" : `${m} min`
