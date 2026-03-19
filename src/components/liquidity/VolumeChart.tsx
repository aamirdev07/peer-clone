"use client";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import { VOLUME_CHART_DATA, VOLUME_PLATFORMS } from "@/lib/constants";

export default function VolumeChart() {
  return (
    <div className="bg-bg-surface rounded-xl p-5 border border-border-subtle">
      <div className="mb-4">
        <h3 className="text-text-primary text-lg font-semibold">
          Kosmyk Weekly Onramp Volume
        </h3>
        <p className="text-text-secondary text-sm">Kosmyk Totals</p>
      </div>
      <div className="h-[200px] sm:h-[280px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={VOLUME_CHART_DATA}>
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
                fontSize: "12px",
              }}
              labelStyle={{ color: "#6B8299" }}
              formatter={(value, name) => {
                const platform = VOLUME_PLATFORMS.find((p) => p.key === name);
                return [
                  `$${(Number(value) / 1000).toFixed(1)}k`,
                  platform?.label || String(name),
                ];
              }}
            />
            <Legend
              verticalAlign="top"
              align="right"
              iconType="circle"
              iconSize={8}
              wrapperStyle={{
                fontSize: "11px",
                color: "#6B8299",
                paddingBottom: "8px",
              }}
              formatter={(value) => {
                const platform = VOLUME_PLATFORMS.find((p) => p.key === value);
                return platform?.label || value;
              }}
            />
            {VOLUME_PLATFORMS.map((platform) => (
              <Bar
                key={platform.key}
                dataKey={platform.key}
                stackId="volume"
                fill={platform.color}
                radius={0}
              />
            ))}
          </BarChart>
        </ResponsiveContainer>
      </div>
      <p className="text-text-tertiary text-xs mt-3">@zkp2p with Dune</p>
    </div>
  );
}
