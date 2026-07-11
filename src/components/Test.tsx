import { Area, AreaChart, CartesianGrid, Tooltip, XAxis, YAxis } from 'recharts';
import { RechartsDevtools } from '@recharts/devtools';

// #region Sample data
const data = [
  {
    name: '08:00 AM',
    uv: 4000,
    pv: 2400,
    amt: 2400,
  },
  {
    name: '10:00 AM',
    uv: 3000,
    pv: 1398,
    amt: 2210,
  },
  {
    name: '12:00 PM',
    uv: 2000,
    pv: 9800,
    amt: 2290,
  },
  {
    name: '02:00 PM',
    uv: 2780,
    pv: 3908,
    amt: 2000,
  },
  {
    name: '04:00 PM',
    uv: 1890,
    pv: 4800,
    amt: 2181,
  },
  {
    name: '06:00 PM',
    uv: 2390,
    pv: 3800,
    amt: 2500,
  },
  {
    name: '08:00 PM',
    uv: 3490,
    pv: 4300,
    amt: 2100,
  },
];

// #endregion
const AreaChartExample = ({ isAnimationActive = true }) => (
  <AreaChart
    style={{ width: '100%', maxWidth: '100%', maxHeight: '50vh', aspectRatio: 1.618 }}
    responsive
    data={data}
    margin={{ top: 10, right: 0, left: 0, bottom: 0 }}
  >
    <defs>
      <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
        <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
        <stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
      </linearGradient>
      <linearGradient id="colorPv" x1="0" y1="0" x2="0" y2="1">
        <stop offset="5%" stopColor="#82ca9d" stopOpacity={0.8} />
        <stop offset="95%" stopColor="#82ca9d" stopOpacity={0} />
      </linearGradient>
    </defs>
    <CartesianGrid strokeDasharray="5 3 2 3" vertical={false}/>
    <XAxis dataKey="name" axisLine={false} 
      tickLine={false}/>
    <YAxis width="auto" axisLine={false} 
      tickLine={false}/>
    <Tooltip />
    <Area
      type="monotone"
      dataKey="uv"
      stroke="#8884d8"
      fillOpacity={1}
      fill="url(#colorUv)"
      isAnimationActive={isAnimationActive}
      animationBegin={200}
      animationDuration={1300}
    />
    <Area
      type="monotone"
      dataKey="pv"
      stroke="#82ca9d"
      fillOpacity={1}
      fill="url(#colorPv)"
      isAnimationActive={isAnimationActive}
    />
    <RechartsDevtools />
  </AreaChart>
);

export default AreaChartExample;