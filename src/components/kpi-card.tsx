type KpiCardProps = {
  label: string;
  value: string | number;
};

export function KpiCard({ label, value }: KpiCardProps) {
  return (
    <div className="bg-gray-700/30 p-4 rounded-lg text-white shadow-md">
      <div className="text-sm text-gray-400">{label}</div>
      <div className="text-2xl font-bold">{value}</div>
    </div>
  );
}
