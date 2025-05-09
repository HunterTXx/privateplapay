import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { calculateReturnRate } from "@/utils/investmentUtils";

const CO2_EMISSIONS_FACTOR = 2.5; // kg CO2 saved per kg plastic recycled
const PLASTIC_PER_DOLLAR = 1; // kg plastic recycled per $1 invested (mid-range estimate)

const Calculator = () => {
  const [amount, setAmount] = useState<string>("1000");
  const [cycles, setCycles] = useState<string>("10");

  const minAmount = 50;
  const amountNum = Number(amount);
  const cyclesNum = Number(cycles);

  const isAmountValid = amountNum >= minAmount;
  const safeCycles = cyclesNum > 0 ? cyclesNum : 0;

  const ratePer2Cycles = calculateReturnRate(amountNum || 0);
  const ratePerCycle = ratePer2Cycles / 2;

  const months = Math.ceil(safeCycles / 2);

  const calculateTotalProfit = () => {
    if (!isAmountValid) {
      return { initialAmount: 0, totalProfit: 0, totalReturn: 0 };
    }
    const initialAmount = amountNum || 0;
    const totalProfit = initialAmount * (ratePerCycle / 100) * safeCycles;
    const totalReturn = initialAmount + totalProfit;
    return {
      initialAmount,
      totalProfit,
      totalReturn
    };
  };

  const result = calculateTotalProfit();

  // Calculate Environmental Impact
  const recycledPlastic = isAmountValid ? amountNum * PLASTIC_PER_DOLLAR : 0;
  const co2Reduction = recycledPlastic * CO2_EMISSIONS_FACTOR;

  return (
    <div className="max-w-4xl mx-auto p-4 md:p-8">
      <h1 className="text-2xl font-bold text-center mb-4 md:mb-6">Investment Calculator</h1>
      <div className="grid gap-6 md:gap-8 grid-cols-1 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Investment Parameters</CardTitle>
            <CardDescription>Adjust the values to calculate your potential returns</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Investment Amount ($)</label>
              <Input
                type="number"
                value={amount}
                min={minAmount}
                onChange={(e) => setAmount(e.target.value)}
                className="w-full"
              />
              {!isAmountValid && (
                <p className="text-xs text-red-600 mt-1">Minimum investment amount is $50</p>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Number of Cycles</label>
              <Input
                type="number"
                value={cycles}
                onChange={(e) => setCycles(e.target.value)}
                className="w-full"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Return Rate</label>
              <p className="text-lg font-bold text-investment-green">{ratePer2Cycles}% per 2 cycles ({ratePerCycle}% per cycle)</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Investment Projection</CardTitle>
            <CardDescription>Based on your input parameters</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="p-4 border rounded-md bg-slate-50">
              <div className="mb-4">
                <p className="text-sm text-slate-500">Initial Investment</p>
                <p className="text-xl font-bold">$ {result.initialAmount.toLocaleString('en-US', {minimumFractionDigits: 2, maximumFractionDigits: 2})}</p>
              </div>
              <div className="mb-4">
                <p className="text-sm text-slate-500">Total Profit after {safeCycles} cycles (~{months} month{months !== 1 ? 's' : ''})</p>
                <p className="text-xl font-bold text-investment-green">$ {result.totalProfit.toLocaleString('en-US', {minimumFractionDigits: 2, maximumFractionDigits: 2})}</p>
              </div>
              <div>
                <p className="text-sm text-slate-500">Total Return</p>
                <p className="text-2xl font-bold text-investment-green">$ {result.totalReturn.toLocaleString('en-US', {minimumFractionDigits: 2, maximumFractionDigits: 2})}</p>
              </div>
            </div>
            <div className="mt-6 p-4 border rounded-md bg-green-50">
              <h3 className="text-lg font-semibold text-green-800 mb-2">Environmental Impact</h3>
              <p className="text-sm text-green-700">
                This investment will recycle approximately <strong>{recycledPlastic.toFixed(0)}</strong> kg of plastic waste,
                reducing CO₂ emissions by <strong>{co2Reduction.toFixed(1)}</strong> kg.
              </p>
            </div>
          </CardContent>
          <CardFooter>
            <Button className="w-full bg-investment-green hover:bg-green-600" disabled={!isAmountValid}>
              Invest Now
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default Calculator;
