import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { TrendingUp } from 'lucide-react';

export default function TrendChart({ data }) {
  return (
    <div className="overview-card">
      <h3 className="section-title">
        <TrendingUp className="w-5 h-5" style={{ color: '#a855f7' }} /> 
        <span>Monthly spend — last 6 months</span>
      </h3>
      <div className="chart-container" style={{ height: '260px' }}>
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data} margin={{ top: 5, right: 10, left: -15, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(255, 255, 255, 0.05)" />
            <XAxis 
              dataKey="month" 
              axisLine={false} 
              tickLine={false} 
              tick={{ fontSize: 12, fill: '#94a3b8', fontFamily: 'Outfit' }} 
            />
            <YAxis 
              axisLine={false} 
              tickLine={false} 
              tick={{ fontSize: 12, fill: '#94a3b8', fontFamily: 'Outfit' }} 
              tickFormatter={(val) => `₹${val/1000}k`} 
            />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: '#110c28', 
                borderColor: 'rgba(255, 255, 255, 0.08)',
                borderRadius: '12px',
                color: '#ffffff',
                fontFamily: 'Outfit'
              }} 
              itemStyle={{ color: '#c084fc' }}
              cursor={{ stroke: 'rgba(255, 255, 255, 0.08)', strokeWidth: 1 }}
              formatter={(value, name) => [`₹${value}`, name === 'spend' ? 'Spend' : 'Budget']}
            />
            <Line 
              type="monotone" 
              dataKey="spend" 
              stroke="#a855f7" 
              strokeWidth={3} 
              dot={{ r: 4, fill: '#a855f7', stroke: '#ffffff', strokeWidth: 1.5 }} 
              activeDot={{ r: 6, fill: '#a855f7', stroke: '#ffffff', strokeWidth: 2 }}
            />
            <Line 
              type="step" 
              dataKey="budget" 
              stroke="#10b981" 
              strokeWidth={2} 
              strokeDasharray="5 5" 
              dot={false} 
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}