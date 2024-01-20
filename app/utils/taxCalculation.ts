type DepreciationSchedule = number[];

export function calculateFederalDepreciation(
  taxRate: number,
  cashFlowPerc: number = 0.99,
  depreciationSchedule: DepreciationSchedule = [
    0.68, 0.128, 0.0768, 0.04608, 0.04608,
  ],
  cost: number = 2041.109,
  itcRate: number = 0.3
): number[] {
  const depreciationBase = cost * (1.0 - itcRate / 2.0);
  const output: number[] = [];

  for (const dep of depreciationSchedule) {
    const taxShield = depreciationBase * dep * taxRate * cashFlowPerc;
    output.push(taxShield);
  }

  return output;
}

export function calculateStateDepreciation(
  taxRate: number,
  cashFlowPerc: number = 0.99,
  depreciationSchedule: DepreciationSchedule = [
    0.2, 0.32, 0.192, 0.1152, 0.1152,
  ],
  cost: number = 2041.109
): number[] {
  const output: number[] = [];

  for (const dep of depreciationSchedule) {
    const taxShield = cost * dep * taxRate * cashFlowPerc;
    output.push(taxShield);
  }

  return output;
}
