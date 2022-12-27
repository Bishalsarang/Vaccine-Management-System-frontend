import { PieChart, Pie, Cell, Tooltip, Legend } from 'recharts';
import { VACCINE_STAGES } from '../../constants/base.constants';
import Skeleton from '../Skeleton';

const data = Object.values(VACCINE_STAGES).map((stage) => ({
  name: stage,
  value: Math.round(Math.random() * 100 + 1),
}));
const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

export function PieChartWrapper({
  dataKey = 'value',
  width = 350,
  height = 210,
  outerRadius = 60,
  isLoading = false,
}) {
  if (isLoading) {
    return <Skeleton variant="circular" width={width} height={height} />;
  }

  return (
    <PieChart width={width} height={height}>
      <Legend verticalAlign="bottom" align="center"></Legend>
      <Pie
        label
        data={data}
        cx={width / 2}
        fill="#8884d8"
        cy={height / 2 - 20}
        dataKey={dataKey}
        outerRadius={outerRadius}
      >
        {data.map((_, index) => (
          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
        ))}
      </Pie>
      <Tooltip />
    </PieChart>
  );
}
