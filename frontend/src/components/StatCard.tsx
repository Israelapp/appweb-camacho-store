
interface StatCardProps {
  label: string;
  value: number | string;
  color: string;
}

export default function StatCard({ label, value, color }: StatCardProps) {
  return (
    <div className={`rounded-xl p-4 ${color}`}>
      <p className="text-sm font-medium opacity-80">{label}</p>
      <p className="text-2xl font-bold">{value}</p>
    </div>
  );
}