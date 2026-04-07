import React from 'react';
import { LucideIcon, TrendingUp, TrendingDown, Minus } from 'lucide-react';

interface StatCardProps {
  label: string;
  value: string | number;
  icon: LucideIcon;
  trend?: {
    value: number;
    direction: 'up' | 'down' | 'neutral';
  };
  color: string;
  description?: string;
}

export default function StatCard({ label, value, icon: Icon, trend, color, description }: StatCardProps) {
  const getTrendIcon = () => {
    if (!trend) return null;
    if (trend.direction === 'up') return <TrendingUp className="w-3 h-3 text-emerald-400" />;
    if (trend.direction === 'down') return <TrendingDown className="w-3 h-3 text-red-400" />;
    return <Minus className="w-3 h-3 text-zinc-400" />;
  };

  const getTrendColorClass = () => {
    if (!trend) return '';
    if (trend.direction === 'up') return 'text-emerald-400 bg-emerald-400/10 border-emerald-400/20';
    if (trend.direction === 'down') return 'text-red-400 bg-red-400/10 border-red-400/20';
    return 'text-zinc-400 bg-zinc-400/10 border-zinc-400/20';
  };

  return (
    <div className="group relative p-6 rounded-2xl bg-zinc-900 border border-zinc-800/50 hover:bg-zinc-800/30 transition-all duration-300">
      <div className="flex justify-between items-start mb-4">
        <div className={`p-3 rounded-xl ${color} bg-opacity-10 border border-opacity-20`}>
          <Icon className={`w-5 h-5 ${color.replace('bg-', 'text-')}`} />
        </div>
        {trend && (
          <div className={`flex items-center gap-1.5 px-2 py-1 rounded-lg border text-xs font-semibold ${getTrendColorClass()}`}>
            {getTrendIcon()}
            {trend.value}%
          </div>
        )}
      </div>

      <div>
        <h3 className="text-zinc-400 text-sm font-medium mb-1">{label}</h3>
        <div className="text-2xl font-bold tracking-tight text-white mb-2">{value}</div>
        {description && <p className="text-xs text-zinc-500 leading-relaxed">{description}</p>}
      </div>

      <div className={`absolute bottom-0 left-0 h-1 w-0 group-hover:w-full transition-all duration-500 rounded-b-2xl ${color}`} />
    </div>
  );
}
