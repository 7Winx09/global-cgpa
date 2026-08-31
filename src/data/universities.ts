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
      if (p >= 40) return (p + 2.5) / 10;
      if (p >= 26.4) return (p - 13.6) / 6.6;
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
    note: 'IMPORTANT: Effective 1 January 2026, Mumbai University repealed all formula-based CGPA-to-percentage conversion via Circular No. Exam/Result/803 of 2026. The pre-2026 formulas below apply ONLY to transcripts dated on or before 31 December 2025. For transcripts dated 1 January 2026 or later, the university no longer uses a formula — the affiliated college computes the percentage from actual raw marks across all semesters, and issues a conversion certificate only on student request.',
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
