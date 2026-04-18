const symptoms = [
  {
    id: 1,
    name: "Fever",
    description: "Elevated body temperature above 38°C (100.4°F)",
    possible_conditions: ["Viral infection", "Bacterial infection", "Flu", "Malaria", "Dengue", "COVID-19", "Typhoid"],
    home_remedies: [
      "Rest and stay hydrated with plenty of fluids",
      "Lukewarm sponge bath to cool down",
      "Ginger and honey tea",
      "Wet cloth on forehead",
      "Light clothing and cool environment"
    ],
    recommended_medicines: ["Paracetamol", "Ibuprofen", "Aspirin"],
    when_to_see_doctor: "Fever above 39.4°C (103°F), lasting more than 3 days, or with severe headache/rash",
    severity: "moderate"
  },
  {
    id: 2,
    name: "Headache",
    description: "Pain or discomfort in the head, scalp, or neck",
    possible_conditions: ["Tension headache", "Migraine", "Sinus infection", "Hypertension", "Dehydration", "Eye strain"],
    home_remedies: [
      "Rest in a quiet, dark room",
      "Stay hydrated - drink plenty of water",
      "Apply cold or warm compress to head/neck",
      "Ginger tea",
      "Peppermint oil massage on temples",
      "Reduce screen time"
    ],
    recommended_medicines: ["Paracetamol", "Ibuprofen", "Aspirin", "Diclofenac"],
    when_to_see_doctor: "Sudden severe headache, headache with fever/stiff neck, persistent headache despite treatment",
    severity: "mild"
  },
  {
    id: 3,
    name: "Common Cold",
    description: "Viral respiratory infection causing runny nose, sneezing, and congestion",
    possible_conditions: ["Rhinovirus infection", "Coronavirus", "RSV", "Adenovirus"],
    home_remedies: [
      "Rest and sleep",
      "Drink warm fluids like soup and tea",
      "Ginger, honey and lemon tea",
      "Steam inhalation",
      "Gargle with warm salt water",
      "Vitamin C foods (citrus)"
    ],
    recommended_medicines: ["Cetirizine", "Paracetamol", "Vitamin C"],
    when_to_see_doctor: "Symptoms lasting more than 10 days, high fever, difficulty breathing",
    severity: "mild"
  },
  {
    id: 4,
    name: "Sore Throat",
    description: "Pain, scratchiness or irritation in the throat",
    possible_conditions: ["Viral pharyngitis", "Strep throat", "Tonsillitis", "Acid reflux", "Allergies"],
    home_remedies: [
      "Gargle with warm salt water",
      "Honey and ginger tea",
      "Licorice root tea",
      "Ice chips to soothe throat",
      "Rest your voice",
      "Turmeric milk"
    ],
    recommended_medicines: ["Paracetamol", "Ibuprofen", "Amoxicillin (if bacterial)"],
    when_to_see_doctor: "Difficulty swallowing, high fever, white patches on tonsils, symptoms lasting more than a week",
    severity: "mild"
  },
  {
    id: 5,
    name: "Cough",
    description: "Reflex action to clear airways of irritants, mucus, or foreign particles",
    possible_conditions: ["Common cold", "Asthma", "GERD", "Bronchitis", "Pneumonia", "COVID-19", "TB"],
    home_remedies: [
      "Honey and warm water or tea",
      "Steam inhalation",
      "Ginger and turmeric tea",
      "Elevate head while sleeping",
      "Licorice root tea",
      "Avoid smoke and irritants"
    ],
    recommended_medicines: ["Codeine (severe dry cough)", "Salbutamol (asthma-related)", "Amoxicillin (bacterial)"],
    when_to_see_doctor: "Coughing blood, persistent cough more than 3 weeks, associated chest pain or shortness of breath",
    severity: "mild"
  },
  {
    id: 6,
    name: "Nausea",
    description: "Feeling of discomfort in the stomach with an urge to vomit",
    possible_conditions: ["Gastroenteritis", "Pregnancy", "Motion sickness", "Medication side effects", "Food poisoning", "Migraine"],
    home_remedies: [
      "Ginger tea or ginger candies",
      "Peppermint tea",
      "Small, bland meals (BRAT diet)",
      "Deep breathing exercises",
      "Acupressure (wrist P6 point)",
      "Cold compress on back of neck"
    ],
    recommended_medicines: ["Metoclopramide", "Ondansetron", "Promethazine"],
    when_to_see_doctor: "Severe or persistent nausea, inability to keep fluids down, signs of dehydration",
    severity: "mild"
  },
  {
    id: 7,
    name: "Vomiting",
    description: "Forceful expulsion of stomach contents through the mouth",
    possible_conditions: ["Gastroenteritis", "Food poisoning", "Pregnancy", "Appendicitis", "Head injury", "Medication side effects"],
    home_remedies: [
      "Clear fluids in small amounts (ORS, coconut water)",
      "Ginger tea",
      "Rest and avoid solid food initially",
      "BRAT diet when able to eat",
      "Peppermint tea"
    ],
    recommended_medicines: ["ORS", "Ondansetron", "Metoclopramide", "Promethazine"],
    when_to_see_doctor: "Blood in vomit, vomiting more than 24 hours, signs of dehydration, severe abdominal pain",
    severity: "moderate"
  },
  {
    id: 8,
    name: "Diarrhea",
    description: "Loose, watery stools occurring more than 3 times per day",
    possible_conditions: ["Gastroenteritis", "Food poisoning", "IBS", "Crohn's disease", "Cholera", "Antibiotic-associated"],
    home_remedies: [
      "ORS for rehydration",
      "BRAT diet (bananas, rice, applesauce, toast)",
      "Boiled and cooled rice water",
      "Yogurt with probiotics",
      "Avoid dairy, fatty foods, caffeine",
      "Stay well hydrated"
    ],
    recommended_medicines: ["ORS", "Loperamide", "Metronidazole (if infective)", "Zinc"],
    when_to_see_doctor: "Blood in stool, severe dehydration, fever above 39°C, diarrhea lasting more than 2 days",
    severity: "moderate"
  },
  {
    id: 9,
    name: "Stomach Ache",
    description: "Pain or discomfort in the abdominal region",
    possible_conditions: ["Gastritis", "Peptic ulcer", "IBS", "Appendicitis", "Constipation", "Gas/bloating", "Food intolerance"],
    home_remedies: [
      "Warm compress on abdomen",
      "Ginger tea",
      "Peppermint tea",
      "Chamomile tea",
      "Walk or light exercise for gas",
      "Avoid spicy/fatty foods"
    ],
    recommended_medicines: ["Omeprazole", "Metoclopramide", "Antacids", "Buscopan (antispasmodic)"],
    when_to_see_doctor: "Severe or persistent pain, pain with fever, blood in stool, pain spreading to shoulder/back",
    severity: "mild"
  },
  {
    id: 10,
    name: "Back Pain",
    description: "Pain in the lumbar, thoracic, or cervical spine region",
    possible_conditions: ["Muscle strain", "Herniated disc", "Kidney stones", "Osteoarthritis", "Spondylosis", "Sciatica"],
    home_remedies: [
      "Rest but avoid prolonged bed rest",
      "Cold compress for first 48 hours, then heat",
      "Gentle stretching exercises",
      "Massage with warm oil",
      "Maintain good posture",
      "Turmeric milk"
    ],
    recommended_medicines: ["Ibuprofen", "Diclofenac", "Paracetamol", "Muscle relaxants"],
    when_to_see_doctor: "Pain with numbness/weakness, pain after injury, bowel/bladder changes, severe persistent pain",
    severity: "moderate"
  },
  {
    id: 11,
    name: "Joint Pain",
    description: "Pain, stiffness, or swelling in joints",
    possible_conditions: ["Osteoarthritis", "Rheumatoid arthritis", "Gout", "Viral arthritis", "Lupus", "Bursitis"],
    home_remedies: [
      "Rest the affected joint",
      "Ice for acute pain, heat for chronic pain",
      "Turmeric and ginger tea (anti-inflammatory)",
      "Epsom salt bath",
      "Maintain healthy weight",
      "Low-impact exercises like swimming"
    ],
    recommended_medicines: ["Ibuprofen", "Diclofenac", "Prednisolone (severe cases)", "Calcium + Vitamin D"],
    when_to_see_doctor: "Severe swelling, redness and warmth, joint deformity, inability to move joint",
    severity: "moderate"
  },
  {
    id: 12,
    name: "Skin Rash",
    description: "Change in skin color, texture, or appearance",
    possible_conditions: ["Allergic reaction", "Eczema", "Psoriasis", "Contact dermatitis", "Chickenpox", "Drug reaction"],
    home_remedies: [
      "Cool compress to reduce itching",
      "Aloe vera gel",
      "Oatmeal bath",
      "Avoid scratching",
      "Wear loose, breathable clothing",
      "Coconut oil for dry rashes"
    ],
    recommended_medicines: ["Cetirizine", "Loratadine", "Clotrimazole (fungal)", "Hydrocortisone cream"],
    when_to_see_doctor: "Spreading rash, rash with fever, rash with difficulty breathing, infected-looking rash",
    severity: "mild"
  },
  {
    id: 13,
    name: "Allergy",
    description: "Immune system reaction to a foreign substance (allergen)",
    possible_conditions: ["Seasonal allergy", "Food allergy", "Drug allergy", "Contact allergy", "Insect sting allergy"],
    home_remedies: [
      "Identify and avoid triggers",
      "Saline nasal rinse",
      "Local honey for seasonal allergies",
      "Quercetin-rich foods",
      "Neti pot for nasal allergies"
    ],
    recommended_medicines: ["Cetirizine", "Loratadine", "Promethazine", "Prednisolone (severe)"],
    when_to_see_doctor: "Anaphylaxis symptoms (difficulty breathing, severe swelling), severe reactions",
    severity: "moderate"
  },
  {
    id: 14,
    name: "High Blood Pressure",
    description: "Blood pressure consistently above 140/90 mmHg",
    possible_conditions: ["Essential hypertension", "Kidney disease", "Hormonal disorders", "Sleep apnea", "Medication side effects"],
    home_remedies: [
      "DASH diet (low sodium, high potassium)",
      "Regular aerobic exercise",
      "Reduce sodium intake",
      "Limit alcohol and caffeine",
      "Stress management and meditation",
      "Garlic (natural ACE inhibitor)"
    ],
    recommended_medicines: ["Amlodipine", "Lisinopril", "Losartan", "Atenolol", "Furosemide"],
    when_to_see_doctor: "BP above 180/110, headache with vision changes, chest pain, shortness of breath",
    severity: "high"
  },
  {
    id: 15,
    name: "Diabetes",
    description: "Elevated blood glucose levels due to insufficient insulin or insulin resistance",
    possible_conditions: ["Type 1 diabetes", "Type 2 diabetes", "Gestational diabetes", "Pre-diabetes"],
    home_remedies: [
      "Karela (bitter melon) juice",
      "Fenugreek seeds soaked overnight",
      "Cinnamon in diet",
      "Regular physical activity",
      "Low glycemic diet",
      "Portion control"
    ],
    recommended_medicines: ["Metformin", "Glibenclamide", "Insulin", "Sitagliptin"],
    when_to_see_doctor: "Blood sugar above 300 mg/dL, symptoms of DKA, frequent hypoglycemia",
    severity: "high"
  },
  {
    id: 16,
    name: "Chest Pain",
    description: "Pain, pressure, or discomfort in the chest area",
    possible_conditions: ["Angina", "Myocardial infarction", "GERD", "Pleuritis", "Anxiety", "Costochondritis"],
    home_remedies: [
      "Sit upright and stay calm",
      "Antacid if acid reflux suspected",
      "Aspirin if heart attack suspected and not contraindicated",
      "Do NOT delay seeking emergency care for suspected heart attack"
    ],
    recommended_medicines: ["Aspirin (emergency)", "Nitroglycerin (angina)", "Omeprazole (GERD-related)"],
    when_to_see_doctor: "IMMEDIATELY - Chest pain should always be evaluated urgently",
    severity: "critical"
  },
  {
    id: 17,
    name: "Shortness of Breath",
    description: "Difficulty breathing or feeling unable to get enough air",
    possible_conditions: ["Asthma", "COPD", "Heart failure", "Pneumonia", "Anemia", "Anxiety", "COVID-19"],
    home_remedies: [
      "Pursed lip breathing technique",
      "Sit upright or lean slightly forward",
      "Breathing exercises",
      "Use prescribed inhaler if available",
      "Calm environment"
    ],
    recommended_medicines: ["Salbutamol (inhaler)", "Montelukast", "Theophylline", "Furosemide (heart failure)"],
    when_to_see_doctor: "Severe shortness of breath, at rest, with chest pain, or with cyanosis - EMERGENCY",
    severity: "critical"
  },
  {
    id: 18,
    name: "Dizziness",
    description: "Feeling of lightheadedness, unsteadiness, or spinning sensation",
    possible_conditions: ["Vertigo", "Dehydration", "Low blood pressure", "Anemia", "Inner ear disorder", "Diabetes"],
    home_remedies: [
      "Sit or lie down immediately",
      "Drink water (if dehydrated)",
      "Slow position changes",
      "Ginger tea for vertigo",
      "Epley maneuver for BPPV"
    ],
    recommended_medicines: ["Betahistine (Serc)", "Promethazine", "Meclizine"],
    when_to_see_doctor: "Sudden severe dizziness with headache/weakness/speech problems - possible stroke",
    severity: "moderate"
  },
  {
    id: 19,
    name: "Fatigue",
    description: "Persistent tiredness that doesn't improve with rest",
    possible_conditions: ["Anemia", "Thyroid disorder", "Diabetes", "Depression", "Sleep disorder", "Chronic fatigue syndrome"],
    home_remedies: [
      "Regular sleep schedule",
      "Iron and vitamin-rich foods",
      "Ashwagandha supplements",
      "Regular moderate exercise",
      "Reduce caffeine and alcohol",
      "Stay hydrated"
    ],
    recommended_medicines: ["Ferrous Sulfate (if anemic)", "Multivitamins", "Vitamin B12", "Vitamin D3"],
    when_to_see_doctor: "Persistent fatigue for more than 2 weeks, with other symptoms like weight loss or fever",
    severity: "mild"
  },
  {
    id: 20,
    name: "Insomnia",
    description: "Difficulty falling asleep, staying asleep, or poor quality sleep",
    possible_conditions: ["Primary insomnia", "Anxiety", "Depression", "Sleep apnea", "Restless leg syndrome", "Medication side effects"],
    home_remedies: [
      "Consistent sleep schedule",
      "Limit screen time before bed",
      "Chamomile or lavender tea",
      "Dark, cool bedroom",
      "Warm bath before bed",
      "Avoid caffeine after noon"
    ],
    recommended_medicines: ["Diazepam (short-term)", "Melatonin", "Promethazine"],
    when_to_see_doctor: "Insomnia affecting daily function for more than 3 weeks, associated with mental health issues",
    severity: "moderate"
  },
  {
    id: 21,
    name: "Anxiety",
    description: "Excessive worry, nervousness, or fear affecting daily life",
    possible_conditions: ["Generalized anxiety disorder", "Panic disorder", "PTSD", "Social anxiety", "Thyroid disorder"],
    home_remedies: [
      "Deep breathing and mindfulness meditation",
      "Regular exercise",
      "Limit caffeine and alcohol",
      "Ashwagandha",
      "Journaling",
      "Social support"
    ],
    recommended_medicines: ["Sertraline", "Fluoxetine", "Diazepam (short-term)", "Propranolol (for physical symptoms)"],
    when_to_see_doctor: "Anxiety interfering with daily activities, panic attacks, inability to function",
    severity: "moderate"
  },
  {
    id: 22,
    name: "Depression",
    description: "Persistent sadness, loss of interest, and hopelessness",
    possible_conditions: ["Major depressive disorder", "Bipolar disorder", "Seasonal affective disorder", "Postpartum depression"],
    home_remedies: [
      "Regular exercise (proven effective)",
      "Social connection and support",
      "Sunlight exposure",
      "Omega-3 rich foods",
      "Mindfulness and meditation",
      "Creative activities"
    ],
    recommended_medicines: ["Sertraline", "Fluoxetine", "Professional therapy recommended"],
    when_to_see_doctor: "Suicidal thoughts, inability to function, severe symptoms lasting more than 2 weeks",
    severity: "high"
  },
  {
    id: 23,
    name: "Urinary Issues",
    description: "Problems with urination including pain, frequency, or difficulty",
    possible_conditions: ["UTI", "Kidney infection", "Bladder issues", "Prostate enlargement", "Kidney stones"],
    home_remedies: [
      "Drink plenty of water (flush bacteria)",
      "Cranberry juice",
      "Avoid irritants (caffeine, alcohol, spicy foods)",
      "Warm compress for pain",
      "Urinate frequently, don't hold"
    ],
    recommended_medicines: ["Ciprofloxacin (UTI)", "Ceftriaxone (severe)", "Amoxicillin (mild UTI)"],
    when_to_see_doctor: "Blood in urine, fever with urinary symptoms, inability to urinate, severe pain",
    severity: "moderate"
  },
  {
    id: 24,
    name: "Eye Problems",
    description: "Issues affecting vision, eye comfort, or eye appearance",
    possible_conditions: ["Conjunctivitis", "Dry eyes", "Stye", "Glaucoma", "Cataracts", "Allergic conjunctivitis"],
    home_remedies: [
      "Warm compress for stye",
      "Cold compress for allergic conjunctivitis",
      "Artificial tears for dry eyes",
      "Clean eyelids gently",
      "Cucumber slices for puffiness"
    ],
    recommended_medicines: ["Antibiotic eye drops (bacterial)", "Antihistamine drops (allergic)", "Artificial tears"],
    when_to_see_doctor: "Sudden vision loss, severe eye pain, chemical exposure, persistent redness",
    severity: "moderate"
  },
  {
    id: 25,
    name: "Ear Pain",
    description: "Pain or discomfort in one or both ears",
    possible_conditions: ["Otitis media", "Swimmer's ear", "Earwax buildup", "Dental problems", "TMJ disorders"],
    home_remedies: [
      "Warm compress on ear",
      "Olive oil drops for wax",
      "Keep ear dry",
      "Chewing gum for pressure",
      "Elevation of head"
    ],
    recommended_medicines: ["Amoxicillin (bacterial infection)", "Paracetamol (pain)", "Ciprofloxacin ear drops"],
    when_to_see_doctor: "Severe ear pain, drainage from ear, hearing loss, fever with ear pain",
    severity: "moderate"
  },
  {
    id: 26,
    name: "Toothache",
    description: "Pain in or around a tooth",
    possible_conditions: ["Dental caries", "Abscess", "Gum disease", "Cracked tooth", "Impacted wisdom tooth"],
    home_remedies: [
      "Clove oil on affected area",
      "Salt water rinse",
      "Cold compress on cheek",
      "Garlic paste (antibacterial)",
      "Avoid hot/cold foods"
    ],
    recommended_medicines: ["Ibuprofen", "Paracetamol", "Amoxicillin (if abscess)", "Metronidazole"],
    when_to_see_doctor: "Severe pain, swelling of face/jaw, fever, pus drainage - dental emergency",
    severity: "moderate"
  },
  {
    id: 27,
    name: "Menstrual Pain",
    description: "Cramping pain during menstruation (dysmenorrhea)",
    possible_conditions: ["Primary dysmenorrhea", "Endometriosis", "Fibroids", "PCOS", "PID"],
    home_remedies: [
      "Heat pad on lower abdomen",
      "Ginger tea",
      "Exercise and yoga",
      "Omega-3 foods",
      "Magnesium-rich foods",
      "Chamomile tea"
    ],
    recommended_medicines: ["Ibuprofen", "Diclofenac", "Mefenamic acid", "Hormonal contraceptives (severe)"],
    when_to_see_doctor: "Pain not relieved by OTC medicines, increasingly severe pain, unusual symptoms",
    severity: "moderate"
  },
  {
    id: 28,
    name: "Muscle Cramps",
    description: "Sudden, involuntary muscle contractions causing pain",
    possible_conditions: ["Electrolyte imbalance", "Dehydration", "Poor circulation", "Nerve compression", "Medications"],
    home_remedies: [
      "Stretch the affected muscle",
      "Massage the muscle",
      "Heat or cold therapy",
      "Banana (potassium) and magnesium-rich foods",
      "Stay hydrated",
      "Tonic water (quinine) for night cramps"
    ],
    recommended_medicines: ["ORS (electrolytes)", "Magnesium supplements", "Quinine (night cramps)"],
    when_to_see_doctor: "Frequent severe cramps, associated weakness, or cramps in unusual locations",
    severity: "mild"
  },
  {
    id: 29,
    name: "Constipation",
    description: "Infrequent, difficult, or painful bowel movements (less than 3 per week)",
    possible_conditions: ["Poor diet", "Dehydration", "IBS", "Hypothyroidism", "Medication side effects", "Colorectal issues"],
    home_remedies: [
      "Increase fiber intake (fruits, vegetables, whole grains)",
      "Drink 8+ glasses of water daily",
      "Regular exercise",
      "Prunes or prune juice",
      "Warm water with lemon in morning",
      "Isabgol (psyllium husk)"
    ],
    recommended_medicines: ["Lactulose", "Bisacodyl", "Isabgol", "Senna"],
    when_to_see_doctor: "Constipation lasting more than 3 weeks, blood in stool, severe abdominal pain",
    severity: "mild"
  },
  {
    id: 30,
    name: "Acid Reflux",
    description: "Burning sensation in chest (heartburn) due to stomach acid backing up",
    possible_conditions: ["GERD", "Hiatal hernia", "Peptic ulcer", "H. pylori infection"],
    home_remedies: [
      "Eat smaller meals",
      "Avoid lying down after eating",
      "Elevate head of bed",
      "Avoid trigger foods (spicy, fatty, citrus)",
      "Ginger tea",
      "Aloe vera juice",
      "Baking soda in water (temporary)"
    ],
    recommended_medicines: ["Omeprazole", "Pantoprazole", "Ranitidine", "Antacids"],
    when_to_see_doctor: "Symptoms more than twice a week, difficulty swallowing, weight loss",
    severity: "moderate"
  },
  {
    id: 31,
    name: "Migraine",
    description: "Severe, throbbing headache often with nausea, vomiting, and light sensitivity",
    possible_conditions: ["Migraine without aura", "Migraine with aura", "Hemiplegic migraine", "Chronic migraine"],
    home_remedies: [
      "Rest in dark, quiet room",
      "Cold or warm compress",
      "Ginger tea",
      "Caffeine in small amounts",
      "Peppermint oil on temples",
      "Magnesium-rich foods"
    ],
    recommended_medicines: ["Paracetamol", "Ibuprofen", "Propranolol (prevention)", "Valproic acid (prevention)", "Sumatriptan"],
    when_to_see_doctor: "First or worst headache ever, headache with neurological symptoms, increasing frequency",
    severity: "moderate"
  },
  {
    id: 32,
    name: "Arthritis",
    description: "Inflammation and stiffness of joints",
    possible_conditions: ["Osteoarthritis", "Rheumatoid arthritis", "Psoriatic arthritis", "Gout", "Reactive arthritis"],
    home_remedies: [
      "Low-impact exercise (swimming, yoga)",
      "Weight management",
      "Hot and cold therapy",
      "Turmeric (anti-inflammatory)",
      "Fish oil supplements",
      "Gentle stretching"
    ],
    recommended_medicines: ["Ibuprofen", "Diclofenac", "Prednisolone", "Methotrexate (RA)", "Calcium + Vitamin D"],
    when_to_see_doctor: "Rapidly worsening symptoms, new or different joints affected, fever with joint pain",
    severity: "moderate"
  }
];

module.exports = symptoms;
