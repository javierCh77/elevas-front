import {
  CalendarDays,
  TrendingUp,
  TrendingDown,
} from "lucide-react";
import type { ReactNode } from "react";

export default function Card({
  title,
  value,
  trend,
  icon,
}: {
  title: string;
  value: string | number;
  trend?: number;
  icon?: ReactNode;
}) {
  const renderTrendBadge = () => {
    if (trend === undefined) return null;

    const isPositive = trend > 0;
    const isNeutral = trend === 0;

    return (
      <span
        className={`ml-2 inline-flex items-center text-xs font-medium px-2 py-0.5 rounded-full ${
          isNeutral
            ? "text-gray-500 bg-gray-100"
            : isPositive
            ? "text-green-600 bg-green-100"
            : "text-red-600 bg-red-100"
        }`}
      >
        {isNeutral ? null : isPositive ? (
          <TrendingUp size={12} className="mr-1" />
        ) : (
          <TrendingDown size={12} className="mr-1" />
        )}
        {isNeutral ? "0%" : `${Math.abs(trend)}%`}
      </span>
    );
  };

  return (
    <div className="bg-white p-4 rounded-xl shadow-lg border border-gray-100 hover:shadow-xl transition-shadow duration-300">
      <div className="flex items-start gap-4">
        <div className="flex flex-col w-full">
          <div className="flex justify-between items-center">
            <p className="text-sm text-gray-500 font-medium">{title}</p>
            {renderTrendBadge()}
          </div>
          <div className="rounded-full flex items-center justify-between">
            {icon ?? (
              <CalendarDays className="text-[#57a8de] w-6 h-6" />
            )}
            <p className="text-2xl font-semibold text-gray-500 mt-1">
              {value}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
