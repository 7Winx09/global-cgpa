export interface UniFaq {
  q: string;
  a: string;
}

export interface University {
  key: string;
  name: string;
  short: string;
  slug: string;
  state: string;
  formulaText: string;
  formulaLabel: string;
  inverseLabel: string;
  source: string;
  note?: string;
  exampleCgpa: number;
  forward: (cgpa: number) => number;
  inverse: (pct: number) => number;
  classes: { label: string; cgpa: string }[];
  faqs: UniFaq[];
}

export const universities: University[] = [
  {
    key: 'sppu',
    name: 'Savitribai Phule Pune University',
    short: 'SPPU',
    slug: 'sppu-cgpa-to-percentage',
    state: 'Maharashtra',
    formulaText: 'Percentage = (CGPA × 10) − 7.5',
    formulaLabel: '(CGPA × 10) − 7.5',
    inverseLabel: 'CGPA = (Percentage + 7.5) ÷ 10',
    source: 'SPPU academic ordinances for engineering programmes under the CBCGS pattern',
    note: 'This formula applies to B.E./B.Tech and M.E./M.Tech programmes on the 10-point credit system. Older pre-CBCS patterns and some non-engineering faculties may follow a separate conversion, so confirm with your department if your batch is older.',
    exampleCgpa: 8.5,
    forward: (c) => Math.max(0, c * 10 - 7.5),
    inverse: (p) => (p + 7.5) / 10,
    classes: [
      { label: 'First Class with Distinction', cgpa: '≈ 7.75+' },
      { label: 'First Class', cgpa: '≈ 6.75+' },
      { label: 'Higher Second Class', cgpa: '≈ 6.25+' },
      { label: 'Second Class', cgpa: '≈ 5.5+' },
    ],
    faqs: [
      {
        q: 'What is the official SPPU CGPA to percentage formula?',
        a: 'SPPU converts CGPA to percentage using (CGPA × 10) − 7.5 for engineering programmes on the CBCGS pattern. For example, 8.5 CGPA becomes (8.5 × 10) − 7.5 = 77.5%.',
      },
      {
        q: 'Is 8 CGPA good in SPPU?',
        a: 'Yes. 8 CGPA converts to 72.5% under the SPPU formula, which is comfortably in First Class territory and clears the eligibility bar for nearly all campus placements and most PSU applications.',
      },
      {
        q: 'Why is my SPPU percentage lower than the CBSE formula?',
        a: 'The generic CBSE multiplier (×9.5) gives a higher figure than the SPPU ordinance formula. SPPU grade points are anchored differently, so a 9.0 CGPA is 82.5% at SPPU but 85.5% under CBSE. Always use the SPPU formula for SPPU documents.',
      },
      {
        q: 'Do I need an official conversion certificate from SPPU?',
        a: 'For government job forms, visas and most official purposes, yes. You can apply for a percentage equivalence certificate through your college exam cell or SPPU\'s examination department. The calculator gives you the same figure the certificate will show.',
      },
    ],
  },
  {
    key: 'vtu',
    name: 'Visvesvaraya Technological University',
    short: 'VTU',
    slug: 'vtu-cgpa-to-percentage',
    state: 'Karnataka',
    formulaText: 'Percentage = CGPA × 10',
    formulaLabel: 'CGPA × 10',
    inverseLabel: 'CGPA = Percentage ÷ 10',
    source: 'VTU official circular on CGPA-to-percentage conversion for CBCS schemes',
    note: 'VTU uses the direct ×10 multiplier under its current 2021 and 2022 B.E./B.Tech regulations (students admitted from 2021-22 onwards). The older 2015, 2017 and 2018 CBCS schemes converted with Percentage = (CGPA − 0.75) × 10 instead. If you studied under a very old pre-CBCS marks-based scheme, your marks are already percentages and no conversion is needed.',
    exampleCgpa: 8.5,
    forward: (c) => c * 10,
    inverse: (p) => p / 10,
    classes: [
      { label: 'First Class with Distinction', cgpa: '≈ 7.0+ (70%+)' },
      { label: 'First Class', cgpa: '≈ 6.0+ (60%+)' },
      { label: 'Second Class', cgpa: '≈ 5.0+ (50%+)' },
      { label: 'Pass', cgpa: '≈ 4.0+ (40%+)' },
    ],
    faqs: [
      {
        q: 'What is the VTU CGPA to percentage formula?',
        a: 'Under the current 2021 and 2022 B.E./B.Tech regulations, VTU uses the simple formula Percentage = CGPA × 10. So 8.5 CGPA equals 85%, 9.0 CGPA equals 90%, and a perfect 10.0 CGPA equals 100%. Students from the older 2015/2017/2018 CBCS schemes should apply (CGPA − 0.75) × 10 instead.',
      },
      {
        q: 'Is VTU CGPA equal to percentage directly?',
        a: 'Effectively yes — under the VTU conversion your CGPA digit multiplied by 10 is your percentage. An 8.25 CGPA is 82.5%, which is why VTU students often write both figures interchangeably on resumes.',
      },
      {
        q: 'What CGPA is First Class with Distinction in VTU?',
        a: 'A CGPA of 7.0 or above (70%+) qualifies as First Class with Distinction at VTU, subject to clearing subjects per your scheme rules. First Class starts at 6.0 CGPA (60%).',
      },
      {
        q: 'How do I convert VTU CGPA to a 4.0 GPA for foreign universities?',
        a: 'A common linear approximation is GPA = (CGPA ÷ 10) × 4, so 8.0 CGPA ≈ 3.2 GPA. For official evaluations, services like WES recalculate from your transcripts directly, so always submit transcripts rather than self-converted figures.',
      },
    ],
  },
  {
    key: 'mumbai',
    name: 'University of Mumbai',
    short: 'Mumbai University',
    slug: 'mumbai-university-cgpa-to-percentage',
    state: 'Maharashtra',
    formulaText: 'Percentage = (7.1 × CGPA) + 11',
    formulaLabel: '(7.1 × CGPA) + 11',
    inverseLabel: 'CGPA = (Percentage − 11) ÷ 7.1',
    source: 'University of Mumbai circular for the CBCGS and CBSGS patterns',
    note: 'This is the official conversion for engineering and technology programmes under Mumbai University\'s credit-based grading systems. Programmes still on pure marks-based patterns do not need any conversion.',
    exampleCgpa: 8,
    forward: (c) => Math.min(100, Math.max(0, 7.1 * c + 11)),
    inverse: (p) => (p - 11) / 7.1,
    classes: [
      { label: 'First Class', cgpa: '≈ 6.48+ (57%+)' },
      { label: 'Higher Second Class', cgpa: '≈ 5.51+ (50%+)' },
      { label: 'Second Class', cgpa: '≈ 4.93+ (46%+)' },
      { label: 'Pass', cgpa: '≈ 4.0+ (39%+)' },
    ],
    faqs: [
      {
        q: 'What is the Mumbai University CGPA to percentage formula?',
        a: 'Mumbai University uses Percentage = (7.1 × CGPA) + 11. For example, 8.0 CGPA becomes (7.1 × 8) + 11 = 67.8%. This is the official formula under the CBCGS pattern.',
      },
      {
        q: 'Why does Mumbai University use 7.1×CGPA + 11 instead of ×9.5?',
        a: 'Mumbai University calibrated its grade points so that the passing grade and top grade map to different raw marks than the CBSE model. The 7.1 slope and 11 offset come directly from that calibration in the university\'s official circular.',
      },
      {
        q: 'Is 7 CGPA good in Mumbai University?',
        a: '7 CGPA converts to about 60.7%, which is First Class at Mumbai University. It clears most IT company cut-offs, though product companies and core firms often prefer 7.5+ (about 64.3%).',
      },
      {
        q: 'What is 60% in CGPA at Mumbai University?',
        a: 'Working the official formula backwards: CGPA = (60 − 11) ÷ 7.1 ≈ 6.90. So a 6.9 CGPA is roughly the 60% mark at Mumbai University.',
      },
    ],
  },
  {
    key: 'anna',
    name: 'Anna University',
    short: 'Anna University',
    slug: 'anna-university-cgpa-to-percentage',
    state: 'Tamil Nadu',
    formulaText: 'Percentage = CGPA × 10',
    formulaLabel: 'CGPA × 10',
    inverseLabel: 'CGPA = Percentage ÷ 10',
    source: 'Anna University academic regulations (R2017 / R2021), Clause on equivalent percentage',
    note: 'Anna University\'s regulations state that the equivalent percentage of marks is CGPA × 10, and this holds across R2013, R2017 and R2021. A few older autonomous colleges affiliated to Anna University issue their own conversion rules, so check your college handbook if it is autonomous.',
    exampleCgpa: 8.2,
    forward: (c) => c * 10,
    inverse: (p) => p / 10,
    classes: [
      { label: 'First Class with Distinction', cgpa: '≈ 8.5+ (85%+, no arrears)' },
      { label: 'First Class', cgpa: '≈ 6.5+ (65%+)' },
      { label: 'Second Class', cgpa: '≈ 5.0+ (50%+)' },
      { label: 'Minimum pass', cgpa: '≈ 5.0 CGPA required for degree' },
    ],
    faqs: [
      {
        q: 'What is the official Anna University CGPA to percentage formula?',
        a: 'Anna University\'s academic regulations prescribe Percentage = CGPA × 10. A CGPA of 8.2 equals 82%, and 9.5 equals 95%. The same formula applies to B.E./B.Tech and M.E./M.Tech programmes under R2013, R2017 and R2021.',
      },
      {
        q: 'Is 7.5 CGPA good in Anna University?',
        a: 'Yes. 7.5 CGPA equals 75% under the official ×10 formula, which is First Class and clears the eligibility bar for nearly all service-based IT companies and most government recruitment minimums.',
      },
      {
        q: 'What CGPA is First Class with Distinction at Anna University?',
        a: 'A CGPA of 8.5 or above (85%+) without arrears typically qualifies for First Class with Distinction. First Class without Distinction begins at 6.5 CGPA, provided you clear all subjects per the regulation conditions.',
      },
      {
        q: 'Why do some sites show (CGPA × 10) − 7.5 for Anna University?',
        a: 'That formula belongs to SPPU and a few other universities, and it is often copied incorrectly onto Anna University pages. The Anna University regulations themselves state the equivalent percentage is CGPA × 10. Always rely on your own regulation document or exam cell for official confirmation.',
      },
    ],
  },
  {
    key: 'aktu',
    name: 'Dr. A.P.J. Abdul Kalam Technical University',
    short: 'AKTU',
    slug: 'aktu-cgpa-to-percentage',
    state: 'Uttar Pradesh',
    formulaText: 'Percentage = (CGPA − 0.75) × 10',
    formulaLabel: '(CGPA − 0.75) × 10',
    inverseLabel: 'CGPA = (Percentage ÷ 10) + 0.75',
    source: 'AKTU B.Tech ordinance, Letter No. AKTU/RO/2019/1421 (session 2019-20 onwards)',
    note: 'This formula applies from the 2019-20 session onwards and is mathematically identical to (CGPA × 10) − 7.5. Batches older than 2019 may have been converted under a different rule, so confirm with your college exam cell if your degree predates the 2019 ordinance.',
    exampleCgpa: 8,
    forward: (c) => Math.max(0, (c - 0.75) * 10),
    inverse: (p) => p / 10 + 0.75,
    classes: [
      { label: 'First Division with Distinction', cgpa: '≈ 8.25+ (75%+)' },
      { label: 'First Division', cgpa: '≈ 6.75+ (60%+)' },
      { label: 'Second Division', cgpa: '≈ 5.25+ (45%+)' },
      { label: 'Pass (degree awarded)', cgpa: '≈ 5.0 CGPA minimum' },
    ],
    faqs: [
      {
        q: 'What is the official AKTU CGPA to percentage formula?',
        a: 'Per the AKTU ordinance effective 2019-20 onwards, Percentage = (CGPA − 0.75) × 10. So 8.0 CGPA becomes (8.0 − 0.75) × 10 = 72.5%, and a perfect 10.0 CGPA equals 92.5%, not 100%.',
      },
      {
        q: 'Is the ×9.5 formula correct for AKTU?',
        a: 'No. The ×9.5 multiplier is the generic CBSE/UGC formula. AKTU publishes its own conversion in its ordinance, and the official figure for a given CGPA is lower than the ×9.5 estimate. Use (CGPA − 0.75) × 10 for AKTU marksheets from 2019-20 onwards.',
      },
      {
        q: 'What CGPA is First Class with Distinction at AKTU?',
        a: 'You need a CGPA of 8.25 or higher (75%+) — and most ordinances additionally require that every subject was cleared in the first attempt. Backlogs can disqualify you from Distinction even if your final CGPA crosses 8.25.',
      },
      {
        q: 'Does UPTU (pre-2016) use the same formula?',
        a: 'UPTU was renamed AKTU in 2015-16 and the grading framework carried over. For the 2019-20 session onwards the (CGPA − 0.75) × 10 rule applies; older batches should verify the rule named in their own batch ordinance.',
      },
    ],
  },
  {
    key: 'gtu',
    name: 'Gujarat Technological University',
    short: 'GTU',
    slug: 'gtu-cgpa-to-percentage',
    state: 'Gujarat',
    formulaText: 'Percentage = (CGPA − 0.5) × 10',
    formulaLabel: '(CGPA − 0.5) × 10',
    inverseLabel: 'CGPA = (Percentage ÷ 10) + 0.5',
    source: 'GTU Notification 1/2012 — Indicating CPI-CGPA Equivalent Class (also circulated as Circular GTU/Academic/2013/4903)',
    note: 'GTU uses SPI (semester), CPI (cumulative for the programme) and CGPA terminology, and the same (score − 0.5) × 10 formula applies to all three. A perfect 10.0 CGPA at GTU equals 95%, not 100%.',
    exampleCgpa: 8,
    forward: (c) => Math.max(0, (c - 0.5) * 10),
    inverse: (p) => p / 10 + 0.5,
    classes: [
      { label: 'First Class with Distinction', cgpa: '7.1+ (≈ 66%+)' },
      { label: 'First Class', cgpa: '6.5+ (≈ 60%+)' },
      { label: 'Second Class', cgpa: '5.5+ (≈ 50%+)' },
      { label: 'Pass Class', cgpa: 'below 5.5' },
    ],
    faqs: [
      {
        q: 'What is the official GTU CGPA to percentage formula?',
        a: 'GTU\'s official formula is Percentage = (CGPA − 0.5) × 10, per GTU Notification 1/2012. So 8.0 CGPA/CPI equals 75%, and 7.5 equals 70%. The same formula applies to SPI, CPI and CGPA.',
      },
      {
        q: 'Is (CGPA × 10) − 7.5 correct for GTU?',
        a: 'No — that is the SPPU formula. GTU subtracts only 0.5 before multiplying by 10, which equals CGPA × 10 − 5. The two formulas give different numbers (8.0 CGPA is 75% at GTU but 72.5% under the SPPU rule), so using the wrong one creates a mismatch on official forms.',
      },
      {
        q: 'What CPI is First Class with Distinction at GTU?',
        a: 'A CPI of 7.1 or above qualifies as First Class with Distinction, which is about 66% under the GTU formula. First Class starts at 6.5 CPI and Second Class at 5.5 CPI. GTU does not require a first-attempt pass for Distinction.',
      },
      {
        q: 'Why is a 10.0 CGPA only 95% at GTU?',
        a: 'Because the GTU formula subtracts 0.5 first: (10.0 − 0.5) × 10 = 95%. This is specific to GTU\'s grading calibration and is expected on official documents — it does not mean your marksheet is wrong.',
      },
    ],
  },
  {
    key: 'ktu',
    name: 'APJ Abdul Kalam Technological University',
    short: 'KTU',
    slug: 'ktu-cgpa-to-percentage',
    state: 'Kerala',
    formulaText: 'Percentage = CGPA × 10',
    formulaLabel: 'CGPA × 10',
    inverseLabel: 'CGPA = Percentage ÷ 10',
    source: 'KTU Academic Council decision (2023) on CGPA-to-percentage conversion',
    note: 'KTU revised its conversion in June 2023 (U.O.No. 1584/2023/KTU), replacing the B.Tech 2019-scheme formula Percentage = (10 × CGPA) − 2.5 with the direct CGPA × 10. Certificates issued before the amendment keep the earlier figure, and still-older schemes may reference other constants — check which scheme your document cites.',
    exampleCgpa: 8.5,
    forward: (c) => c * 10,
    inverse: (p) => p / 10,
    classes: [
      { label: 'First Class with Honours', cgpa: '≈ 8.5+' },
      { label: 'First Class', cgpa: '≈ 6.5+' },
      { label: 'Second Class', cgpa: '≈ 5.5+' },
      { label: 'Pass', cgpa: '≈ 5.0 CGPA minimum for degree' },
    ],
    faqs: [
      {
        q: 'What is the official KTU CGPA to percentage formula?',
        a: 'Since the June 2023 order (U.O.No. 1584/2023/KTU), KTU converts CGPA to percentage as simply CGPA × 10. An 8.5 CGPA equals exactly 85%. This replaced the 10 × CGPA − 2.5 formula of the B.Tech 2019 scheme; documents issued before that amendment keep the earlier figure.',
      },
      {
        q: 'What was the old KTU formula?',
        a: 'It depended on your scheme. The B.Tech 2019 regulations used Percentage = (10 × CGPA) − 2.5, so 8.5 CGPA was 82.5% until June 2023, when it was amended to CGPA × 10. The pre-2019 schemes carried an older (10 × CGPA) − 3.75 constant. Check which scheme and regulation your certificate cites before converting.',
      },
      {
        q: 'Is 7 CGPA good in KTU?',
        a: '7 CGPA equals 70% under the current formula, which is solidly First Class at KTU and clears the cut-off for most service-based IT recruiters. First Class with Honours needs roughly 8.5 CGPA.',
      },
      {
        q: 'How is KTU CGPA different from SGPA?',
        a: 'SGPA measures one semester; CGPA is the credit-weighted average across all completed semesters. KTU computes CGPA as Σ(SGPA × semester credits) ÷ Σ(total credits), which is exactly what our SGPA to CGPA calculator does.',
      },
    ],
  },
  {
    key: 'du',
    name: 'University of Delhi',
    short: 'DU',
    slug: 'du-cgpa-to-percentage',
    state: 'Delhi',
    formulaText: 'Percentage = CGPA × 9.5',
    formulaLabel: 'CGPA × 9.5',
    inverseLabel: 'CGPA = Percentage ÷ 9.5',
    source: 'DU Examination Section notification on CBCS/UGCF CGPA-to-percentage equivalence (also applies to SOL and NCWEB)',
    note: 'The University of Delhi follows the UGC-prescribed ×9.5 multiplier across CBCS and UGCF programmes, including SOL and NCWEB. Do not confuse DU with Delhi Technological University (DTU), a separate institution whose engineering ordinance uses a different conversion. For anything official, request a conversion certificate from your college or the DU exam branch.',
    exampleCgpa: 8,
    forward: (c) => Math.min(100, Math.max(0, c * 9.5)),
    inverse: (p) => p / 9.5,
    classes: [
      { label: 'Distinction', cgpa: '≈ 7.5+ (71.25%+)' },
      { label: 'First Division', cgpa: '≈ 6.0+ (57%+)' },
      { label: 'Second Division', cgpa: '≈ 5.0–5.99 (47.5%+)' },
      { label: 'Third Division / Pass', cgpa: '≈ 4.0–4.99' },
    ],
    faqs: [
      {
        q: 'What is the official DU CGPA to percentage formula?',
        a: 'The University of Delhi converts CGPA to percentage using Percentage = CGPA × 9.5, as notified by the DU Examination Section. So 8.0 CGPA equals 76%, and 9.0 CGPA equals 85.5%. The same rule applies to UGCF and CBCS batches, including SOL and NCWEB students.',
      },
      {
        q: 'Is the DU formula the same as the CBSE formula?',
        a: 'Mathematically yes — both use the ×9.5 multiplier derived from CBSE\'s analysis of board marks. That makes DU one of the easiest conversions: multiply your CGPA by 9.5 and the figure matches what your college will certify.',
      },
      {
        q: 'What CGPA is First Division at DU?',
        a: 'A final CGPA of 6.00 or above (about 57%+) puts you in First Division at Delhi University. Distinction requires roughly 7.5 CGPA (71.25%+). Second Division covers 5.00–5.99 CGPA.',
      },
      {
        q: 'Is DU CGPA to percentage different from DTU?',
        a: 'Yes. Delhi Technological University (formerly Delhi College of Engineering) is a separate university and uses its own engineering ordinance, while DU uses CGPA × 9.5. Check which institution issued your marksheet before converting.',
      },
    ],
  },
];

export function getUniversity(key: string): University | undefined {
  return universities.find((u) => u.key === key);
}
