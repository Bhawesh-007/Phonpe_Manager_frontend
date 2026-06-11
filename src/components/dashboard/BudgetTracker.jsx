import { Target } from 'lucide-react';

export default function BudgetTracker({ data }) {
  return (
    <div className="overview-card">
      <h3 className="section-title">
        <Target className="w-5 h-5" style={{ color: '#ec4899' }} /> 
        <span>Budget tracker</span>
      </h3>
      <div className="budget-list">
        {data.map((item, idx) => {
          const percentage = Math.min((item.spent / item.limit) * 100, 100);
          const isOver = item.spent > item.limit;
          const statusColor = isOver ? 'red' : percentage > 75 ? 'orange' : 'green';
          
          return (
            <div key={idx} className="budget-item">
              <div className="budget-item-header">
                <span className="budget-category-name">{item.category}</span>
                <span className={`budget-stats ${isOver ? 'over' : ''}`}>
                  ₹{item.spent.toLocaleString()} / ₹{item.limit.toLocaleString()} {isOver && '🚨'}
                </span>
              </div>
              <div className="progress-track">
                <div 
                  className={`progress-fill ${statusColor}`} 
                  style={{ width: `${percentage}%` }}
                ></div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}