import React, { PureComponent } from "react";
import { AreaChart, Area, XAxis, CartesianGrid, Tooltip } from "recharts";

export default class WeatherChart extends PureComponent {
  render() {
    let { data } = this.props;
    return (
      <div
        style={{
          width: "100%",
          height: 230,
          overflowX: "auto",
          marginBottom: "1rem",
        }}
      >
        <AreaChart
          data={data}
          margin={{
            top: 10,
            right: 20,
            left: 20,
            bottom: 0,
          }}
          width={1360}
          height={200}
        >
          <CartesianGrid strokeDasharray="3 3" horizontal={false} />
          <XAxis dataKey="time" />
          <defs>
            <linearGradient id="temp" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#00a6fa" stopOpacity={0.8} />
              <stop offset="95%" stopColor="#00a6fa" stopOpacity={0} />
            </linearGradient>
          </defs>
          <Tooltip />
          <Area
            type="monotone"
            dataKey="temp"
            dot={true}
            stroke="#00a6fa"
            fill="url(#temp)"
            fillOpacity={1}
            strokeWidth={2}
          />
        </AreaChart>
      </div>
    );
  }
}
