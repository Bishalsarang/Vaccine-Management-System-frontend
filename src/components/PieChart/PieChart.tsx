import { PieChart, Pie, Cell, Tooltip, Legend } from 'recharts';
import Skeleton from '../Skeleton';

// TODO: Make the color configurable and make it consistent wioth table color.
const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

interface PieChartWrapperProps {
  data?: any[];
  dataKey?: string;
  width?: number;
  height?: number;
  outerRadius?: number;
  isLoading?: boolean;
  loaderRadius?: number;
}

export function PieChartWrapper({
  dataKey = 'value',
  width = 350,
  data = [],
  height = 210,
  outerRadius = 60,
  isLoading = false,
  loaderRadius,
}: PieChartWrapperProps) {
  const minValueDimension = loaderRadius || Math.min(width, height);

  if (isLoading) {
    return (
      <Skeleton
        variant="circular"
        width={minValueDimension}
        height={minValueDimension}
      />
    );
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
