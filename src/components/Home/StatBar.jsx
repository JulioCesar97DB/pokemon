export const StatBar = ({ label, value, color, maxValue = 150 }) => (
  <div className="flex justify-between items-center">
    <span className="text-sm font-medium text-slate-300">{label}:</span>
    <div className="flex items-center gap-2">
      <div className="w-16 bg-slate-600 rounded-full h-2">
        <div
          className={`${color} h-2 rounded-full`}
          style={{
            width: `${Math.min((value / maxValue) * 100, 100)}%`,
          }}
        />
      </div>
      <span className="text-sm font-semibold text-slate-100">{value}</span>
    </div>
  </div>
);
