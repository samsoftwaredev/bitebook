// foodScore.ts
// Build-ready TypeScript implementation for Food scoring (0–100)

export type Category = 'food' | 'beverage' | 'cheese' | 'fat_spread';

export type NutritionPer100 = {
  energyKJ: number; // per 100 g / mL
  sugarsG: number;
  satFatG: number;
  sodiumMG: number;
  fiberG?: number; // optional (missing -> 0 pts)
  proteinG?: number; // optional (missing -> 0 pts)
  fvnlPercent?: number; // fruit/veg/nuts/legumes %
};

export type Additive = {
  code: string; // e.g., "E250"
  hazard: 0 | 1 | 2 | 3; // 0 none, 3 high
  evidence: 0.5 | 0.75 | 1.0; // limited/moderate/strong
  exposure?: number; // 0.5..1.0 (default 0.7)
  label?: string; // optional friendly name
};

export type FoodScoreInput = {
  category: Category;
  nutrition: NutritionPer100;
  additives?: Additive[];
  isCertifiedOrganic?: boolean;
};

export type ReasonChip = {
  kind: 'positive' | 'negative';
  label: string; // e.g., "High sugar (22 g/100 g)"
  delta: number; // signed contribution to the final 0–100 score (after weights)
};

export type FoodScoreResult = {
  score: number; // 0..100
  color: 'dark-green' | 'green' | 'yellow' | 'orange' | 'red';
  subscores: {
    nutrition: number; // 0..60
    additives: number; // 0..30
    organic: number; // 0..10
  };
  internals: {
    nsRaw: number; // -15..40-ish depending
    nsNorm: number; // 0..100
    additivesNorm: number; // 0..100
  };
  reasons: ReasonChip[];
};

/* ------------------------- helpers ------------------------- */

const clamp = (v: number, lo: number, hi: number) =>
  Math.min(hi, Math.max(lo, v));

/** Linear map Nutri-Score raw (-15..40) to 0..100 where lower raw is better. */
export const normalizeNutriScore = (nsRaw: number) => {
  const NS_MIN = -15;
  const NS_MAX = 40;
  const ns = clamp(nsRaw, NS_MIN, NS_MAX);
  return (100 * (NS_MAX - ns)) / (NS_MAX - NS_MIN);
};

/* ---------------------- Nutri-Score points ---------------------- */
/**
 * Tables implemented in line with public Nutri-Score point grids.
 * We keep it pragmatic (production-ready) but concise.
 * If a field is missing (fiber, protein, fvnl%), its positive points are 0.
 */

type Step = { ltEq: number; pts: number };
const mkStepper = (steps: Step[]) => (x: number) => {
  for (const s of steps) if (x <= s.ltEq) return s.pts;
  return steps[steps.length - 1].pts;
};

// NEGATIVE points (higher = worse)
const energyPtsFood = mkStepper([
  { ltEq: 335, pts: 0 },
  { ltEq: 670, pts: 1 },
  { ltEq: 1005, pts: 2 },
  { ltEq: 1340, pts: 3 },
  { ltEq: 1675, pts: 4 },
  { ltEq: 2010, pts: 5 },
  { ltEq: 2345, pts: 6 },
  { ltEq: 2680, pts: 7 },
  { ltEq: 3015, pts: 8 },
  { ltEq: 3350, pts: 9 },
  { ltEq: Infinity, pts: 10 },
]);
const sugarsPtsFood = mkStepper([
  { ltEq: 4.5, pts: 0 },
  { ltEq: 9, pts: 1 },
  { ltEq: 13.5, pts: 2 },
  { ltEq: 18, pts: 3 },
  { ltEq: 22.5, pts: 4 },
  { ltEq: 27, pts: 5 },
  { ltEq: 31, pts: 6 },
  { ltEq: 36, pts: 7 },
  { ltEq: 40, pts: 8 },
  { ltEq: 45, pts: 9 },
  { ltEq: Infinity, pts: 10 },
]);
const satFatPtsFood = mkStepper([
  { ltEq: 1, pts: 0 },
  { ltEq: 2, pts: 1 },
  { ltEq: 3, pts: 2 },
  { ltEq: 4, pts: 3 },
  { ltEq: 5, pts: 4 },
  { ltEq: 6, pts: 5 },
  { ltEq: 7, pts: 6 },
  { ltEq: 8, pts: 7 },
  { ltEq: 9, pts: 8 },
  { ltEq: 10, pts: 9 },
  { ltEq: Infinity, pts: 10 },
]);
const sodiumPtsFood = mkStepper([
  { ltEq: 90, pts: 0 },
  { ltEq: 180, pts: 1 },
  { ltEq: 270, pts: 2 },
  { ltEq: 360, pts: 3 },
  { ltEq: 450, pts: 4 },
  { ltEq: 540, pts: 5 },
  { ltEq: 630, pts: 6 },
  { ltEq: 720, pts: 7 },
  { ltEq: 810, pts: 8 },
  { ltEq: 900, pts: 9 },
  { ltEq: Infinity, pts: 10 },
]);

// POSITIVE points (higher = better)
const fvnlPts = mkStepper([
  { ltEq: 40, pts: 0 },
  { ltEq: 60, pts: 1 },
  { ltEq: 80, pts: 2 },
  { ltEq: Infinity, pts: 5 },
]); // note: Nutri-Score has special handling for >80%, simplified here to award 5.

const fiberPts = mkStepper([
  { ltEq: 0.9, pts: 0 },
  { ltEq: 1.9, pts: 1 },
  { ltEq: 2.8, pts: 2 },
  { ltEq: 3.7, pts: 3 },
  { ltEq: 4.7, pts: 4 },
  { ltEq: Infinity, pts: 5 },
]);

const proteinPts = mkStepper([
  { ltEq: 1.6, pts: 0 },
  { ltEq: 3.2, pts: 1 },
  { ltEq: 4.8, pts: 2 },
  { ltEq: 6.4, pts: 3 },
  { ltEq: 8.0, pts: 4 },
  { ltEq: Infinity, pts: 5 },
]);

// Beverage-specific negative sugar/energy tables (simplified)
const energyPtsDrink = mkStepper([
  { ltEq: 0, pts: 0 },
  { ltEq: 30, pts: 1 },
  { ltEq: 60, pts: 2 },
  { ltEq: 90, pts: 3 },
  { ltEq: 120, pts: 4 },
  { ltEq: 150, pts: 5 },
  { ltEq: 180, pts: 6 },
  { ltEq: 210, pts: 7 },
  { ltEq: 240, pts: 8 },
  { ltEq: 270, pts: 9 },
  { ltEq: Infinity, pts: 10 },
]);
const sugarsPtsDrink = mkStepper([
  { ltEq: 0, pts: 0 },
  { ltEq: 1.5, pts: 1 },
  { ltEq: 3, pts: 2 },
  { ltEq: 4.5, pts: 3 },
  { ltEq: 6, pts: 4 },
  { ltEq: 7.5, pts: 5 },
  { ltEq: 9, pts: 6 },
  { ltEq: 10.5, pts: 7 },
  { ltEq: 12, pts: 8 },
  { ltEq: 13.5, pts: 9 },
  { ltEq: Infinity, pts: 10 },
]);

/**
 * Compute Nutri-Score A (negative) and C (positive) points and raw total.
 * Applies simple category tweaks for beverages.
 * Cheese/fat_spread nuanced rules are omitted here for brevity; you can plug in later if needed.
 */
export function computeNutriScoreRaw(category: Category, n: NutritionPer100) {
  const negEnergy =
    category === 'beverage'
      ? energyPtsDrink(n.energyKJ)
      : energyPtsFood(n.energyKJ);
  const negSugars =
    category === 'beverage'
      ? sugarsPtsDrink(n.sugarsG)
      : sugarsPtsFood(n.sugarsG);
  const negSat = satFatPtsFood(n.satFatG);
  const negSodium = sodiumPtsFood(n.sodiumMG);

  const A_total = clamp(negEnergy + negSugars + negSat + negSodium, 0, 40);

  const posFvnl = n.fvnlPercent != null ? fvnlPts(n.fvnlPercent) : 0;
  const posFiber = n.fiberG != null ? fiberPts(n.fiberG) : 0;
  const posProtein = n.proteinG != null ? proteinPts(n.proteinG) : 0;

  // Real Nutri-Score has a nuance: if A_total >= 11 and not cheese, protein points may be limited.
  // We keep it straightforward: sum all positives.
  const C_total = clamp(posFvnl + posFiber + posProtein, 0, 15);

  const NS = A_total - C_total;
  return {
    A_total,
    C_total,
    NS,
    detail: {
      negEnergy,
      negSugars,
      negSat,
      negSodium,
      posFvnl,
      posFiber,
      posProtein,
    },
  };
}

/* ---------------------- Subscores ---------------------- */

export function computeNutritionSubscore(
  category: Category,
  n: NutritionPer100,
) {
  const { NS, detail, A_total, C_total } = computeNutriScoreRaw(category, n);
  const nsNorm = normalizeNutriScore(NS);
  const nutritionSub = 0.6 * nsNorm;
  return { nsNorm, nutritionSub, nsRaw: NS, detail, A_total, C_total };
}

export function computeAdditivesSubscore(additives: Additive[] | undefined) {
  const list = additives ?? [];
  const P_cap = 4.0;

  let P_total = 0;
  const perItem: {
    code: string;
    label: string;
    penalty: number;
    hazard: number;
    evidence: number;
    exposure: number;
  }[] = [];

  for (const a of list) {
    const H = a.hazard / 3; // 0..1
    const E = a.evidence; // 0.5/0.75/1.0
    const X = clamp(a.exposure ?? 0.7, 0.5, 1.0);
    const P_i = H * E * X; // ≤ 1
    P_total += P_i;
    perItem.push({
      code: a.code,
      label: a.label ?? a.code,
      penalty: P_i,
      hazard: a.hazard,
      evidence: a.evidence,
      exposure: X,
    });
  }

  const P_norm = clamp(P_total / P_cap, 0, 1);
  const additivesNorm = 100 * (1 - P_norm);
  const additivesSub = 0.3 * additivesNorm;

  return { additivesNorm, additivesSub, perItem, P_total, P_norm };
}

export function computeOrganicSubscore(
  isCertifiedOrganic: boolean | undefined,
) {
  const organicNorm = isCertifiedOrganic ? 100 : 0;
  const organicSub = 0.1 * organicNorm;
  return { organicNorm, organicSub };
}

/* ---------------------- Overall score & reasons ---------------------- */

export function colorForScore(score: number): FoodScoreResult['color'] {
  if (score >= 80) return 'dark-green';
  if (score >= 65) return 'green';
  if (score >= 50) return 'yellow';
  if (score >= 25) return 'orange';
  return 'red';
}

export function buildReasonChips(
  input: FoodScoreInput,
  parts: {
    nutrition: ReturnType<typeof computeNutritionSubscore>;
    additives: ReturnType<typeof computeAdditivesSubscore>;
    organic: ReturnType<typeof computeOrganicSubscore>;
  },
): ReasonChip[] {
  const chips: ReasonChip[] = [];

  // Nutrition contributors (negative points -> negative chips; positive points -> positive chips)
  const d = parts.nutrition.detail;
  // Negative drivers
  const mkNeg = (label: string, pts: number) => {
    if (pts > 0) {
      // translate Nutri-Score negatives into a rough delta on final weighted score.
      // Heuristic: each raw negative point ~ (60 / 55) ≈ 1.09 points off nsNorm weight
      const perRaw = 60 / 55;
      chips.push({ kind: 'negative', label, delta: -Math.round(perRaw * pts) });
    }
  };
  mkNeg(`High energy (${input.nutrition.energyKJ} kJ/100)`, d.negEnergy);
  mkNeg(`High sugars (${input.nutrition.sugarsG} g/100)`, d.negSugars);
  mkNeg(`High sat fat (${input.nutrition.satFatG} g/100)`, d.negSat);
  mkNeg(`High sodium (${input.nutrition.sodiumMG} mg/100)`, d.negSodium);

  // Positive drivers
  const mkPos = (label: string, pts: number) => {
    if (pts > 0) {
      const perRaw = 60 / 55;
      chips.push({ kind: 'positive', label, delta: Math.round(perRaw * pts) });
    }
  };
  if (input.nutrition.fvnlPercent != null)
    mkPos(`High F/V/N/L (${input.nutrition.fvnlPercent}%)`, d.posFvnl);
  if (input.nutrition.fiberG != null)
    mkPos(`Fiber (${input.nutrition.fiberG} g/100)`, d.posFiber);
  if (input.nutrition.proteinG != null)
    mkPos(`Protein (${input.nutrition.proteinG} g/100)`, d.posProtein);

  // Additives
  for (const ai of parts.additives.perItem) {
    if (ai.penalty > 0) {
      // Convert penalty share into weighted delta (30 * share_of_cap)
      const delta = -Math.round(30 * (ai.penalty / 4.0));
      chips.push({
        kind: 'negative',
        label: `Contains ${ai.label} (${ai.code}) – concern`,
        delta,
      });
    }
  }

  // Organic
  if (input.isCertifiedOrganic) {
    chips.push({ kind: 'positive', label: 'Certified organic', delta: +10 });
  }

  // Sort by absolute impact (desc), keep top 6 for UX
  chips.sort((a, b) => Math.abs(b.delta) - Math.abs(a.delta));
  return chips.slice(0, 6);
}

export function scoreFood(input: FoodScoreInput): FoodScoreResult {
  const nutrition = computeNutritionSubscore(input.category, input.nutrition);
  const additives = computeAdditivesSubscore(input.additives);
  const organic = computeOrganicSubscore(input.isCertifiedOrganic ?? false);

  const scoreFloat =
    nutrition.nutritionSub + additives.additivesSub + organic.organicSub;
  const score = Math.round(scoreFloat);
  const color = colorForScore(score);

  const reasons = buildReasonChips(input, { nutrition, additives, organic });

  return {
    score,
    color,
    subscores: {
      nutrition: Math.round(nutrition.nutritionSub),
      additives: Math.round(additives.additivesSub),
      organic: Math.round(organic.organicSub),
    },
    internals: {
      nsRaw: nutrition.nsRaw,
      nsNorm: Math.round(nutrition.nsNorm),
      additivesNorm: Math.round(additives.additivesNorm),
    },
    reasons,
  };
}
