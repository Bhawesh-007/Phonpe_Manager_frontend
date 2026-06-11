import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { BarChart3 } from 'lucide-react';

export default function CategoryBarChart({ data }) {
  return (
    <div className="overview-card">
      <h3 className="section-title">
        <BarChart3 className="w-5 h-5" style={{ color: '#6366f1' }} /> 
        <span>Spend by category</span>
      </h3>
      <div className="chart-container" style={{ height: '260px' }}>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ top: 5, right: 10, left: -15, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(255, 255, 255, 0.05)" />
            <XAxis 
              dataKey="name" 
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
              cursor={{ fill: 'rgba(255, 255, 255, 0.02)' }}
              formatter={(value) => [`₹${value}`, 'Spent']}
            />
            <Bar dataKey="amount" radius={[6, 6, 0, 0]} barSize={40}>
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.fill || '#185fa5'} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}