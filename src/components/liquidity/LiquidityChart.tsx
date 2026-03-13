"use client";

import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { LIQUIDITY_CHART_DATA } from "@/lib/constants";

export default function LiquidityChart() {
  return (
    <div className="bg-bg-surface rounded-xl p-5 border border-border-subtle">
      <div className="mb-4">
        <h3 className="text-text-primary text-lg font-semibold">Peer Total Liquidity</h3>
        <p className="text-text-secondary text-sm">Peer Liquidity</p>
      </div>
      <div className="h-[280px]">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={LIQUIDITY_CHART_DATA}>
            <defs>
              <linearGradient id="liquidityGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#8B5CF6" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#8B5CF6" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#1E1E36" vertical={false} />
            <XAxis
              dataKey="month"
              axisLine={false}
              tickLine={false}
              tick={{ fill: "#7C7C99", fontSize: 11 }}
              dy={10}
            />
            <YAxis
              axisLine={false}
              tickLine={false}
              tick={{ fill: "#7C7C99", fontSize: 11 }}
              tickFormatter={(v) => `${(v / 1000).toFixed(0)}k`}
              dx={-10}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: "#161622",
                border: "1px solid #1E1E36",
                borderRadius: "12px",
                color: "#EDEDF4",
                fontSize: "13px",
              }}
              labelStyle={{ color: "#7C7C99" }}
              formatter={(value) => [`$${(Number(value) / 1000).toFixed(1)}k`, "Liquidity"]}
            />
            <Area
              type="monotone"
              dataKey="value"
              stroke="#8B5CF6"
              strokeWidth={2}
              fill="url(#liquidityGradient)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
      <p className="text-text-tertiary text-xs mt-3">@zkp2p with Dune</p>
    </div>
  );
}
