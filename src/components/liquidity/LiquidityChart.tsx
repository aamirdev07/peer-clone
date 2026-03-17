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
        <h3 className="text-text-primary text-lg font-semibold">
          Kosmyk Total Liquidity
        </h3>
        <p className="text-text-secondary text-sm">Kosmyk Liquidity</p>
      </div>
      <div className="h-[280px]">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={LIQUIDITY_CHART_DATA}>
            <defs>
              <linearGradient
                id="liquidityGradient"
                x1="0"
                y1="0"
                x2="0"
                y2="1"
              >
                <stop offset="5%" stopColor="#22D3EE" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#22D3EE" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid
              strokeDasharray="3 3"
              stroke="#152030"
              vertical={false}
            />
            <XAxis
              dataKey="month"
              axisLine={false}
              tickLine={false}
              tick={{ fill: "#6B8299", fontSize: 11 }}
              dy={10}
            />
            <YAxis
              axisLine={false}
              tickLine={false}
              tick={{ fill: "#6B8299", fontSize: 11 }}
              tickFormatter={(v) => `${(v / 1000).toFixed(0)}k`}
              dx={-10}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: "#111B25",
                border: "1px solid #152030",
                borderRadius: "12px",
                color: "#E8EDF2",
                fontSize: "13px",
              }}
              labelStyle={{ color: "#6B8299" }}
              formatter={(value) => [
                `$${(Number(value) / 1000).toFixed(1)}k`,
                "Liquidity",
              ]}
            />
            <Area
              type="monotone"
              dataKey="value"
              stroke="#22D3EE"
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
