// import { describe, expect, it } from 'vitest';

// import {
//   type FoodScoreInput,
//   colorForScore,
//   computeAdditivesSubscore,
//   computeNutriScoreRaw,
//   normalizeNutriScore,
//   scoreFood,
// } from './foodScore';

// describe('Nutri-Score raw & normalization', () => {
//   it('maps lower NS raw to higher normalized score', () => {
//     const low = normalizeNutriScore(-15); // best possible
//     const mid = normalizeNutriScore(10);
//     const high = normalizeNutriScore(40); // worst possible
//     expect(low).toBeCloseTo(100);
//     expect(mid).toBeGreaterThan(high);
//     expect(high).toBeCloseTo(0);
//   });

//   it('computes plausible A/C points for a sugary food', () => {
//     const { A_total, C_total, NS } = computeNutriScoreRaw('food', {
//       energyKJ: 1600,
//       sugarsG: 25,
//       satFatG: 3.5,
//       sodiumMG: 300,
//       fiberG: 2.5,
//       proteinG: 6.8,
//       fvnlPercent: 10,
//     });
//     expect(A_total).toBeGreaterThan(0);
//     expect(C_total).toBeGreaterThanOrEqual(0);
//     expect(NS).toBe(A_total - C_total);
//   });

//   it('uses beverage tables for drinks', () => {
//     const drink = computeNutriScoreRaw('beverage', {
//       energyKJ: 180, // ~ moderate for beverages
//       sugarsG: 9, // high for beverages
//       satFatG: 0,
//       sodiumMG: 20,
//       fvnlPercent: 0,
//     });
//     expect(drink.A_total).toBeGreaterThan(0);
//   });
// });

// describe('Additives subscore', () => {
//   it('is 100 (full) when there are no additives', () => {
//     const { additivesNorm, additivesSub } = computeAdditivesSubscore([]);
//     expect(additivesNorm).toBe(100);
//     expect(additivesSub).toBeCloseTo(30);
//   });

//   it('penalizes high-risk additives proportionally', () => {
//     const { additivesNorm } = computeAdditivesSubscore([
//       { code: 'E250', hazard: 3, evidence: 1.0, exposure: 1.0 },
//     ]);
//     expect(additivesNorm).toBeLessThan(100);
//   });
// });

// describe('Overall food scoring', () => {
//   const base: FoodScoreInput = {
//     category: 'food',
//     nutrition: {
//       energyKJ: 1500,
//       sugarsG: 22,
//       satFatG: 2.5,
//       sodiumMG: 250,
//       fiberG: 5.0,
//       proteinG: 8.2,
//       fvnlPercent: 45,
//     },
//     additives: [
//       {
//         code: 'E322',
//         hazard: 1,
//         evidence: 0.75,
//         exposure: 0.7,
//         label: 'Lecithin',
//       },
//       {
//         code: 'E202',
//         hazard: 2,
//         evidence: 0.75,
//         exposure: 0.8,
//         label: 'Potassium sorbate',
//       },
//     ],
//     isCertifiedOrganic: true,
//   };

//   it('returns a 0..100 score with all subscores', () => {
//     const res = scoreFood(base);
//     expect(res.score).toBeGreaterThanOrEqual(0);
//     expect(res.score).toBeLessThanOrEqual(100);
//     expect(res.subscores.nutrition).toBeGreaterThanOrEqual(0);
//     expect(res.subscores.additives).toBeGreaterThanOrEqual(0);
//     expect(res.subscores.organic).toBe(10);
//     expect(['dark-green', 'green', 'yellow', 'orange', 'red']).toContain(
//       res.color,
//     );
//     expect(res.reasons.length).toBeGreaterThan(0);
//   });

//   it('organic bonus affects color around thresholds', () => {
//     const noOrg = scoreFood({ ...base, isCertifiedOrganic: false });
//     const yesOrg = scoreFood({ ...base, isCertifiedOrganic: true });
//     // organic adds up to +10 (weighted)
//     expect(yesOrg.score).toBeGreaterThanOrEqual(noOrg.score);
//   });

//   it('harsh additives can pull down the score', () => {
//     const harsher = scoreFood({
//       ...base,
//       additives: [
//         {
//           code: 'E250',
//           hazard: 3,
//           evidence: 1.0,
//           exposure: 1.0,
//           label: 'Sodium nitrite',
//         },
//         {
//           code: 'E220',
//           hazard: 2,
//           evidence: 1.0,
//           exposure: 1.0,
//           label: 'Sulfur dioxide',
//         },
//       ],
//     });
//     const lighter = scoreFood({ ...base, additives: [] });
//     expect(harsher.score).toBeLessThan(lighter.score);
//   });
// });

// describe('Color bands', () => {
//   it('assigns expected color bands', () => {
//     expect(colorForScore(85)).toBe('dark-green');
//     expect(colorForScore(70)).toBe('green');
//     expect(colorForScore(55)).toBe('yellow');
//     expect(colorForScore(35)).toBe('orange');
//     expect(colorForScore(10)).toBe('red');
//   });
// });
