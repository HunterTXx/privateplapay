export function calculateReturnRate(amount: number): number {
  console.log('Calculating return rate for amount:', amount);
  
  // Base rate: 8% for smaller investments, scaling up to 12% for larger ones
  let baseRate = 8;
  
  // Adjust for amount (larger investments get better rates)
  if (amount >= 3000) {
    baseRate = 12;
  } else if (amount >= 1000) {
    baseRate = 11;
  } else if (amount >= 600) {
    baseRate = 10;
  } else if (amount >= 300) {
    baseRate = 9;
  } else if (amount >= 50) {
    baseRate = 8;
  }
  
  console.log('Calculated return rate:', baseRate);
  return baseRate;
} 