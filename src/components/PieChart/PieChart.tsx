import { PieChart, Pie, Cell, Tooltip, Legend } from 'recharts';

import Skeleton from '../Skeleton';

// TODO: Make the color configurable and make it consistent with table color.
const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

/**
 * Represents the properties of the PieChartWrapper component.
 *
 * @interface PieChartWrapperProps
 */
interface PieChartWrapperProps {
  /**
   * The data to be plotted on the pie chart.
   *
   * @type {any[]}
   */
  data?: any[];

  /**
   * The data key to use for the pie chart.
   *
   * @type {string}
   */
  dataKey?: string;

  /**
   * The width of the pie chart.
   *
   * @type {number}
   */
  width?: number;

  /**
   * The height of the pie chart.
   *
   * @type {number}
   */
  height?: number;

  /**
   * The outer radius of the pie chart.
   *
   * @type {number}
   */
  outerRadius?: number;

  /**
   * Indicates whether the pie chart is being loaded.
   *
   * @type {boolean}
   */
  isLoading?: boolean;

  /**
   * The radius of the loading indicator.
   *
   * @type {number}
   */
  loaderRadius?: number;
}

export function PieChartWrapper({
  data = [],
  width = 350,
  height = 210,
  loaderRadius,
  outerRadius = 60,
  dataKey = 'value',
  isLoading = false,
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
        dataKey={dataKey}
        cy={height / 2 - 30}
        outerRadius={outerRadius}
      >
        {data.map((value, index) => (
          <Cell
            key={`cell-${value}-${index}`}
            fill={COLORS[index % COLORS.length]}
          />
        ))}
      </Pie>
      <Tooltip />
    </PieChart>
  );
}
