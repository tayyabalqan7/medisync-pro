const interactions = [
  {
    id: 1,
    drug1: "Warfarin",
    drug2: "Aspirin",
    severity: "MAJOR",
    description: "Concurrent use significantly increases the risk of bleeding. Both drugs inhibit platelet function and clotting, and together can cause serious or life-threatening hemorrhage.",
    management: "Avoid combination if possible. If necessary, use minimum effective doses with close INR monitoring and clinical surveillance for bleeding.",
    mechanism: "Pharmacodynamic synergy - both drugs inhibit hemostasis through different mechanisms"
  },
  {
    id: 2,
    drug1: "Metformin",
    drug2: "Alcohol",
    severity: "MAJOR",
    description: "Combination increases the risk of lactic acidosis, a rare but potentially fatal complication. Alcohol potentiates the effect of metformin on lactate metabolism.",
    management: "Advise patients to avoid excessive alcohol consumption. Limit intake to 1-2 units occasionally.",
    mechanism: "Pharmacodynamic interaction - both inhibit hepatic gluconeogenesis and can impair lactate clearance"
  },
  {
    id: 3,
    drug1: "Simvastatin",
    drug2: "Clarithromycin",
    severity: "MAJOR",
    description: "Clarithromycin inhibits CYP3A4, dramatically increasing simvastatin levels. This can cause severe muscle toxicity (myopathy/rhabdomyolysis) and kidney failure.",
    management: "Temporarily discontinue simvastatin during clarithromycin treatment. Switch to a non-CYP3A4 metabolized statin (pravastatin, rosuvastatin).",
    mechanism: "Pharmacokinetic - CYP3A4 inhibition increases simvastatin AUC by 10-fold"
  },
  {
    id: 4,
    drug1: "Atenolol",
    drug2: "Verapamil",
    severity: "MAJOR",
    description: "Both drugs slow heart rate and conduction. Combination can cause complete heart block, severe bradycardia, or cardiac arrest.",
    management: "Generally avoid combination. If used, requires hospitalization and cardiac monitoring. Use with extreme caution.",
    mechanism: "Pharmacodynamic synergy - both inhibit cardiac conduction through different mechanisms"
  },
  {
    id: 5,
    drug1: "Fluoxetine",
    drug2: "Tramadol",
    severity: "MAJOR",
    description: "Can cause serotonin syndrome - potentially life-threatening condition with symptoms including agitation, confusion, rapid heart rate, high blood pressure, fever, and seizures.",
    management: "Avoid combination. If needed, use lowest possible doses with close monitoring. Have patient report agitation, tremor, or fever immediately.",
    mechanism: "Pharmacodynamic - both increase serotonergic activity through different mechanisms"
  },
  {
    id: 6,
    drug1: "Diazepam",
    drug2: "Alcohol",
    severity: "MAJOR",
    description: "Both are CNS depressants. Combination causes excessive sedation, respiratory depression, and can be fatal. Significantly impairs cognition and motor function.",
    management: "Strictly avoid alcohol during benzodiazepine treatment. Warn patients of the life-threatening risk.",
    mechanism: "Pharmacodynamic synergy - both enhance GABA activity causing additive CNS depression"
  },
  {
    id: 7,
    drug1: "Warfarin",
    drug2: "Fluconazole",
    severity: "MAJOR",
    description: "Fluconazole strongly inhibits CYP2C9, the primary enzyme metabolizing warfarin. Can double or triple INR, causing serious bleeding.",
    management: "Reduce warfarin dose by 50% when starting fluconazole. Monitor INR closely and adjust accordingly.",
    mechanism: "Pharmacokinetic - CYP2C9 inhibition decreasing warfarin clearance"
  },
  {
    id: 8,
    drug1: "MAO inhibitors",
    drug2: "Tramadol",
    severity: "MAJOR",
    description: "Combination can cause serotonin syndrome and/or seizures. Potentially fatal interaction.",
    management: "Contraindicated. Allow at least 14 days after stopping MAO inhibitors before starting tramadol.",
    mechanism: "Pharmacodynamic - combined inhibition of monoamine oxidase and reuptake"
  },
  {
    id: 9,
    drug1: "Phenytoin",
    drug2: "Warfarin",
    severity: "MAJOR",
    description: "Complex interaction - phenytoin initially inhibits warfarin metabolism (increasing anticoagulation) then induces it (decreasing anticoagulation). Unpredictable INR changes.",
    management: "Monitor INR very closely when starting, changing, or stopping phenytoin. Frequent dose adjustments needed.",
    mechanism: "Pharmacokinetic - initial CYP2C9 inhibition followed by induction"
  },
  {
    id: 10,
    drug1: "Sertraline",
    drug2: "MAO inhibitors",
    severity: "MAJOR",
    description: "Potentially fatal serotonin syndrome when SSRIs combined with MAO inhibitors.",
    management: "Contraindicated. Wait 14 days after stopping MAOI before starting sertraline; wait 14 days after stopping sertraline before MAOI.",
    mechanism: "Pharmacodynamic - dangerous accumulation of serotonin"
  },
  {
    id: 11,
    drug1: "Ibuprofen",
    drug2: "Warfarin",
    severity: "MODERATE",
    description: "NSAIDs can increase anticoagulant effect of warfarin and cause GI bleeding. Risk is lower than with aspirin but still significant.",
    management: "Avoid regular NSAID use. Use paracetamol for pain instead. If necessary, use minimum dose for shortest duration with INR monitoring.",
    mechanism: "Pharmacodynamic - platelet inhibition plus displacement from albumin; pharmacokinetic - CYP2C9 inhibition"
  },
  {
    id: 12,
    drug1: "ACE inhibitors",
    drug2: "Potassium supplements",
    severity: "MODERATE",
    description: "ACE inhibitors reduce potassium excretion; potassium supplements can cause dangerous hyperkalemia.",
    management: "Monitor serum potassium regularly. Avoid potassium supplements unless potassium is genuinely low. Adjust doses accordingly.",
    mechanism: "Pharmacodynamic - additive effect on potassium retention"
  },
  {
    id: 13,
    drug1: "Ciprofloxacin",
    drug2: "Antacids",
    severity: "MODERATE",
    description: "Antacids containing aluminum, calcium, or magnesium significantly reduce ciprofloxacin absorption, reducing its effectiveness.",
    management: "Take ciprofloxacin 2 hours before or 6 hours after antacids. Same applies for calcium, iron, and zinc supplements.",
    mechanism: "Pharmacokinetic - chelation reduces drug absorption"
  },
  {
    id: 14,
    drug1: "Metformin",
    drug2: "Contrast dye",
    severity: "MODERATE",
    description: "Iodinated contrast can worsen kidney function; if kidneys fail, metformin accumulates causing lactic acidosis.",
    management: "Hold metformin 48 hours before and after contrast procedures. Restart only after confirming adequate kidney function.",
    mechanism: "Indirect - contrast-induced nephropathy leads to metformin accumulation"
  },
  {
    id: 15,
    drug1: "Digoxin",
    drug2: "Amiodarone",
    severity: "MAJOR",
    description: "Amiodarone increases digoxin levels by 70-100% and also sensitizes heart to digoxin toxicity. Can cause serious arrhythmias.",
    management: "Reduce digoxin dose by 50% when starting amiodarone. Monitor digoxin levels and ECG closely.",
    mechanism: "Pharmacokinetic - reduced renal clearance and volume of distribution"
  },
  {
    id: 16,
    drug1: "Theophylline",
    drug2: "Ciprofloxacin",
    severity: "MODERATE",
    description: "Ciprofloxacin inhibits theophylline metabolism, increasing levels and risk of toxicity (seizures, arrhythmias).",
    management: "Monitor theophylline levels closely. Reduce theophylline dose by 30-50% when starting ciprofloxacin.",
    mechanism: "Pharmacokinetic - CYP1A2 inhibition by ciprofloxacin"
  },
  {
    id: 17,
    drug1: "Lithium",
    drug2: "NSAIDs",
    severity: "MODERATE",
    description: "NSAIDs reduce renal lithium clearance, increasing lithium levels and risk of toxicity (tremor, confusion, kidney failure).",
    management: "Avoid NSAIDs in lithium patients. Use paracetamol instead. Monitor lithium levels if NSAIDs unavoidable.",
    mechanism: "Pharmacokinetic - reduced renal lithium clearance through prostaglandin inhibition"
  },
  {
    id: 18,
    drug1: "Carbamazepine",
    drug2: "Oral contraceptives",
    severity: "MODERATE",
    description: "Carbamazepine induces CYP3A4, decreasing contraceptive hormone levels by up to 50%, significantly reducing contraceptive effectiveness.",
    management: "Use alternative or additional contraception (barrier methods). Consider higher dose OC or non-oral contraceptive methods.",
    mechanism: "Pharmacokinetic - CYP3A4 induction accelerates contraceptive metabolism"
  },
  {
    id: 19,
    drug1: "Warfarin",
    drug2: "Clarithromycin",
    severity: "MODERATE",
    description: "Clarithromycin inhibits CYP3A4 and CYP2C9, increasing warfarin levels and bleeding risk.",
    management: "Monitor INR closely during and after antibiotic course. Adjust warfarin dose as needed.",
    mechanism: "Pharmacokinetic - CYP enzyme inhibition"
  },
  {
    id: 20,
    drug1: "Clopidogrel",
    drug2: "Omeprazole",
    severity: "MODERATE",
    description: "Omeprazole inhibits CYP2C19, reducing conversion of clopidogrel to its active form, potentially reducing antiplatelet effectiveness.",
    management: "Use pantoprazole or famotidine as alternatives, which have less CYP2C19 inhibition.",
    mechanism: "Pharmacokinetic - reduced bioactivation of clopidogrel"
  },
  {
    id: 21,
    drug1: "Prednisolone",
    drug2: "NSAIDs",
    severity: "MODERATE",
    description: "Combination significantly increases risk of gastrointestinal ulceration and bleeding.",
    management: "Avoid combination if possible. If necessary, add gastroprotection (PPI). Monitor for GI symptoms.",
    mechanism: "Pharmacodynamic synergy - both impair gastric mucosal defense"
  },
  {
    id: 22,
    drug1: "Furosemide",
    drug2: "Aminoglycosides",
    severity: "MAJOR",
    description: "Both drugs are ototoxic (damage hearing). Combination dramatically increases risk of irreversible hearing loss.",
    management: "Avoid concurrent use if possible. Monitor hearing and drug levels if combination unavoidable.",
    mechanism: "Pharmacodynamic synergy - additive ototoxicity"
  },
  {
    id: 23,
    drug1: "Beta-blockers",
    drug2: "Insulin",
    severity: "MODERATE",
    description: "Beta-blockers mask symptoms of hypoglycemia (tremor, palpitations) and can prolong hypoglycemic episodes.",
    management: "Monitor blood glucose more carefully. Teach patient to rely on sweating as hypoglycemia sign. Use cardioselective beta-blockers.",
    mechanism: "Pharmacodynamic - beta-blockade masks adrenergic symptoms of hypoglycemia"
  },
  {
    id: 24,
    drug1: "Valproic Acid",
    drug2: "Lamotrigine",
    severity: "MODERATE",
    description: "Valproate inhibits lamotrigine metabolism, doubling its half-life and increasing risk of lamotrigine toxicity (rash, Steven-Johnson syndrome).",
    management: "Reduce lamotrigine starting dose to 25mg every other day. Titrate slowly with close monitoring.",
    mechanism: "Pharmacokinetic - glucuronidation inhibition"
  },
  {
    id: 25,
    drug1: "Spironolactone",
    drug2: "ACE inhibitors",
    severity: "MODERATE",
    description: "Both drugs increase potassium retention, increasing risk of life-threatening hyperkalemia especially in patients with kidney disease.",
    management: "Monitor serum potassium and kidney function closely. Avoid in patients with significant kidney impairment.",
    mechanism: "Pharmacodynamic - additive potassium retention"
  }
];

module.exports = interactions;
