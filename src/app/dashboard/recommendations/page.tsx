import React from 'react';
import Shell from '@/components/layout/Shell';
import { 
  Sparkles, 
  ArrowUpRight, 
  AlertCircle, 
  Zap, 
  CheckCircle2, 
  ExternalLink,
  Table,
  Filter,
  BarChart3,
  Users
} from 'lucide-react';

const recommendations = [
  { 
    id: 'rec_1', 
    title: 'Update Yoga Mat Landing Page Headline', 
    diagnosis: 'Ad hook "Get 20% Off" is not mentioned above the fold on the current landing page.',
    impact: 'High Traffic Recovery', 
    effort: 'Low (Copy Change)', 
    severity: 'Critical',
    owner: 'Content Team / CRO',
    confidence: 96,
    scoreImpact: '+18 points'
  },
  { 
    id: 'rec_2', 
    title: 'Direct "Eco Block" Keyword to Product Page', 
    diagnosis: 'Google Search ads for "eco block" are currently landing on "All Products" collection page.',
    impact: 'Conversion Boost', 
    effort: 'Low (URL Change)', 
    severity: 'Critical',
    owner: 'Media Buyer',
    confidence: 100,
    scoreImpact: '+32 points'
  },
  { 
    id: 'rec_3', 
    title: 'Implement Social Proof above Product Fold', 
    diagnosis: 'Page has high traffic but low Add-to-Cart. No reviews detected on first screens.',
    impact: 'Cart Initiation Rate', 
    effort: 'Medium (Dev)', 
    severity: 'High',
    owner: 'Shopify Dev',
    confidence: 84,
    scoreImpact: '+12 points'
  },
  { 
    id: 'rec_4', 
    title: 'Clarify Free Shipping Threshold in Checkout', 
    diagnosis: 'Meta Ad promises "Global Free Shipping" but page doesn\'t confirm threshold until payment.',
    impact: 'Checkout Friction', 
    effort: 'Low (Theme Editor)', 
    severity: 'Medium',
    owner: 'Admin',
    confidence: 92,
    scoreImpact: '+5 points'
  },
];

export default function RecommendationsPage() {
  return (
    <Shell>
      <div className="space-y-8">
        <div className="flex justify-between items-end">
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-white mb-2 flex items-center gap-3">
              <Sparkles className="w-8 h-8 text-blue-500" />
              Optimization Plan
            </h1>
            <p className="text-zinc-500 text-sm italic">Prioritized findings for Roas Doctor.</p>
          </div>
          <div className="flex gap-3">
             <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white text-sm font-semibold rounded-xl transition-all shadow-lg shadow-blue-600/25 active:scale-95">
              <Zap className="w-4 h-4 fill-white" />
              Generate New Actions
            </button>
          </div>
        </div>

        {/* Priority Filter */}
        <div className="flex items-center gap-4 py-4 border-b border-zinc-800/50 overflow-x-auto no-scrollbar">
           {['All Actions', 'Critical', 'High Impact', 'Low Effort', 'Copy Fixes', 'Ad Fixes'].map((cat, i) => (
             <button key={i} className={`whitespace-nowrap px-4 py-2 text-xs font-bold rounded-xl border transition-all ${
                i === 0 ? 'bg-blue-600 border-blue-500 text-white shadow-lg shadow-blue-600/20' : 'bg-zinc-900 border-zinc-800 text-zinc-500 hover:text-white'
             }`}>
                {cat}
             </button>
           ))}
        </div>

        {/* Vertical list of prioritized recommendations */}
        <div className="space-y-6">
           {recommendations.map((rec) => (
             <div key={rec.id} className="group p-8 rounded-3xl bg-zinc-900 border border-zinc-800/50 hover:bg-zinc-800/30 transition-all duration-300 grid grid-cols-1 lg:grid-cols-4 gap-12 relative overflow-hidden">
                <div className="lg:col-span-2 space-y-4">
                   <div className="flex items-center gap-3">
                      <span className={`px-2.5 py-1 rounded-md text-[10px] font-black uppercase tracking-widest ${
                         rec.severity === 'Critical' ? 'bg-red-500/10 text-red-500 border border-red-500/20' : 
                         rec.severity === 'High' ? 'bg-amber-500/10 text-amber-500 border border-amber-500/20' : 
                         'bg-blue-500/10 text-blue-500 border border-blue-500/20'
                      }`}>
                         {rec.severity} Severity
                      </span>
                      <div className="w-1 h-3 bg-zinc-800 rounded-full" />
                      <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest leading-none">
                         Effort: {rec.effort}
                      </span>
                   </div>
                   <h2 className="text-xl font-bold tracking-tight text-white group-hover:text-blue-400 transition-colors">{rec.title}</h2>
                   <p className="text-sm text-zinc-400 leading-relaxed font-medium">
                      <span className="text-zinc-600 italic block mb-2 opacity-60 font-bold uppercase tracking-widest text-[9px]">Diagnosis:</span>
                      {rec.diagnosis}
                   </p>
                </div>

                <div className="space-y-4 flex flex-col justify-center border-l border-zinc-800/50 pl-12">
                   <div>
                      <div className="text-[10px] font-bold text-zinc-600 uppercase tracking-widest mb-1 leading-none">Primary Impact</div>
                      <div className="text-sm font-bold text-white mb-0.5">{rec.impact}</div>
                      <div className="text-xs text-emerald-400 font-bold flex items-center gap-1.5 leading-none">
                         <TrendingUp className="w-3 h-3" />
                         {rec.scoreImpact} Score Lift
                      </div>
                   </div>
                   <div>
                      <div className="text-[10px] font-bold text-zinc-600 uppercase tracking-widest mb-1 leading-none">Assign To</div>
                      <div className="flex items-center gap-2">
                        <Users className="w-3.5 h-3.5 text-zinc-500" />
                        <span className="text-xs font-semibold text-zinc-300">{rec.owner}</span>
                      </div>
                   </div>
                </div>

                <div className="flex flex-col justify-center items-end border-l border-zinc-800/50 pl-12 gap-4">
                   <div className="text-right">
                      <div className="text-[10px] font-bold text-zinc-600 uppercase tracking-widest mb-1 leading-none">AI Confidence</div>
                      <div className="text-2xl font-black text-white italic tracking-tighter">{rec.confidence}%</div>
                   </div>
                   <button className="w-full py-3 bg-white text-black font-bold text-xs rounded-xl hover:bg-zinc-200 transition-all uppercase tracking-widest flex items-center justify-center gap-2 shadow-xl shadow-white/5 active:scale-95">
                      Fix Now
                      <ArrowUpRight className="w-4 h-4" />
                   </button>
                </div>

                <div className={`absolute left-0 top-0 bottom-0 w-1 ${
                  rec.severity === 'Critical' ? 'bg-red-500' : rec.severity === 'High' ? 'bg-amber-500' : 'bg-blue-500'
                }`} />
             </div>
           ))}
        </div>
      </div>
    </Shell>
  );
}

function TrendingUp(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polyline points="22 7 13.5 15.5 8.5 10.5 2 17" />
      <polyline points="16 7 22 7 22 13" />
    </svg>
  );
}
