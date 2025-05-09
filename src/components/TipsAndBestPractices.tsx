import React from 'react';
import { calculateReturnRate } from '../utils/investmentUtils';
import { Button } from '../components/ui/button';
import { useNavigate } from 'react-router-dom';

interface TipsAndBestPracticesProps {
  totalInvestment: number;
  totalRecycled: number;
}

const investmentThresholds = [50, 300, 600, 1000, 3000];

const TipsAndBestPractices: React.FC<TipsAndBestPracticesProps> = ({ totalInvestment, totalRecycled }) => {
  const navigate = useNavigate();
  const currentRate = calculateReturnRate(totalInvestment);

  // Find next threshold above current investment
  const nextThreshold = investmentThresholds.find(threshold => threshold > totalInvestment);

  // Calculate potential rate at next threshold
  const nextRate = nextThreshold ? calculateReturnRate(nextThreshold) : null;

  // Environmental impact threshold for suggestion
  const recycledThreshold = 100; // kg

  const handleButtonClick = () => {
    if (totalInvestment >= 50) {
      navigate('/investments');
    } else {
      navigate('/manage-funds');
    }
  };

  return (
    <div className="p-4 bg-white rounded-lg shadow-sm border border-slate-100">
      <h2 className="text-lg font-semibold mb-3">Tips & Best Practices</h2>
      <ul className="list-disc list-inside space-y-2 text-sm text-gray-700">
        {nextThreshold && nextRate && nextRate > currentRate && (
          <li>
            Consider increasing your investment to at least <strong>${nextThreshold}</strong> to earn a higher return rate of <strong>{nextRate}%</strong> instead of your current <strong>{currentRate}%</strong>.
          </li>
        )}
        {totalRecycled < recycledThreshold && (
          <li>
            Your environmental impact is currently low ({totalRecycled.toFixed(0)} kg recycled). Increasing your investment can help boost your positive impact.
          </li>
        )}
        <li>
          Diversify your investments across multiple cycles to balance risk and maximize returns.
        </li>
        <li>
          Regularly review your investment portfolio and adjust based on market trends and personal goals.
        </li>
        <li>
          Stay engaged with community initiatives to learn new ways to improve your recycling habits.
        </li>
      </ul>
      {nextThreshold && (
        <div className="mt-4">
          <Button className="bg-investment-green hover:bg-green-600" onClick={handleButtonClick}>
            {totalInvestment >= 50 ? 'View Investments' : 'Manage Funds'}
          </Button>
        </div>
      )}
    </div>
  );
};

export default TipsAndBestPractices;
