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
  {
    key: 'sppu',
    name: 'Savitribai Phule Pune University',
    short: 'SPPU',
    slug: 'sppu-cgpa-to-percentage',
    state: 'Maharashtra',
    formulaText: 'Piecewise by grade band (Circular 332/2020):\nO (≥9.50): 20×CGPA−100\nA+ (8.25–9.50): 12×CGPA−25\nA (6.75–8.25): 10×CGPA−7.5\nB+ (5.75–6.75): 5×CGPA+26.25\nB (5.25–5.75): 10×CGPA−2.5\nC (4.75–5.25): 10×CGPA−2.5\nD/P (4.00–4.75): 6.6×CGPA+13.6',
    formulaLabel: 'Piecewise (Circular 332/2020)',
    inverseLabel: 'See calculator for reverse conversion',
    source: 'SPPU Circular No. 332/2020 (08 Dec 2020) — Approval for Conversion Equation of CGPA to Percentage for UG Degree of All Faculties',
    sourceUrl: 'http://sppudocs.unipune.ac.in/sites/circulars/Boards%20And%20Meetings%20Circulars/Forms/DispForm.aspx?ID=618',
    note: 'SPPU uses a piecewise (grade-band) conversion per Circular 332/2020, not a single multiplier. The formula applied depends on the letter grade corresponding to your CGPA. This applies to UG degrees under CBCS (2019 pattern onwards). For pre-CBCS patterns and non-engineering faculties, confirm with your department.',
    exampleCgpa: 8.5,
    forward: (c) => {
      if (c >= 9.5) return Math.max(0, 20 * c - 100);
      if (c >= 8.25) return Math.max(0, 12 * c - 25);
      if (c >= 6.75) return Math.max(0, 10 * c - 7.5);
      if (c >= 5.75) return Math.max(0, 5 * c + 26.25);
      if (c >= 5.25) return Math.max(0, 10 * c - 2.5);
      if (c >= 4.75) return Math.max(0, 10 * c - 2.5);
      if (c >= 4.0) return Math.max(0, 6.6 * c + 13.6);
      return 0;
    },
    inverse: (p) => {
      if (p >= 90) return (p + 100) / 20;
      if (p >= 74) return (p + 25) / 12;
      if (p >= 60) return (p + 7.5) / 10;
      if (p >= 55) return (p - 26.25) / 5;
      if (p >= 50) return (p + 2.5) / 10;
      if (p >= 45) return (p + 2.5) / 10;
      if (p >= 40) return (p - 13.6) / 6.6;
      return p / 10;
    },
    classes: [
      { label: 'First Class with Distinction (O)', cgpa: '≥ 9.50' },
      { label: 'First Class with Distinction (A+)', cgpa: '8.25–9.49' },
      { label: 'First Class (A)', cgpa: '6.75–8.24' },
      { label: 'Higher Second Class (B+)', cgpa: '5.75–6.74' },
      { label: 'Second Class (B/C)', cgpa: '4.75–5.74' },
      { label: 'Pass Class (D/P)', cgpa: '4.00–4.74' },
    ],
    faqs: [
      {
        q: 'What is the official SPPU CGPA to percentage formula?',
        a: 'SPPU uses a piecewise (grade-band) conversion per Circular No. 332/2020 (08 Dec 2020). The formula depends on your CGPA range:\n• ≥9.50 (Grade O): Percentage = 20 × CGPA − 100\n• 8.25–9.49 (Grade A+): Percentage = 12 × CGPA − 25\n• 6.75–8.24 (Grade A): Percentage = 10 × CGPA − 7.5\n• 5.75–6.74 (Grade B+): Percentage = 5 × CGPA + 26.25\n• 5.25–5.74 (Grade B): Percentage = 10 × CGPA − 2.5\n• 4.75–5.24 (Grade C): Percentage = 10 × CGPA − 2.5\n• 4.00–4.74 (Grade D/P): Percentage = 6.6 × CGPA + 13.6\n\nFor example, 8.5 CGPA (Grade A) = 10 × 8.5 − 7.5 = 77.5%. 9.5 CGPA (Grade O) = 20 × 9.5 − 100 = 90%.',
      },
      {
        q: 'Is 8 CGPA good in SPPU?',
        a: 'Yes. 8 CGPA falls in Grade A (6.75–8.24) and converts to 10 × 8 − 7.5 = 72.5%, which is First Class and clears the eligibility bar for nearly all campus placements and most PSU applications.',
      },
      {
        q: 'Why is my SPPU percentage lower than the CBSE formula?',
        a: 'The generic CBSE multiplier (×9.5) gives a higher figure than SPPU\'s piecewise formulas for most grade bands. SPPU grade points are anchored differently. For example, 9.0 CGPA (Grade A+) converts to 12 × 9 − 25 = 83% under SPPU but 85.5% under CBSE. Always use the SPPU piecewise formula for SPPU documents.',
      },
      {
        q: 'Do I need an official conversion certificate from SPPU?',
        a: 'For government job forms, visas and most official purposes, yes. You can apply for a percentage equivalence certificate through your college exam cell or SPPU\'s examination department. The calculator gives you the same figure the certificate will show.',
      },
      {
        q: 'How do I know which grade band my CGPA falls in?',
        a: 'The calculator above automatically applies the correct formula based on your CGPA. The grade bands are: O (≥9.50), A+ (8.25–9.49), A (6.75–8.24), B+ (5.75–6.74), B (5.25–5.74), C (4.75–5.24), D/P (4.00–4.74). Your marksheet may not show the letter grade — use the CGPA range to determine the correct formula.',
      },
      {
        q: 'Worked examples for common CGPA values',
        a: '• 9.5 CGPA (Grade O): 20 × 9.5 − 100 = 90%\n• 8.5 CGPA (Grade A): 10 × 8.5 − 7.5 = 77.5%\n• 8.0 CGPA (Grade A): 10 × 8.0 − 7.5 = 72.5%\n• 7.0 CGPA (Grade A): 10 × 7.0 − 7.5 = 62.5%\n• 6.5 CGPA (Grade B+): 5 × 6.5 + 26.25 = 58.75%\n• 5.5 CGPA (Grade B): 10 × 5.5 − 2.5 = 52.5%\n• 4.5 CGPA (Grade D/P): 6.6 × 4.5 + 13.6 = 43.3%',
      },
    ],
  },
  {
    key: 'vtu',
    name: 'Visvesvaraya Technological University',
    short: 'VTU',
    slug: 'vtu-cgpa-to-percentage',
    state: 'Karnataka',
    formulaText: '2022/2021 scheme (current): Percentage = CGPA × 10\n2015/2017/2018 schemes: Percentage = (CGPA − 0.75) × 10',
    formulaLabel: 'Scheme-dependent (see calculator)',
    inverseLabel: '2022/2021: ÷10 / 2015–2018: (÷10)+0.75',
    source: 'VTU Regulations 2022 §22OB 6.7 (CGPA × 10); VTU CGPA Standard Formula page (2015/2017/2018: (CGPA−0.75)×10)',
    sourceUrl: 'https://vtu.ac.in/wp-content/uploads/2023/05/Regulations-Clr-BE-BTECH-2022-611-02052023.pdf',
    note: 'VTU has two different conversion formulas depending on your regulation scheme:\n• 2022 scheme (and 2021 scheme) — current for students admitted from 2021-22 onwards: Percentage = CGPA × 10\n• 2015, 2017, 2018 CBCS schemes: Percentage = (CGPA − 0.75) × 10\n\nCheck your marksheet or grade card for the scheme/regulation year. The calculator above defaults to the current 2022 scheme. If you are on an older scheme, use the formula noted. Very old pre-CBCS marks-based schemes already have percentages on marksheets and need no conversion.',
    exampleCgpa: 8.5,
    forward: (c) => c * 10,
    inverse: (p) => p / 10,
    classes: [
      { label: 'First Class with Distinction (2022 scheme)', cgpa: '≈ 7.0+ (70%+)' },
      { label: 'First Class (2022 scheme)', cgpa: '≈ 6.0+ (60%+)' },
      { label: 'Second Class (2022 scheme)', cgpa: '≈ 5.0+ (50%+)' },
      { label: 'Pass (2022 scheme)', cgpa: '≈ 4.0+ (40%+)' },
    ],
    faqs: [
      {
        q: 'What is the VTU CGPA to percentage formula?',
        a: 'It depends on your regulation scheme:\n• 2022 scheme (and 2021 scheme) — current for students admitted from 2021-22 onwards: Percentage = CGPA × 10. So 8.5 CGPA = 85%, 9.0 CGPA = 90%, 10.0 CGPA = 100%.\n• 2015, 2017, 2018 CBCS schemes: Percentage = (CGPA − 0.75) × 10. So 8.5 CGPA = 77.5%, 9.0 CGPA = 82.5%.\n\nCheck your marksheet for the scheme/regulation year. The VTU "CGPA Standard Formula" page confirms the older formula for 2015/2017/2018 schemes.',
      },
      {
        q: 'Is VTU CGPA equal to percentage directly?',
        a: 'Only under the 2022/2021 scheme where Percentage = CGPA × 10. Under the older 2015/2017/2018 schemes, you must subtract 0.75 first: (CGPA − 0.75) × 10. An 8.25 CGPA under the 2022 scheme is 82.5%, but under the old scheme it would be 75%.',
      },
      {
        q: 'What CGPA is First Class with Distinction in VTU?',
        a: 'Under the 2022/2021 scheme: CGPA ≥ 7.0 (70%+). Under the 2015/2017/2018 schemes: CGPA ≥ 7.75 (70%+). Subject to clearing subjects per your scheme rules. First Class starts at 6.0 CGPA (60%) for 2022 scheme and 6.75 CGPA (60%) for older schemes.',
      },
      {
        q: 'How do I convert VTU CGPA to a 4.0 GPA for foreign universities?',
        a: 'A common linear approximation is GPA = (CGPA ÷ 10) × 4, so 8.0 CGPA ≈ 3.2 GPA. For official evaluations, services like WES recalculate from your transcripts directly, so always submit transcripts rather than self-converted figures.',
      },
      {
        q: 'Where can I find the official VTU regulations?',
        a: 'VTU Regulations 2022 (§22OB 6.7) for the current CGPA × 10 formula: https://vtu.ac.in/wp-content/uploads/2023/05/Regulations-Clr-BE-BTECH-2022-611-02052023.pdf\nVTU CGPA Standard Formula page for older schemes: https://vtu.ac.in/en/cgpa-standard-formula/',
      },
    ],
  },
  {
    key: 'mumbai',
    name: 'University of Mumbai',
    short: 'Mumbai University',
    slug: 'mumbai-university-cgpa-to-percentage',
    state: 'Maharashtra',
    formulaText: 'Pre-2026 (Circular Exam/Com/97 of 2018, re-affirmed Exam/Result/157 of 2019):\nGeneral: (7.1 × CGPA) + 11\nEngineering (CGPA ≥ 7): (7.4 × CGPA) + 12\n\nPost-2026 (Circular Exam/Result/803 of 2026, effective 1 Jan 2026):\nNo formula — percentage computed from raw marks by college; conversion certificate issued on request only.',
    formulaLabel: 'Pre-2026: (7.1×CGPA)+11 / Post-2026: Raw marks',
    inverseLabel: 'Pre-2026: (Pct−11)÷7.1 / Post-2026: Not applicable',
    source: 'University of Mumbai Circular No. Exam/Result/803 of 2026 (1 Jan 2026) — Repeals formula-based conversion; Circular Exam/Com/97 of 2018 (17 Oct 2018) — Pre-2026 formula',
    sourceUrl: 'https://mu.ac.in/admin/upload/circular/27129CGPA_CGPI to Conversion Circular of 2026.pdf',
    note: 'The University of Mumbai ended formula-based CGPA-to-percentage conversion on 1 January 2026 via Circular No. Exam/Result/803 of 2026. Before that date, two formulas applied: (7.1 × CGPA) + 11 for general programmes, and (7.4 × CGPA) + 12 for engineering (where CGPA ≥ 7). These pre-2026 formulas now apply only to transcripts issued on or before 31 December 2025. Starting 1 January 2026, the university no longer uses any conversion formula — instead, the affiliated college computes the percentage directly from raw marks across all semesters (total obtained ÷ total maximum × 100). A conversion certificate is now issued only when a student specifically requests one; it is no longer printed on the transcript by default.',
    exampleCgpa: 8,
    forward: (c) => Math.min(100, Math.max(0, 7.1 * c + 11)),
    inverse: (p) => (p - 11) / 7.1,
    classes: [
      { label: 'First Class (pre-2026)', cgpa: '≈ 6.48+ (57%+)' },
      { label: 'Higher Second Class (pre-2026)', cgpa: '≈ 5.51+ (50%+)' },
      { label: 'Second Class (pre-2026)', cgpa: '≈ 4.93+ (46%+)' },
      { label: 'Pass (pre-2026)', cgpa: '≈ 4.0+ (39%+)' },
    ],
    faqs: [
      {
        q: 'What is the Mumbai University CGPA to percentage formula?',
        a: 'It depends on your transcript date:\n\n• Transcripts dated on or before 31 December 2025 (pre-2026):\n  – General programmes: Percentage = (7.1 × CGPA) + 11\n  – Engineering (Faculty of Technology, CGPA ≥ 7): Percentage = (7.4 × CGPA) + 12\n  – Engineering (CGPA < 7): Percentage = (7.1 × CGPA) + 11.6\n\n• Transcripts dated 1 January 2026 or later (post-2026):\n  The university repealed all formula-based conversion via Circular No. Exam/Result/803 of 2026. Percentage is now computed from actual raw marks (total marks obtained ÷ total maximum marks × 100) by the affiliated college. A conversion certificate is issued only on student request — it is not printed on the transcript by default.',
      },
      {
        q: 'Why was the formula repealed?',
        a: 'The 2026 circular (Exam/Result/803) states that the formula was an approximate representation and the university is moving to actual-marks-based percentage computation. The new method asks the college to calculate percentage directly from semester marks, which the university considers more accurate. Conversion certificates are now opt-in (requested by student) rather than printed by default.',
      },
      {
        q: 'Is 7 CGPA good in Mumbai University?',
        a: 'For pre-2026 transcripts: 7 CGPA converts to about 60.7% (general) or 60.7% (engineering <7), which is First Class. It clears most IT company cut-offs, though product companies and core firms often prefer 7.5+ (about 64.3%). For post-2026 transcripts, the percentage depends on your actual raw marks, not a formula.',
      },
      {
        q: 'What is 60% in CGPA at Mumbai University?',
        a: 'For pre-2026 transcripts using the general formula: CGPA = (60 − 11) ÷ 7.1 ≈ 6.90. For engineering (CGPA ≥ 7): CGPA = (60 − 12) ÷ 7.4 ≈ 6.49. For post-2026 transcripts, there is no formula — the college computes percentage from raw marks directly.',
      },
      {
        q: 'Where can I read the official 2026 circular?',
        a: 'Circular No. Exam/Result/803 of 2026 dated 1 January 2026, signed by Dr. Pooja Raundale, Board of Examination & Evaluation. Available at: https://mu.ac.in/admin/upload/circular/27129CGPA_CGPI to Conversion Circular of 2026.pdf',
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
    formulaLabel: 'CGPA × 10 (current, all schemes)',
    inverseLabel: 'CGPA = Percentage ÷ 10',
    source: 'KTU U.O. No. 1584/2023/KTU (29 Jun 2023) — B.Tech 2019 scheme; U.O. No. 1867/2023/KTU (27 Jul 2023) — extended to 2015 scheme; U.O. No. 3078/2023/KTU (26 Nov 2023) — all UG/PG schemes',
    sourceUrl: 'http://ece.cet.ac.in/wp-content/uploads/2023/07/1584-2023-KTU_230701_195752.pdf',
    note: 'KTU currently uses Percentage = CGPA × 10 for all schemes (B.Tech 2015, 2019, and all UG/PG programmes) per U.O. No. 3078/2023/KTU (26 Nov 2023). This replaced earlier scheme-specific formulas:\n• B.Tech 2019 scheme (until Jun 2023): Percentage = (10 × CGPA) − 2.5\n• B.Tech 2015 scheme (until Jul 2023): Percentage = (10 × CGPA) − 2.5\n• M.Tech 2015 scheme (until Nov 2023): Percentage = (10 × CGPA) − 3.75\n\nCertificates issued before the respective amendments retain their original figures. For current conversions and new certificates, use CGPA × 10.',
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
        a: 'Since U.O. No. 3078/2023/KTU (26 Nov 2023), KTU uses Percentage = CGPA × 10 for all UG and PG programmes across all schemes. An 8.5 CGPA equals exactly 85%. This unified formula replaced earlier scheme-specific offset formulas.',
      },
      {
        q: 'What were the old KTU formulas?',
        a: 'Before the 2023 revisions:\n• B.Tech 2019 scheme (until U.O. 1584/2023, Jun 2023): Percentage = (10 × CGPA) − 2.5 (e.g., 8.5 CGPA = 82.5%)\n• B.Tech 2015 scheme (until U.O. 1867/2023, Jul 2023): Percentage = (10 × CGPA) − 2.5\n• M.Tech 2015 scheme (until U.O. 3078/2023, Nov 2023): Percentage = (10 × CGPA) − 3.75\n\nDocuments issued before these dates retain their original converted percentages. For current use and new certificates, apply CGPA × 10.',
      },
      {
        q: 'Is 7 CGPA good in KTU?',
        a: '7 CGPA equals 70% under the current formula, which is solidly First Class at KTU and clears the cut-off for most service-based IT recruiters. First Class with Honours needs roughly 8.5 CGPA.',
      },
      {
        q: 'How is KTU CGPA different from SGPA?',
        a: 'SGPA measures one semester; CGPA is the credit-weighted average across all completed semesters. KTU computes CGPA as Σ(SGPA × semester credits) ÷ Σ(total credits), which is exactly what our SGPA to CGPA calculator does.',
      },
      {
        q: 'Where can I find the official KTU orders?',
        a: '• U.O. 1584/2023/KTU (29 Jun 2023) — B.Tech 2019: http://ece.cet.ac.in/wp-content/uploads/2023/07/1584-2023-KTU_230701_195752.pdf\n• U.O. 1867/2023/KTU (27 Jul 2023) — extended to 2015 scheme\n• U.O. 3078/2023/KTU (26 Nov 2023) — all UG/PG schemes',
      },
    ],
},
  {
    key: 'makaut',
    name: 'Maulana Abul Kalam Azad University of Technology',
    short: 'MAKAUT',
    slug: 'makaut-cgpa-to-percentage',
    state: 'West Bengal',
    formulaText: 'Percentage = (CGPA − 0.75) × 10',
    formulaLabel: '(CGPA − 0.75) × 10',
    inverseLabel: 'CGPA = (Percentage ÷ 10) + 0.75',
    source: 'MAKAUT Letter No. COE/MAKAUT,WB/2021-22/0357 (02 Dec 2021) — Controller of Examinations official conversion notice; MAKAUT "How to Calculate Percentage from Your Grade Point" notice (makautwb.ac.in)',
    sourceUrl: 'https://makautexam.net/pdf18/Percentage-Conversion.pdf',
    note: 'MAKAUT (formerly WBUT) uses Percentage = (CGPA − 0.75) × 10 for UG technology programmes (B.Tech, B.Pharm, etc.). The formula applies to both CGPA and DGPA (Degree Grade Point Average) on the final grade card. Important: MAKAUT does not award any class or division on the degree — Clause (iv) of Chapter I, Part 2 of the First Regulation (as amended by Circular COE/MAKAUT,WB/51/2020) states "there shall be no class/division awarded to a student either at semester or degree level". The grade card reports DGPA only. Figures like "First Class at DGPA 6.50" or "Distinction at 7.50" circulating online have no basis in any MAKAUT regulation.',
    exampleCgpa: 8.5,
    forward: (c) => Math.max(0, (c - 0.75) * 10),
    inverse: (p) => p / 10 + 0.75,
    classes: [
      { label: 'No class/division awarded (per MAKAUT regulation)', cgpa: 'DGPA only' },
    ],
    faqs: [
      {
        q: 'What is the official MAKAUT CGPA to percentage formula?',
        a: 'Per MAKAUT Letter No. COE/MAKAUT,WB/2021-22/0357 (02 Dec 2021) from the Controller of Examinations, the official formula is Percentage = (CGPA − 0.75) × 10. For example, 8.5 CGPA = (8.5 − 0.75) × 10 = 77.5%. The same formula applies to DGPA on the final consolidated grade card.',
      },
      {
        q: 'Is CGPA × 10 correct for MAKAUT?',
        a: 'No. The ×10 formula would give 85% for 8.5 CGPA, but MAKAUT\'s official figure is 77.5%. The 0.75 offset is an essential part of the university\'s calibration. Always use (CGPA − 0.75) × 10 for MAKAUT marksheets.',
      },
      {
        q: 'Does MAKAUT award First Class or Distinction?',
        a: 'No. MAKAUT\'s First Regulation (2002), as amended by Circular COE/MAKAUT,WB/51/2020, explicitly states: "There shall be no class/division awarded to a student either at semester or degree level." The degree certificate and grade card report your DGPA (and its percentage equivalent) only. Any "First Class at 6.50 DGPA" or "Distinction at 7.50 DGPA" figures you see online are not from any MAKAUT document.',
      },
      {
        q: 'Where can I find the official MAKAUT conversion notice?',
        a: 'The Controller of Examinations notice "How to Calculate Percentage from Your Grade Point" is available at: https://makautexam.net/pdf18/Percentage-Conversion.pdf. It includes a grade-point-to-percentage table (6.25 = 55%, 6.75 = 60%, 7.25 = 65%, 7.75 = 70%, 8.25 = 75%) that confirms the (CGPA − 0.75) × 10 formula.',
      },
    ],
  },
  {
    key: 'calcutta',
    name: 'University of Calcutta',
    short: 'Calcutta Univ.',
    slug: 'calcutta-university-cgpa-to-percentage',
    state: 'West Bengal',
    formulaText: 'Percentage = CGPA × 10',
    formulaLabel: 'CGPA × 10',
    inverseLabel: 'CGPA = Percentage ÷ 10',
    source: 'University of Calcutta Notification CSR/143/2024 (24 Dec 2024) — Syndicate notification setting CGPA × 10 = Percentage for UG under CCF; CBCS UG Regulation (clause 24 grade table: grade point = 0.10 × percentage)',
    sourceUrl: 'https://www.caluniv.ac.in/ccf-ug/files/CGPA-CSR-143-2024.pdf',
    note: 'University of Calcutta uses Percentage = CGPA × 10 for undergraduate programmes under the Curriculum and Credit Framework (CCF) per Notification CSR/143/2024 (24 Dec 2024). The CBCS regulation grade table (clause 24) sets the numerical grade point at 0.10 × percentage, confirming CGPA × 10. Calcutta University does not award a class or division on UG degrees — instead it assigns letter grades with remarks: A++ Outstanding (9.000+), A+ Excellent (8.000+), A Very Good (7.000+), B+ Good (6.000+), B Average (5.000+), C+ Fair (4.000+), C Satisfactory (3.000+), F Fail. An Honours degree requires minimum CGPA 4.000; 3.000–4.000 gets a General degree. "First Class at CGPA 6.0" figures circulate but come from a postgraduate merit rule, not the UG regulation.',
    exampleCgpa: 8.2,
    forward: (c) => c * 10,
    inverse: (p) => p / 10,
    classes: [
      { label: 'A++ Outstanding', cgpa: '≥ 9.000' },
      { label: 'A+ Excellent', cgpa: '8.000–8.999' },
      { label: 'A Very Good', cgpa: '7.000–7.999' },
      { label: 'B+ Good', cgpa: '6.000–6.999' },
      { label: 'B Average', cgpa: '5.000–5.999' },
      { label: 'C+ Fair', cgpa: '4.000–4.999' },
      { label: 'C Satisfactory (Honours min.)', cgpa: '3.000–3.999' },
    ],
    faqs: [
      {
        q: 'What is the official Calcutta University CGPA to percentage formula?',
        a: 'Per University of Calcutta Notification CSR/143/2024 (24 Dec 2024), the official formula is Percentage = CGPA × 10. An 8.2 CGPA equals 82%, and 7.5 CGPA equals 75%. This applies to UG programmes under the Curriculum and Credit Framework (CCF).',
      },
      {
        q: 'Does Calcutta University award First Class or Distinction?',
        a: 'No. The UG CBCS/CCF regulation does not award class or division. Instead, the degree shows your CGPA (to three decimal places) and a letter grade with a plain-English remark: A++ Outstanding (9.000+), A+ Excellent (8.000+), A Very Good (7.000+), B+ Good (6.000+), B Average (5.000+), C+ Fair (4.000+), C Satisfactory (3.000+). "First Class at CGPA 6.0" is from a postgraduate merit rule, not the UG ordinance.',
      },
      {
        q: 'Is the formula different for pre-CBCS batches?',
        a: 'Pre-CBCS (older) batches received marks-based result cards with percentages already printed — no conversion needed. For CBCS/CCF batches (recent years), use CGPA × 10. If your marksheet already shows a percentage, use that figure directly.',
      },
      {
        q: 'Where can I read the official CSR/143/2024 notification?',
        a: 'The notification is available on the university site: https://www.caluniv.ac.in/ccf-ug/files/CGPA-CSR-143-2024.pdf',
      },
    ],
  },
  {
    key: 'rtu',
    name: 'Rajasthan Technical University',
    short: 'RTU',
    slug: 'rtu-cgpa-to-percentage',
    state: 'Rajasthan',
    formulaText: 'Percentage = CGPA × 10',
    formulaLabel: 'CGPA × 10',
    inverseLabel: 'CGPA = Percentage ÷ 10',
    source: 'RTU Kota CBCS Rules / Dean Academic Affairs conversion guideline; MLVTEC Rule Book 2024-25 §20(iv) (Equivalent Percentage = 10 × CGPA)',
    sourceUrl: 'https://mlvti.ac.in/web/Archive/archive/rule2024.pdf',
    note: 'RTU Kota uses Percentage = CGPA × 10 for its CBCS programmes. The formula is published in the MLVTEC Rule Book 2024-25 (Section 20(iv)) which states "Equivalent Percentage = 10 × CGPA". This applies to B.Tech and other engineering programmes under RTU affiliation. First Division threshold is 60% (CGPA 6.0), First Division with Honours at 75% (CGPA 7.5).',
    exampleCgpa: 8.0,
    forward: (c) => c * 10,
    inverse: (p) => p / 10,
    classes: [
      { label: 'First Division with Honours', cgpa: '≥ 7.5 (75%+)' },
      { label: 'First Division', cgpa: '≥ 6.0 (60%+)' },
      { label: 'Second Division', cgpa: '≥ 5.0 (50%+)' },
      { label: 'Pass', cgpa: '≥ 4.0 (40%+)' },
    ],
    faqs: [
      {
        q: 'What is the official RTU Kota CGPA to percentage formula?',
        a: 'Per the RTU CBCS Rules / Dean Academic Affairs conversion guideline and MLVTEC Rule Book 2024-25 §20(iv), the official formula is Percentage = CGPA × 10. For example, 8.0 CGPA = 80%, 7.5 CGPA = 75%, 6.5 CGPA = 65%.',
      },
      {
        q: 'What CGPA is First Division at RTU?',
        a: 'A CGPA of 6.0 or above (60%+) qualifies as First Division at RTU. First Division with Honours requires CGPA ≥ 7.5 (75%+).',
      },
      {
        q: 'Is the formula different for older batches?',
        a: 'The ×10 formula has been consistent for CBCS batches. Some older sources incorrectly cite (CGPA − 0.75) × 10 or ×9.5 — those belong to other universities (VTU/AKTU or CBSE). For RTU Kota, use CGPA × 10.',
      },
    ],
  },
  {
    key: 'rgpv',
    name: 'Rajiv Gandhi Proudyogiki Vishwavidyalaya',
    short: 'RGPV',
    slug: 'rgpv-cgpa-to-percentage',
    state: 'Madhya Pradesh',
    formulaText: 'Percentage = CGPA × 10',
    formulaLabel: 'CGPA × 10',
    inverseLabel: 'CGPA = Percentage ÷ 10',
    source: 'RGPV Ordinance 30 §2.2 and Ordinance 04(A) BE (CGPA / Max CGPA) × 100 → on 10-point scale: Percentage = CGPA × 10',
    sourceUrl: 'https://www.rgpv.ac.in/UC/frm_download_file.aspx?Filepath=CDN%2FPubContent%2FOrdinance%2FOrdinance+No.+30270713124450.pdf',
    note: 'RGPV Bhopal uses Percentage = CGPA × 10 per Ordinance 30 §2.2 (Credit Based Grading System) and Ordinance 04(A) BE. On the university\'s 10-point scale, (CGPA / 10) × 100 reduces to CGPA × 10. Applies to B.E./B.Tech, M.Tech, MCA, MBA and other programmes. Minimum CGPA 5.0 required for degree award.',
    exampleCgpa: 8.0,
    forward: (c) => c * 10,
    inverse: (p) => p / 10,
    classes: [
      { label: 'First Division with Honours', cgpa: '≥ 7.5 (75%+)' },
      { label: 'First Division', cgpa: '≥ 6.5 (65%+)' },
      { label: 'Second Division', cgpa: '≥ 5.0 (50%+)' },
      { label: 'Minimum pass', cgpa: '5.0 CGPA' },
    ],
    faqs: [
      {
        q: 'What is the official RGPV CGPA to percentage formula?',
        a: 'Per RGPV Ordinance 30 §2.2 (and Ordinance 04(A) BE), the conversion is (CGPA / Maximum CGPA) × 100. On the university\'s 10-point scale this simplifies to Percentage = CGPA × 10. So 8.0 CGPA = 80%, 7.5 CGPA = 75%, 6.5 CGPA = 65%.',
      },
      {
        q: 'What CGPA is First Division with Honours at RGPV?',
        a: 'A CGPA of 7.5 or above (75%+) qualifies for First Division with Honours at RGPV. The ordinance does not condition Distinction on first-attempt pass — RGPV\'s promotion rule allows backlogs cleared in supplementary attempts.',
      },
      {
        q: 'Is there a conversion certificate from RGPV?',
        a: 'RGPV issues transcripts that carry the CGPA; the percentage is computed as CGPA × 10. For a formal percentage equivalence letter, apply to the Controller of Examinations, RGPV, Bhopal. Fee is typically ₹200–500 and processing takes 7–15 working days.',
      },
    ],
  },
  {
    key: 'bput',
    name: 'Biju Patnaik University of Technology',
    short: 'BPUT',
    slug: 'bput-cgpa-to-percentage',
    state: 'Odisha',
    formulaText: 'Percentage = (CGPA − 0.5) × 10',
    formulaLabel: '(CGPA − 0.5) × 10',
    inverseLabel: 'CGPA = (Percentage ÷ 10) + 0.5',
    source: 'BPUT Notice No. BPUT/1717 dated 16-05-2012 (18th Academic Council 07-04-2012, 18th Board of Management 17-04-2012) — Equivalent Percentage of Marks = (CGPA − 0.50) × 10',
    sourceUrl: 'https://www.bput.ac.in/images/documents/Grade-to-Percentage-conversion-rule-notice.pdf',
    note: 'BPUT uses Percentage = (CGPA − 0.5) × 10 for B.Tech, M.Tech, MCA, MBA and other programmes under its CBCS. The university does NOT award class/division on degrees — the percentage is an equivalence aid for external organisations. CGPA 8.0 → 75%, CGPA 7.5 → 70%, CGPA 10.0 → 95%.',
    exampleCgpa: 8.0,
    forward: (c) => Math.max(0, (c - 0.5) * 10),
    inverse: (p) => p / 10 + 0.5,
    classes: [
      { label: 'No class/division awarded (per BPUT regulation)', cgpa: 'CGPA only' },
    ],
    faqs: [
      {
        q: 'What is the official BPUT CGPA to percentage formula?',
        a: 'Per BPUT Notice No. BPUT/1717 dated 16-05-2012 (approved by 18th Academic Council and 18th Board of Management), the official formula is Equivalent Percentage = (CGPA − 0.50) × 10. So 8.0 CGPA = 75%, 7.5 CGPA = 70%, 7.0 CGPA = 65%.',
      },
      {
        q: 'Does BPUT award First Class or Distinction?',
        a: 'No. BPUT\'s regulation states it does not award marks or class/division at semester or degree level. The percentage formula is provided as an equivalence aid for organisations/individuals at their discretion.',
      },
      {
        q: 'Why is 10.0 CGPA only 95% at BPUT?',
        a: 'Because the formula subtracts 0.5 first: (10.0 − 0.5) × 10 = 95%. This is BPUT\'s official calibration — the grade card does not show a class/division.',
      },
    ],
  },
  {
    key: 'jntuh',
    name: 'Jawaharlal Nehru Technological University Hyderabad',
    short: 'JNTUH',
    slug: 'jntuh-cgpa-to-percentage',
    state: 'Telangana',
    formulaText: 'Percentage = (CGPA − 0.5) × 10',
    formulaLabel: '(CGPA − 0.5) × 10',
    inverseLabel: 'CGPA = (Percentage ÷ 10) + 0.5',
    source: 'JNTUH B.Tech Academic Regulations R16/R18/R22/R25, Clause 11.2 / 19.1 — Percentage = (Final CGPA − 0.5) × 10',
    sourceUrl: 'https://jntuh.ac.in/uploads/academics/R22B.Tech.RevisedAcademicRegulations2.pdf',
    note: 'JNTUH uses Percentage = (CGPA − 0.5) × 10 across R16, R18, R20, R22, R25 regulations for B.Tech/B.Pharm. Distinction requires CGPA ≥ 8.0, first-attempt pass in all subjects, AND CGPA ≥ 8.0 maintained every semester from First Year. Applies to affiliated colleges across Telangana (CBIT, VNR VJIET, MGIT, GRIET, Vasavi, etc.).',
    exampleCgpa: 8.0,
    forward: (c) => Math.max(0, (c - 0.5) * 10),
    inverse: (p) => p / 10 + 0.5,
    classes: [
      { label: 'First Class with Distinction', cgpa: '≥ 8.0 (75%+, no backlogs, consistent 8.0+)' },
      { label: 'First Class', cgpa: '≥ 6.5 (60%+)' },
      { label: 'Second Class', cgpa: '≥ 5.5 (50%+)' },
      { label: 'Pass', cgpa: '≥ 5.0 CGPA' },
    ],
    faqs: [
      {
        q: 'What is the official JNTUH CGPA to percentage formula?',
        a: 'Per JNTUH B.Tech Academic Regulations (R22 §11.2 / R25 §19.1), Percentage = (Final CGPA − 0.5) × 10. So 8.0 CGPA = 75%, 7.0 CGPA = 65%, 6.5 CGPA = 60%. The same formula applies to R16, R18, R20, R22, R25.',
      },
      {
        q: 'What is required for Distinction at JNTUH?',
        a: 'Three conditions: (1) Final CGPA ≥ 8.0, (2) Every subject cleared in first appearance, (3) CGPA ≥ 8.0 maintained at end of EVERY semester from First Year onwards. One semester below 8.0 knocks you to First Class.',
      },
      {
        q: 'Is (CGPA − 0.75) × 10 correct for JNTUH?',
        a: 'No — that is the AKTU/VTU/JNTUK formula. JNTUH subtracts only 0.5. Using 0.75 understates your percentage by 2.5 points (e.g., 8.0 CGPA = 72.5% with 0.75 vs 75% official).',
      },
    ],
  },
  {
    key: 'jntuk',
    name: 'Jawaharlal Nehru Technological University Kakinada',
    short: 'JNTUK',
    slug: 'jntuk-cgpa-to-percentage',
    state: 'Andhra Pradesh',
    formulaText: 'R16 onwards: Percentage = (CGPA − 0.75) × 10\nPre-R16 (R10/R13): Percentage = (CGPA − 0.5) × 10',
    formulaLabel: 'Scheme-dependent (R16+: −0.75, Pre-R16: −0.5)',
    inverseLabel: 'R16+: (Pct÷10)+0.75 / Pre-R16: (Pct÷10)+0.5',
    source: 'JNTUK B.Tech (R16) Academic Regulations / Conversion Certificate: Percentage = (CGPA − 0.75) × 10 (2016-17 admitted batch onwards; lateral entry 2017-18+); R23 amendment (Dec 2025) changed to (CGPA − 0.5) × 10',
    sourceUrl: 'https://www.jntufastupdates.com/jntuk-cgpa-to-percentage-conversion-certificate/',
    note: 'JNTUK has different formulas by regulation: R16/R19/R20/R23 (2016-17 batch onwards) use (CGPA − 0.75) × 10 per B.Tech R16 regulations and conversion certificates. R23 amendment (Dec 2025) changed future batches to (CGPA − 0.5) × 10. Pre-R16 (R10/R13) used (CGPA − 0.5) × 10. Check your marksheet for the regulation code (R16, R19, R20, R23).',
    exampleCgpa: 8.0,
    forward: (c) => Math.max(0, (c - 0.75) * 10),
    inverse: (p) => p / 10 + 0.75,
    classes: [
      { label: 'First Class with Distinction (R16+)', cgpa: '≥ 7.5 (70%+)' },
      { label: 'First Class (R16+)', cgpa: '≥ 6.5 (60%+)' },
      { label: 'Second Class (R16+)', cgpa: '≥ 5.5 (50%+)' },
      { label: 'Pass Class (R16+)', cgpa: '≥ 5.0 (45%+)' },
    ],
    faqs: [
      {
        q: 'What is the official JNTUK CGPA to percentage formula?',
        a: 'It depends on your regulation (printed on marksheet/hall ticket):\n• R16, R19, R20, R23 (2016-17 admitted batch onwards): Percentage = (CGPA − 0.75) × 10 — so 8.0 CGPA = 72.5%\n• R23 amendment (Dec 2025) for new admissions: Percentage = (CGPA − 0.5) × 10\n• Pre-R16 (R10/R13): Percentage = (CGPA − 0.5) × 10\nCheck your regulation code before converting.',
      },
      {
        q: 'Is JNTUK formula same as JNTUH?',
        a: 'No. JNTUH uses (CGPA − 0.5) × 10; JNTUK R16+ uses (CGPA − 0.75) × 10 (same as VTU/AKTU/MAKAUT). At 8.0 CGPA: JNTUH = 75%, JNTUK R16+ = 72.5%. Always verify your regulation.',
      },
      {
        q: 'Where do I find my JNTUK regulation?',
        a: 'The regulation code (R16, R19, R20, R23) appears on your marksheet header and hall ticket. It reads as R followed by the last two digits of the year the regulation was introduced (e.g., R23 = 2023 academic regulation).',
      },
    ],
  },
  {
    key: 'osmania',
    name: 'Osmania University',
    short: 'OU',
    slug: 'osmania-university-cgpa-to-percentage',
    state: 'Telangana',
    formulaText: 'R22/R18 (CBCS, most programmes): Percentage = CGPA × 9.5\nUCE B.Tech 2022-23 (Annexure III): Percentage = (CGPA − 0.5) × 10\nPre-2018: Percentage = CGPA × 10',
    formulaLabel: 'Era-dependent (see note)',
    inverseLabel: 'R22/R18: ÷9.5 / UCE 2022-23: (÷10)+0.5 / Pre-2018: ÷10',
    source: 'Osmania University CBCS R18/R22 regulations (CGPA × 9.5); UCE B.Tech Regulations 2022-23 Annexure III ((CGPA − 0.50) × 10)',
    sourceUrl: 'https://www.ouct.ac.in/admin/editoruploads/file/B_Tech%20Rules%20&%20Regulations%20%202022-23%20(1).pdf',
    note: 'Osmania University has different formulas by programme/regulation:\n• Most UG/PG under CBCS R18 (2018-21) and R22 (2022+): Percentage = CGPA × 9.5 (UGC standard)\n• UCE (University College of Engineering) B.Tech 2022-23 regulations (Annexure III): Percentage = (CGPA − 0.50) × 10\n• Pre-2018 regulations: Percentage = CGPA × 10\nCheck your marksheet for the regulation year and programme. For official use, request a conversion certificate from the OU Controller of Examinations.',
    exampleCgpa: 8.0,
    forward: (c) => c * 9.5,
    inverse: (p) => p / 9.5,
    classes: [
      { label: 'First Division with Distinction (×9.5)', cgpa: '≥ 7.9 (75%+)' },
      { label: 'First Division (×9.5)', cgpa: '≥ 6.3 (60%+)' },
      { label: 'Second Division (×9.5)', cgpa: '≥ 5.3 (50%+)' },
      { label: 'Pass (×9.5)', cgpa: '≥ 4.2 (40%+)' },
    ],
    faqs: [
      {
        q: 'What is the official Osmania University CGPA to percentage formula?',
        a: 'It depends on your programme and regulation:\n• Most CBCS programmes (R18 2018-21, R22 2022+): Percentage = CGPA × 9.5\n• UCE B.Tech 2022-23 (Annexure III): Percentage = (CGPA − 0.50) × 10\n• Pre-2018 regulations: Percentage = CGPA × 10\nCheck your marksheet for the regulation year. The legally authoritative percentage is the one on your Consolidated Memorandum of Marks (CMM).',
      },
      {
        q: 'Is 8.0 CGPA = 80% at Osmania?',
        a: 'Only for UCE B.Tech 2022-23 ((8.0−0.5)×10 = 75%) or pre-2018 (8.0×10 = 80%). For most CBCS programmes (R18/R22), 8.0 CGPA = 76% (×9.5). Always verify your regulation.',
      },
      {
        q: 'Does OU issue a conversion certificate?',
        a: 'Yes. Apply to the OU Controller of Examinations for a CGPA-to-percentage conversion certificate. The certificate cites the formula applicable to your batch. Processing fee and time vary — confirm with the examination branch.',
      },
    ],
  },
  {
    key: 'bangalore',
    name: 'Bangalore University',
    short: 'BU',
    slug: 'bangalore-university-cgpa-to-percentage',
    state: 'Karnataka',
    formulaText: 'Percentage = (CGPA − 0.75) × 10',
    formulaLabel: '(CGPA − 0.75) × 10',
    inverseLabel: 'CGPA = (Percentage ÷ 10) + 0.75',
    source: 'Bangalore University CBCS-2021 B.Tech Regulations (NEP-2020, UVCE), Table 13 "Award of Class" note: "% Marks Scored = [CGPA − 0.75] × 10"',
    sourceUrl: 'https://mlvti.ac.in/web/Archive/archive/rule2024.pdf',
    note: 'Bangalore University (via UVCE) uses Percentage = (CGPA − 0.75) × 10 per CBCS-2021 B.Tech regulation (NEP-2020). The regulation\'s Award-of-Class table maps: Second Class CGPA 5.75 (= 50%), First Class CGPA 6.75 (= 60%), Distinction CGPA 7.75 (= 70%). Same −0.75 offset as VTU/JNTUK/AKTU. Applies to B.Tech and other programmes under BU affiliation.',
    exampleCgpa: 8.0,
    forward: (c) => Math.max(0, (c - 0.75) * 10),
    inverse: (p) => p / 10 + 0.75,
    classes: [
      { label: 'First Class with Distinction', cgpa: '≥ 7.75 (70%+)' },
      { label: 'First Class', cgpa: '≥ 6.75 (60%+)' },
      { label: 'Second Class', cgpa: '≥ 5.75 (50%+)' },
      { label: 'Pass Class', cgpa: '≥ 5.0 (40%+)' },
    ],
    faqs: [
      {
        q: 'What is the official Bangalore University CGPA to percentage formula?',
        a: 'Per Bangalore University CBCS-2021 B.Tech Regulations (NEP-2020, administered at UVCE), Table 13 note: Percentage = (CGPA − 0.75) × 10. So 8.0 CGPA = 72.5%, 7.5 CGPA = 67.5%, 7.0 CGPA = 62.5%.',
      },
      {
        q: 'Is Bangalore University formula the same as VTU?',
        a: 'Yes — both use (CGPA − 0.75) × 10 for their current CBCS schemes. Bangalore University\'s CBCS-2021 regulation and VTU\'s 2022 scheme share the same −0.75 offset.',
      },
      {
        q: 'What CGPA is Distinction at Bangalore University?',
        a: 'CGPA ≥ 7.75 (70%+) per the Award-of-Class table in the CBCS-2021 regulation. First Class is CGPA ≥ 6.75 (60%+).',
      },
    ],
  },
  {
    key: 'andhra',
    name: 'Andhra University',
    short: 'AU',
    slug: 'andhra-university-cgpa-to-percentage',
    state: 'Andhra Pradesh',
    formulaText: 'Percentage = CGPA × 9.5',
    formulaLabel: 'CGPA × 9.5',
    inverseLabel: 'CGPA = Percentage ÷ 9.5',
    source: 'CENTAC Puducherry — official CGPA-to-Percentage conversion formula list (Government admissions body): Andhra University = CGPA × 9.5',
    sourceUrl: 'https://www.centacpuducherry.in/job/downloads/CGPA%20TO%20PERCENTAGE%20CONVERSION%20FORMULA1.pdf',
    note: 'Andhra University uses Percentage = CGPA × 9.5 per the CENTAC Puducherry official conversion formula list (government admissions authority for Puducherry). Applies to UG, PG and B.Ed programmes. For official use, students may obtain a conversion certificate from the AU Controller of Examinations.',
    exampleCgpa: 8.0,
    forward: (c) => Math.min(100, Math.max(0, c * 9.5)),
    inverse: (p) => p / 9.5,
    classes: [
      { label: 'First Division with Distinction', cgpa: '≥ 7.9 (75%+)' },
      { label: 'First Division', cgpa: '≥ 6.3 (60%+)' },
      { label: 'Second Division', cgpa: '≥ 5.3 (50%+)' },
      { label: 'Third Division / Pass', cgpa: '≥ 4.2 (40%+)' },
    ],
    faqs: [
      {
        q: 'What is the official Andhra University CGPA to percentage formula?',
        a: 'Per CENTAC Puducherry official conversion formula list, Andhra University = CGPA × 9.5. So 8.0 CGPA = 76%, 7.5 CGPA = 71.25%, 7.0 CGPA = 66.5%.',
      },
      {
        q: 'Is Andhra University formula different from JNTUK?',
        a: 'Yes. Andhra University (general state university) uses ×9.5 (UGC standard). JNTUK (technological university) uses (CGPA − 0.75) × 10 for R16+ batches. They are different institutions with different formulas.',
      },
      {
        q: 'Does AU issue a conversion certificate?',
        a: 'Yes. Students can obtain a CGPA-to-percentage conversion certificate from the Andhra University Controller of Examinations for official purposes.',
      },
    ],
  },
  {
    key: 'kurukshetra',
    name: 'Kurukshetra University',
    short: 'KUK',
    slug: 'kurukshetra-university-cgpa-to-percentage',
    state: 'Haryana',
    formulaText: 'Percentage = CGPA × 10',
    formulaLabel: 'CGPA × 10',
    inverseLabel: 'CGPA = Percentage ÷ 10',
    source: 'Kurukshetra University UG Ordinance (Scheme-B) and subsequent official amendments — CGPA multiplied by 10 gives aggregate percentage',
    sourceUrl: 'https://www.kuk.ac.in/',
    note: 'Kurukshetra University uses Percentage = CGPA × 10 per its UG Ordinance (Scheme-B) and official amendments. CGPA 8.0 = 80%, CGPA 7.5 = 75%, CGPA 6.0 = 60%. First Division threshold is 60% (CGPA 6.0). Distinction at 75% (CGPA 7.5). Applies to affiliated colleges across Haryana.',
    exampleCgpa: 8.0,
    forward: (c) => c * 10,
    inverse: (p) => p / 10,
    classes: [
      { label: 'First Division with Distinction', cgpa: '≥ 7.5 (75%+)' },
      { label: 'First Division', cgpa: '≥ 6.0 (60%+)' },
      { label: 'Second Division', cgpa: '≥ 5.0 (50%+)' },
      { label: 'Pass', cgpa: '≥ 4.0 (40%+)' },
    ],
    faqs: [
      {
        q: 'What is the official Kurukshetra University CGPA to percentage formula?',
        a: 'Per KUK UG Ordinance (Scheme-B), Percentage = CGPA × 10. So 8.0 CGPA = 80%, 7.5 CGPA = 75%, 6.0 CGPA = 60%.',
      },
      {
        q: 'What CGPA is First Division at KUK?',
        a: 'CGPA ≥ 6.0 (60%+) qualifies as First Division. Distinction requires CGPA ≥ 7.5 (75%+).',
      },
      {
        q: 'Is the formula different for NIT Kurukshetra?',
        a: 'Yes. NIT Kurukshetra (an Institute of National Importance) uses CGPA × 9.5 for UG and CGPA × 9.0 for PG per its own regulations. Kurukshetra University (state university) uses CGPA × 10. They are separate institutions.',
      },
    ],
  },
  {
    key: 'mdu',
    name: 'Maharshi Dayanand University',
    short: 'MDU',
    slug: 'mdu-cgpa-to-percentage',
    state: 'Haryana',
    formulaText: 'Percentage = CGPA × 9.5',
    formulaLabel: 'CGPA × 9.5',
    inverseLabel: 'CGPA = Percentage ÷ 9.5',
    source: 'Maharshi Dayanand University prospectus/admission guidelines requiring candidates to upload "proof of conversion formula from CGPA to percentage" — MDU follows UGC standard CGPA × 9.5',
    sourceUrl: 'https://mdu.ac.in/',
    note: 'MDU Rohtak follows the UGC-prescribed CGPA × 9.5 multiplier (as indicated by its admission prospectus requiring proof of conversion formula). CGPA 8.0 = 76%, CGPA 7.5 = 71.25%, CGPA 6.32 ≈ 60%. Applies to UG/PG programmes under MDU affiliation.',
    exampleCgpa: 8.0,
    forward: (c) => Math.min(100, Math.max(0, c * 9.5)),
    inverse: (p) => p / 9.5,
    classes: [
      { label: 'First Division with Distinction', cgpa: '≥ 7.9 (75%+)' },
      { label: 'First Division', cgpa: '≥ 6.32 (60%+)' },
      { label: 'Second Division', cgpa: '≥ 5.26 (50%+)' },
      { label: 'Pass', cgpa: '≥ 4.21 (40%+)' },
    ],
    faqs: [
      {
        q: 'What is the official MDU Rohtak CGPA to percentage formula?',
        a: 'MDU follows the UGC standard CGPA × 9.5 multiplier (as per its admission guidelines requiring conversion formula proof). So 8.0 CGPA = 76%, 7.5 CGPA = 71.25%, 6.32 CGPA ≈ 60%.',
      },
      {
        q: 'What CGPA is First Division at MDU?',
        a: 'CGPA ≥ 6.32 (60%+) for First Division. Distinction at CGPA ≥ 7.9 (75%+).',
      },
      {
        q: 'Is MDU formula same as Kurukshetra University?',
        a: 'No. Kurukshetra University (KUK) uses CGPA × 10; MDU Rohtak uses CGPA × 9.5 (UGC standard). They are different Haryana state universities with different formulas.',
      },
    ],
  },
  {
    key: 'ikgptu',
    name: 'I.K. Gujral Punjab Technical University',
    short: 'IKGPTU',
    slug: 'ikgptu-cgpa-to-percentage',
    state: 'Punjab',
    formulaText: 'April/May 2020 session onwards: Percentage = CGPA × 10\nPre-2020 pass-outs: Percentage = CGPA × 9.5',
    formulaLabel: 'Era-dependent (2020+: ×10, Pre-2020: ×9.5)',
    inverseLabel: '2020+: ÷10 / Pre-2020: ÷9.5',
    source: 'IKGPTU Notification (Ref. IKGPTU/Reg, 30-07-2021) implementing multiplier factor 10 per 52nd Academic Council (Agenda 52.05, 16-01-2020) and 72nd Board of Governors (Agenda 72.07, 23-01-2020), effective April/May 2020 examination session onwards',
    sourceUrl: 'https://ptu.ac.in/wp-content/uploads/2021/08/NF-2209-2013-Implementation-of-multiplier-factor-10-for-conversion-of-CGPA-to-percentage-for-all-the-students-of-IKGPTU-session-2020-onwards.pdf',
    note: 'IKGPTU (formerly PTU) switched from ×9.5 to ×10 for students passing out from April/May 2020 examination session onwards. The change was approved by the 52nd Academic Council and 72nd Board of Governors. Pre-2020 pass-outs used ×9.5. Check your DMC/examination session before converting.',
    exampleCgpa: 8.0,
    forward: (c) => c * 10,
    inverse: (p) => p / 10,
    classes: [
      { label: 'First Division with Distinction (2020+)', cgpa: '≥ 7.5 (75%+)' },
      { label: 'First Division (2020+)', cgpa: '≥ 6.0 (60%+)' },
      { label: 'Second Division (2020+)', cgpa: '≥ 5.0 (50%+)' },
      { label: 'Pre-2020 (×9.5) thresholds apply for older batches' },
    ],
    faqs: [
      {
        q: 'What is the official IKGPTU CGPA to percentage formula?',
        a: 'It depends on your pass-out session:\n• April/May 2020 examination session onwards: Percentage = CGPA × 10\n• Pre-2020 pass-outs: Percentage = CGPA × 9.5\nThe switch was implemented via IKGPTU Notification dated 30-07-2021 (52nd Academic Council, 72nd BoG). Check your DMC for the examination session.',
      },
      {
        q: 'Is 8.0 CGPA = 80% at IKGPTU?',
        a: 'Only if you passed out from April/May 2020 session onwards. Pre-2020 pass-outs: 8.0 CGPA = 76% (×9.5). The formula changed explicitly — verify your batch.',
      },
      {
        q: 'Does IKGPTU issue a conversion certificate?',
        a: 'Yes. Students can request a conversion certificate from the IKGPTU Examination Branch. The certificate will cite the applicable formula based on your pass-out session.',
      },
    ],
  },
  {
    key: 'bharathiar',
    name: 'Bharathiar University',
    short: 'BU',
    slug: 'bharathiar-university-cgpa-to-percentage',
    state: 'Tamil Nadu',
    formulaText: 'Percentage = CGPA × 9.5',
    formulaLabel: 'CGPA × 9.5',
    inverseLabel: 'CGPA = Percentage ÷ 9.5',
    source: 'Bharathiar University Examination Regulations 2021 (First Class with Distinction: CGPA ≥ 7.5; First Class: CGPA ≥ 6.0) — CGPA × 9.5 is the standard conversion',
    sourceUrl: 'https://b-u.ac.in/sites/b-u.ac.in/files/Notice_Board/Syllabus/exam_regulations_2021_new.pdf',
    note: 'Bharathiar University (Coimbatore) uses Percentage = CGPA × 9.5 (UGC standard). NOT ×10 — a common error when comparing with Anna University. Examination Regulations 2021 specify Distinction at CGPA ≥ 7.5 and First Class at CGPA ≥ 6.0. Applies to MBA, MCA, M.Sc, M.Com and other UG/PG programmes.',
    exampleCgpa: 8.0,
    forward: (c) => Math.min(100, Math.max(0, c * 9.5)),
    inverse: (p) => p / 9.5,
    classes: [
      { label: 'First Class with Distinction', cgpa: '≥ 7.5 (71.25%+)' },
      { label: 'First Class', cgpa: '≥ 6.0 (57%+)' },
      { label: 'Second Class', cgpa: '≥ 5.0 (47.5%+)' },
      { label: 'Pass', cgpa: '≥ 4.0 (38%+)' },
    ],
    faqs: [
      {
        q: 'What is the official Bharathiar University CGPA to percentage formula?',
        a: 'Bharathiar University uses Percentage = CGPA × 9.5 (UGC standard). So 8.0 CGPA = 76%, 7.5 CGPA = 71.25%, 6.0 CGPA = 57%. Do NOT use ×10 — that is Anna University\'s formula.',
      },
      {
        q: 'What CGPA is Distinction at Bharathiar University?',
        a: 'Per Examination Regulations 2021, CGPA ≥ 7.5 (71.25%+) qualifies for First Class with Distinction. First Class requires CGPA ≥ 6.0 (57%+).',
      },
      {
        q: 'Is Bharathiar University formula same as Anna University?',
        a: 'No. Anna University uses ×10; Bharathiar University uses ×9.5 (UGC standard). At 8.0 CGPA: Anna = 80%, Bharathiar = 76%. Using the wrong formula inflates the result by 4 percentage points.',
      },
    ],
  },
  {
    key: 'periyar',
    name: 'Periyar University',
    short: 'PU',
    slug: 'periyar-university-cgpa-to-percentage',
    state: 'Tamil Nadu',
    formulaText: 'Percentage = CGPA × 10',
    formulaLabel: 'CGPA × 10',
    inverseLabel: 'CGPA = Percentage ÷ 10',
    source: 'Periyar University CBCS Regulations (BBA CA 2021-22, Table 5): CGPA multiplied by 10 gives equivalent percentage; Grade table maps CGPA 6.0–6.5 to A (First Class), 6.5–7.0 to A+',
    sourceUrl: 'https://www.periyaruniversity.ac.in/Documents/2021/CBCS_Regulations.pdf',
    note: 'Periyar University (Salem) uses Percentage = CGPA × 10 per its CBCS Regulations. Grade table: CGPA ≥ 7.5 = D (Distinction/First Class), 6.5–7.0 = A+, 6.0–6.5 = A (First Class). Applies to UG/PG programmes under Periyar University affiliation.',
    exampleCgpa: 8.0,
    forward: (c) => c * 10,
    inverse: (p) => p / 10,
    classes: [
      { label: 'First Class with Distinction (D)', cgpa: '≥ 7.5 (75%+)' },
      { label: 'First Class (A/A+)', cgpa: '6.0–7.49 (60–74.9%)' },
      { label: 'Second Class (B/B+)', cgpa: '5.0–5.99 (50–59.9%)' },
      { label: 'Re-Appear (U)', cgpa: '< 5.0' },
    ],
    faqs: [
      {
        q: 'What is the official Periyar University CGPA to percentage formula?',
        a: 'Per Periyar University CBCS Regulations, Percentage = CGPA × 10. So 8.0 CGPA = 80%, 7.5 CGPA = 75%, 6.5 CGPA = 65%.',
      },
      {
        q: 'What CGPA is First Class at Periyar University?',
        a: 'CGPA 6.0–7.49 (60–74.9%) per the CBCS grade table (Grade A/A+). Distinction (Grade D) starts at CGPA ≥ 7.5 (75%+).',
      },
      {
        q: 'Is Periyar University formula same as Anna University?',
        a: 'Yes — both use CGPA × 10. However, Anna University requires CGPA ≥ 8.5 for Distinction, while Periyar awards Distinction at CGPA ≥ 7.5. Class thresholds differ.',
      },
    ],
  },
  {
    key: 'kerala',
    name: 'University of Kerala',
    short: 'Kerala Univ.',
    slug: 'kerala-university-cgpa-to-percentage',
    state: 'Kerala',
    formulaText: 'Percentage = CGPA × 9.5',
    formulaLabel: 'CGPA × 9.5',
    inverseLabel: 'CGPA = Percentage ÷ 9.5',
    source: 'University of Kerala CSS/CBCSS guidelines and official transcript format (transcript shows "System of Grading: 75% & above: First Class with Distinction, 60% and above: First Class" with CGPA × 9.5)',
    sourceUrl: 'https://www.keralauniversity.ac.in/pdfs/application_forms/transcript_of_marks_new.pdf',
    note: 'University of Kerala (Thiruvananthapuram) uses Percentage = CGPA × 9.5 (UGC standard) per its CSS/CBCSS system. Transcript format shows percentage conversion with 75%+ Distinction, 60%+ First Class. Applies to UG/PG programmes. For B.Tech 2003 scheme, classification was CGPA-based (7.5+ Distinction, 6.0+ First Class), but percentage conversion remains ×9.5.',
    exampleCgpa: 8.0,
    forward: (c) => Math.min(100, Math.max(0, c * 9.5)),
    inverse: (p) => p / 9.5,
    classes: [
      { label: 'First Class with Distinction', cgpa: '≥ 7.9 (75%+)' },
      { label: 'First Class', cgpa: '≥ 6.3 (60%+)' },
      { label: 'Second Class', cgpa: '≥ 5.3 (50%+)' },
      { label: 'Pass', cgpa: '≥ 4.2 (40%+)' },
    ],
    faqs: [
      {
        q: 'What is the official University of Kerala CGPA to percentage formula?',
        a: 'Per University of Kerala CSS/CBCSS guidelines and transcript format, Percentage = CGPA × 9.5. So 8.0 CGPA = 76%, 7.5 CGPA = 71.25%, 6.32 CGPA ≈ 60%.',
      },
      {
        q: 'What CGPA is First Class at Kerala University?',
        a: 'CGPA ≥ 6.32 (60%+) for First Class. Distinction at CGPA ≥ 7.9 (75%+). The official transcript shows percentage bands: 75%+ Distinction, 60%+ First Class, 50%+ Second Class.',
      },
      {
        q: 'Is Kerala University formula different from KTU?',
        a: 'Yes. University of Kerala (general state university) uses ×9.5 (UGC standard). KTU (technological university) uses ×10 for all current schemes. At 8.0 CGPA: Kerala Univ = 76%, KTU = 80%. Different institutions, different formulas.',
      },
    ],
  },
  {
    key: 'calicut',
    name: 'University of Calicut',
    short: 'UOC',
    slug: 'calicut-university-cgpa-to-percentage',
    state: 'Kerala',
    formulaText: 'Percentage = (CGPA − 0.75) × 10',
    formulaLabel: '(CGPA − 0.75) × 10',
    inverseLabel: 'CGPA = (Percentage ÷ 10) + 0.75',
    source: 'University of Calicut CBCSS Regulations: Percentage = (CGPA − 0.75) × 10 (AICTE-approved engineering standard)',
    sourceUrl: 'https://www.universityofcalicut.info/',
    note: 'University of Calicut (Malappuram) uses Percentage = (CGPA − 0.75) × 10 per its Credit and Semester System (CSS) — the AICTE-approved engineering standard. This matches VTU, AKTU, MAKAUT, JNTUK R16+. CGPA 8.0 = 72.5%, CGPA 7.5 = 67.5%, CGPA 7.0 = 62.5%. Distinction at CGPA ≥ 7.75 (70%+). Not ×10 — a common error.',
    exampleCgpa: 8.0,
    forward: (c) => Math.max(0, (c - 0.75) * 10),
    inverse: (p) => p / 10 + 0.75,
    classes: [
      { label: 'First Class with Distinction', cgpa: '≥ 7.75 (70%+)' },
      { label: 'First Class', cgpa: '≥ 6.75 (60%+)' },
      { label: 'Second Class', cgpa: '≥ 5.75 (50%+)' },
      { label: 'Pass', cgpa: '≥ 5.0 (40%+)' },
    ],
    faqs: [
      {
        q: 'What is the official Calicut University CGPA to percentage formula?',
        a: 'Per University of Calicut CBCSS Regulations, Percentage = (CGPA − 0.75) × 10. So 8.0 CGPA = 72.5%, 7.5 CGPA = 67.5%, 7.0 CGPA = 62.5%. This is the AICTE engineering standard.',
      },
      {
        q: 'Is Calicut University formula ×10 or ×9.5?',
        a: 'Neither. It uses (CGPA − 0.75) × 10 (AICTE standard). Do NOT use ×10 (that gives 80% for 8.0 CGPA — 7.5 points too high) or ×9.5 (gives 76% — 3.5 points too high). Official figure for 8.0 CGPA is 72.5%.',
      },
      {
        q: 'What CGPA is Distinction at Calicut University?',
        a: 'CGPA ≥ 7.75 (70%+) for First Class with Distinction. First Class at CGPA ≥ 6.75 (60%+). Same thresholds as VTU 2015-18 schemes and AKTU.',
      },
    ],
  },
  {
    key: 'rajasthan',
    name: 'University of Rajasthan',
    short: 'UNIRAJ',
    slug: 'rajasthan-university-cgpa-to-percentage',
    state: 'Rajasthan',
    formulaText: 'Percentage = CGPA × 10',
    formulaLabel: 'CGPA × 10',
    inverseLabel: 'CGPA = Percentage ÷ 10',
    source: 'University of Rajasthan (UNIRAJ) CBCS regulations — direct 10-point multiplier for percentage equivalence',
    sourceUrl: 'https://www.uniraj.ac.in/',
    note: 'University of Rajasthan (Jaipur) uses Percentage = CGPA × 10 per its CBCS regulations for UG/PG programmes. CGPA 8.0 = 80%, CGPA 7.5 = 75%, CGPA 6.0 = 60%. First Division at 60% (CGPA 6.0), Distinction at 75% (CGPA 7.5). Not to be confused with RTU Kota (also uses ×10 but separate institution).',
    exampleCgpa: 8.0,
    forward: (c) => c * 10,
    inverse: (p) => p / 10,
    classes: [
      { label: 'First Division with Distinction', cgpa: '≥ 7.5 (75%+)' },
      { label: 'First Division', cgpa: '≥ 6.0 (60%+)' },
      { label: 'Second Division', cgpa: '≥ 5.0 (50%+)' },
      { label: 'Pass', cgpa: '≥ 4.0 (40%+)' },
    ],
    faqs: [
      {
        q: 'What is the official University of Rajasthan CGPA to percentage formula?',
        a: 'Per UNIRAJ CBCS regulations, Percentage = CGPA × 10. So 8.0 CGPA = 80%, 7.5 CGPA = 75%, 6.0 CGPA = 60%.',
      },
      {
        q: 'Is UNIRAJ formula same as RTU Kota?',
        a: 'Both use CGPA × 10, but they are separate institutions. University of Rajasthan (UNIRAJ) is the state general university in Jaipur; RTU Kota is the technical university in Kota. Always check which institution issued your marksheet.',
      },
      {
        q: 'What CGPA is First Division at UNIRAJ?',
        a: 'CGPA ≥ 6.0 (60%+) for First Division. Distinction at CGPA ≥ 7.5 (75%+).',
      },
    ],
  },
  {
    key: 'rtmnu',
    name: 'Rashtrasant Tukadoji Maharaj Nagpur University',
    short: 'RTMNU',
    slug: 'rtmnu-cgpa-to-percentage',
    state: 'Maharashtra',
    formulaText: 'Percentage = CGPA × 10',
    formulaLabel: 'CGPA × 10',
    inverseLabel: 'CGPA = Percentage ÷ 10',
    source: 'RTMNU Direction No. 33 of 2019 (Examination Ordinance) — Equivalent % = CGPA × 10 for CBCS programmes',
    sourceUrl: 'https://www.nagpuruniversity.ac.in/',
    note: 'RTMNU (Nagpur) uses Percentage = CGPA × 10 per Direction No. 33 of 2019. CGPA 8.0 = 80%, CGPA 7.5 = 75%, CGPA 6.75 = 67.5% (First Division). First Division threshold CGPA 6.75 (60%+). Distinction at CGPA 8.25 (82.5%+). Applies to B.E./B.Tech and other programmes.',
    exampleCgpa: 8.0,
    forward: (c) => c * 10,
    inverse: (p) => p / 10,
    classes: [
      { label: 'First Division with Distinction', cgpa: '≥ 8.25 (82.5%+)' },
      { label: 'First Division', cgpa: '≥ 6.75 (67.5%+)' },
      { label: 'Second Division', cgpa: '≥ 5.5 (55%+)' },
      { label: 'Pass', cgpa: '≥ 4.5 (45%+)' },
    ],
    faqs: [
      {
        q: 'What is the official RTMNU Nagpur CGPA to percentage formula?',
        a: 'Per RTMNU Direction No. 33 of 2019, Percentage = CGPA × 10. So 8.0 CGPA = 80%, 7.5 CGPA = 75%, 6.75 CGPA = 67.5%.',
      },
      {
        q: 'What CGPA is First Division at RTMNU?',
        a: 'CGPA ≥ 6.75 (67.5%+) for First Division. Distinction at CGPA ≥ 8.25 (82.5%+). Note: RTMNU uses a 67.5% threshold for First Division, not the conventional 60%.',
      },
      {
        q: 'Is RTMNU formula same as Mumbai University or SPPU?',
        a: 'No. RTMNU uses CGPA × 10. Mumbai University (pre-2026) used (7.1×CGPA)+11; SPPU uses piecewise grade-band formulas. RTMNU is a direct ×10 multiplier.',
      },
    ],
  },
  {
    key: 'shivaji',
    name: 'Shivaji University',
    short: 'SUK',
    slug: 'shivaji-university-cgpa-to-percentage',
    state: 'Maharashtra',
    formulaText: 'Percentage = CGPA × 9.5',
    formulaLabel: 'CGPA × 9.5',
    inverseLabel: 'CGPA = Percentage ÷ 9.5',
    source: 'Shivaji University Kolhapur (SUK) CBCS regulations — UGC standard CGPA × 9.5 multiplier for UG/PG programmes across Kolhapur, Sangli, Satara districts',
    sourceUrl: 'https://www.unishivaji.ac.in/',
    note: 'Shivaji University (Kolhapur) uses Percentage = CGPA × 9.5 (UGC standard) per its CBCS regulations. CGPA 8.0 = 76%, CGPA 7.5 = 71.25%, CGPA 6.32 ≈ 60%. Applies to affiliated colleges across Kolhapur, Sangli, Satara. For MPSC/GATE/PSU applications, use ×9.5. Do not confuse with ×10 formulas of some other Maharashtra universities.',
    exampleCgpa: 8.0,
    forward: (c) => Math.min(100, Math.max(0, c * 9.5)),
    inverse: (p) => p / 9.5,
    classes: [
      { label: 'First Division with Distinction', cgpa: '≥ 7.9 (75%+)' },
      { label: 'First Division', cgpa: '≥ 6.32 (60%+)' },
      { label: 'Second Division', cgpa: '≥ 5.26 (50%+)' },
      { label: 'Pass', cgpa: '≥ 4.21 (40%+)' },
    ],
    faqs: [
      {
        q: 'What is the official Shivaji University CGPA to percentage formula?',
        a: 'Per Shivaji University CBCS regulations, Percentage = CGPA × 9.5. So 8.0 CGPA = 76%, 7.5 CGPA = 71.25%, 6.32 CGPA ≈ 60%.',
      },
      {
        q: 'What CGPA is First Division at Shivaji University?',
        a: 'CGPA ≥ 6.32 (60%+) for First Division. Distinction at CGPA ≥ 7.9 (75%+).',
      },
      {
        q: 'Is Shivaji University formula same as RTMNU or SPPU?',
        a: 'No. RTMNU uses ×10; SPPU uses piecewise grade-band formulas. Shivaji University uses ×9.5 (UGC standard). Always verify your university before converting.',
      },
    ],
  },
  {
    key: 'bamu',
    name: 'Dr. Babasaheb Ambedkar Marathwada University',
    short: 'BAMU',
    slug: 'bamu-cgpa-to-percentage',
    state: 'Maharashtra',
    formulaText: 'B.E./B.Tech NEP-2020: Percentage = CGPA × 10\nPre-NEP / Non-engineering: Percentage = CGPA × 9.5',
    formulaLabel: 'Era/programme-dependent (NEP Engg: ×10, Others: ×9.5)',
    inverseLabel: 'NEP Engg: ÷10 / Others: ÷9.5',
    source: 'BAMU Circular No. SU/Engg./NEP/Scheme of Exam/86/2025 (B.E./B.Tech NEP-2020): "Percentage = CGPA × 10"; Non-engineering/Pre-NEP uses ×9.5',
    sourceUrl: 'https://bamu.ac.in/',
    note: 'Dr. Babasaheb Ambedkar Marathwada University (Chhatrapati Sambhajinagar / Aurangabad) has two formulas:\n• B.E./B.Tech under NEP-2020 (Circular SU/Engg./NEP/Scheme of Exam/86/2025): Percentage = CGPA × 10\n• Non-engineering / Pre-NEP batches: Percentage = CGPA × 9.5 (UGC standard)\nDo NOT confuse with DBATU (Dr. Babasaheb Ambedkar Technological University, Lonere) which uses (CGPA − 0.5) × 10. Two different universities, similar names, different formulas.',
    exampleCgpa: 8.0,
    forward: (c) => c * 10,
    inverse: (p) => p / 10,
    classes: [
      { label: 'First Division with Distinction (×10)', cgpa: '≥ 7.5 (75%+)' },
      { label: 'First Division (×10)', cgpa: '≥ 6.0 (60%+)' },
      { label: 'Second Division (×10)', cgpa: '≥ 5.0 (50%+)' },
      { label: 'Non-Engg (×9.5) thresholds differ' },
    ],
    faqs: [
      {
        q: 'What is the official BAMU Aurangabad CGPA to percentage formula?',
        a: 'It depends on your programme:\n• B.E./B.Tech NEP-2020 (Circular SU/Engg./NEP/Scheme of Exam/86/2025): Percentage = CGPA × 10\n• Non-engineering / Pre-NEP batches: Percentage = CGPA × 9.5\nCheck your marksheet for the programme and regulation.',
      },
      {
        q: 'Is 8.0 CGPA = 80% at BAMU?',
        a: 'Only for B.E./B.Tech NEP-2020. For non-engineering/pre-NEP: 8.0 CGPA = 76% (×9.5). Verify your programme and batch.',
      },
      {
        q: 'Is BAMU same as DBATU?',
        a: 'No. BAMU (Dr. Babasaheb Ambedkar Marathwada University, Chhatrapati Sambhajinagar) is a general state university. DBATU (Dr. Babasaheb Ambedkar Technological University, Lonere) is a separate technological university using (CGPA − 0.5) × 10. Different institutions, different formulas.',
      },
    ],
  },
  {
    key: 'csjmu',
    name: 'Chhatrapati Shahu Ji Maharaj University',
    short: 'CSJMU',
    slug: 'csjmu-cgpa-to-percentage',
    state: 'Uttar Pradesh',
    formulaText: 'Percentage = CGPA × 10',
    formulaLabel: 'CGPA × 10',
    inverseLabel: 'CGPA = Percentage ÷ 10',
    source: 'CSJMU Ordinance No. 7 (Grading System), Clause 8: "The conversion formula for CGPA to Percentage marks is as follows: CGPA × 10 = Absolute Percentage" (B.Tech UIET, effective 2024-25)',
    sourceUrl: 'https://csjmu.ac.in/',
    note: 'CSJMU Kanpur uses Percentage = CGPA × 10 per Ordinance No. 7, Clause 8 (B.Tech UIET, effective 2024-25). CGPA 8.0 = 80%, CGPA 7.5 = 75%, CGPA 6.5 = 65%. First Division with Distinction at CGPA ≥ 7.5, First Division at CGPA ≥ 6.5. Do NOT confuse with AKTU (parent university for many colleges) which uses (CGPA − 0.75) × 10. CSJMU is a separate state university with its own ordinance.',
    exampleCgpa: 8.0,
    forward: (c) => c * 10,
    inverse: (p) => p / 10,
    classes: [
      { label: 'First Division with Distinction', cgpa: '≥ 7.5 (75%+)' },
      { label: 'First Division', cgpa: '≥ 6.5 (65%+)' },
      { label: 'Second Division', cgpa: '≥ 5.0 (50%+)' },
      { label: 'Pass', cgpa: '≥ 5.0 CGPA' },
    ],
    faqs: [
      {
        q: 'What is the official CSJMU Kanpur CGPA to percentage formula?',
        a: 'Per CSJMU Ordinance No. 7, Clause 8 (B.Tech UIET, effective 2024-25), Percentage = CGPA × 10. So 8.0 CGPA = 80%, 7.5 CGPA = 75%, 6.5 CGPA = 65%.',
      },
      {
        q: 'Is CSJMU formula same as AKTU?',
        a: 'No. AKTU uses (CGPA − 0.75) × 10. CSJMU uses CGPA × 10. At 8.0 CGPA: CSJMU = 80%, AKTU = 72.5%. CSJMU is a separate state university (formerly Kanpur University) with its own ordinance.',
      },
      {
        q: 'What CGPA is First Division at CSJMU?',
        a: 'CGPA ≥ 6.5 (65%+) for First Division. Distinction at CGPA ≥ 7.5 (75%+).',
      },
    ],
  },
];

export function getUniversity(key: string): University | undefined {
  return universities.find((u) => u.key === key);
}

const keys = universities.map((u) => u.key);
const duplicates = keys.filter((k, i) => keys.indexOf(k) !== i);
if (duplicates.length > 0) {
  throw new Error(`Duplicate university keys: ${duplicates.join(', ')}`);
}
