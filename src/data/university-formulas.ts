import { universities } from './universities';

export interface SerializedUniversity {
  key: string;
  name: string;
  short: string;
  formulaText: string;
  formulaLabel: string;
  inverseLabel: string;
  source: string;
  sourceUrl?: string;
  note?: string;
  exampleCgpa: number;
}

export function serializeUniversities(): SerializedUniversity[] {
  return universities.map((u) => ({
    key: u.key,
    name: u.name,
    short: u.short,
    formulaText: u.formulaText,
    formulaLabel: u.formulaLabel,
    inverseLabel: u.inverseLabel,
    source: u.source,
    sourceUrl: u.sourceUrl,
    note: u.note,
    exampleCgpa: u.exampleCgpa,
  }));
}

export function getUniversityFormulas(): Record<string, {
  label: string;
  forward: (c: number) => number;
  inverse: (p: number) => number;
  formula: (c: number) => string;
  note: string;
}> {
  const result: Record<string, any> = {};
  
  for (const u of universities) {
    result[u.key] = {
      label: u.short,
      forward: u.forward,
      inverse: u.inverse,
      formula: (c: number) => {
        if (u.key === 'sppu') {
          if (c >= 9.5) return `20 × ${c} − 100`;
          if (c >= 8.25) return `12 × ${c} − 25`;
          if (c >= 6.75) return `10 × ${c} − 7.5`;
          if (c >= 5.75) return `5 × ${c} + 26.25`;
          if (c >= 5.25) return `10 × ${c} − 2.5`;
          if (c >= 4.75) return `10 × ${c} − 2.5`;
          if (c >= 4.0) return `6.6 × ${c} + 13.6`;
          return '0';
        }
        if (u.key === 'mumbai') {
          return `(7.1 × ${c}) + 11`;
        }
        if (u.key === 'aktu') {
          return `(${c} − 0.75) × 10`;
        }
        if (u.key === 'gtu') {
          return `(${c} − 0.5) × 10`;
        }
        if (u.key === 'vtu') {
          return `${c} × 10`;
        }
        if (u.key === 'anna') {
          return `${c} × 10`;
        }
        if (u.key === 'ktu') {
          return `${c} × 10`;
        }
        if (u.key === 'du') {
          return `${c} × 9.5`;
        }
        return `${c} × 9.5`;
      },
      note: u.note || '',
    };
  }
  
  // Add generic scales
  result.cbse = {
    label: 'CBSE',
    forward: (c) => Math.min(c * 9.5, 100),
    inverse: (p) => p / 9.5,
    formula: (c) => `${c} × 9.5`,
    note: 'CBSE / Generic 10-pt scale',
  };
  result.scale5 = {
    label: '5-pt',
    forward: (c) => Math.min((c / 5) * 100, 100),
    inverse: (p) => (p / 100) * 5,
    formula: (c) => `(${c} ÷ 5) × 100`,
    note: 'Generic 5-point scale',
  };
  result.scale4 = {
    label: '4-pt',
    forward: (c) => Math.min((c / 4) * 100, 100),
    inverse: (p) => (p / 100) * 4,
    formula: (c) => `(${c} ÷ 4) × 100`,
    note: 'Generic 4-point scale',
  };
  
  return result;
}

export function getUniversitySelectOptions(): { value: string; label: string }[] {
  const options = [
    { value: 'cbse', label: 'CBSE / Generic (×9.5)' },
  ];
  
  for (const u of universities) {
    if (u.key === 'vtu') {
      options.push({ value: 'vtu', label: 'VTU – 2022/2021 Scheme (×10)' });
      options.push({ value: 'vtu-old', label: 'VTU – 2015/17/18 Schemes ((CGPA−0.75)×10)' });
    } else if (u.key === 'mumbai') {
      options.push({ value: 'mumbai', label: 'Mumbai University — Pre-2026 ((7.1×CGPA)+11)' });
    } else {
      options.push({ value: u.key, label: `${u.short} — ${u.formulaLabel}` });
    }
  }
  
  options.push({ value: 'scale5', label: '5-Point Scale (÷5 ×100)' });
  options.push({ value: 'scale4', label: '4-Point Scale (÷4 ×100)' });
  
  return options;
}

export function getQuickToggleUniversities(): Array<{
  key: string;
  code: string;
  name: string;
  formula: string;
  multiplier: string | number;
  forward: (c: number) => number;
  inverse: (p: number) => number;
}> {
  const quickKeys = ['cbse', 'sppu', 'vtu', 'gtu', 'aktu', 'anna'];
  const formulas = getUniversityFormulas();
  
  return quickKeys.map((key) => {
    const u = universities.find((x) => x.key === key);
    const f = formulas[key];
    return {
      key,
      code: u?.short || key.toUpperCase(),
      name: u?.name || key,
      formula: f.formula(8), // example with 8.0
      multiplier: key === 'sppu' ? 'piecewise' : (u?.forward(1) - u?.forward(0) || 9.5),
      forward: f.forward,
      inverse: f.inverse,
    };
  });
}