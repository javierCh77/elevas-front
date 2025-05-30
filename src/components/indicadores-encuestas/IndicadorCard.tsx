
// components/indicadores-encuestas/IndicadorCard.tsx
interface IndicadorCardProps {
  title: string;
  value: number | string;
  description?: string;
}

export default function IndicadorCard({ title, value, description }: IndicadorCardProps) {
  return (
    <div className="rounded-2xl shadow-md p-4 bg-[#F8F8EE] border border-[#DEDFA9] w-full">
      <h3 className="text-md font-semibold text-[#786530]">{title}</h3>
      <p className="text-3xl font-bold text-[#AEA344]">{value}</p>
      {description && <p className="text-sm text-gray-500">{description}</p>}
    </div>
  );
}