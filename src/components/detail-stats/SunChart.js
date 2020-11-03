import React, { PureComponent } from "react";
import { ResponsiveContainer, AreaChart, Area, XAxis } from "recharts";

const data = [
  {
    name: "6am",
    uv: -1000,
  },
  {
    name: "1pm",
    uv: 3000,
  },
  {
    name: "8pm",
    uv: -1000,
  },
];

const gradientOffset = () => {
  const dataMax = Math.max(...data.map((i) => i.uv));
  const dataMin = Math.min(...data.map((i) => i.uv));

  if (dataMax <= 0) {
    return 0;
  }
  if (dataMin >= 0) {
    return 1;
  }

  return dataMax / (dataMax - dataMin);
};

const off = gradientOffset();

export default class SunChart extends PureComponent {
  render() {
    return (
      <div style={{ width: "100%", height: 300 }}>
        <ResponsiveContainer>
          <AreaChart
            height={200}
            data={data}
            margin={{
              top: 10,
              right: 20,
              left: 20,
              bottom: 0,
            }}
          >
            <XAxis dataKey="name" />
            <defs>
              <linearGradient id="time" x1="0" y1="0" x2="0" y2="1">
                <stop offset={off} stopColor="#FEDB41" stopOpacity={0.6} />
                <stop offset={off} stopColor="black" stopOpacity={1} />
              </linearGradient>
            </defs>
            <Area
              type="monotone"
              dataKey="uv"
              stroke="orange"
              fill="url(#time)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    );
  }
}
