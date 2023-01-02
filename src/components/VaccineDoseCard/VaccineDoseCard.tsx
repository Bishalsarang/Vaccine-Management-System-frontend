import { Card, CardContent, Typography } from '@mui/material';
import {
  Bar,
  Text,
  XAxis,
  YAxis,
  Tooltip,
  BarChart,
  CartesianGrid,
} from 'recharts';

import Skeleton from '../Skeleton';

import { useAppSelector } from '../../hooks';

export default function VaccineDoseCard() {
  const { vaccines = [], isLoading } = useAppSelector((state) => state.vaccine);

  const renderLegend = () => {
    return (
      <div className="flex flex-col justify-center px-6">
        <div className="text-red-500">IsMandatory</div>
        <div className="text-green-500">Optional</div>
      </div>
    );
  };

  return (
    <Card className="flex h-full max-w-sm items-start justify-center">
      <CardContent className="h-full">
        <Typography className="text-center" component="div" variant="h5">
          Vaccine Doses
        </Typography>
        {isLoading ? (
          <Skeleton width={400} height={300} />
        ) : (
          <BarChart
            width={400}
            height={300}
            data={vaccines.map(({ name, numberOfDoses, isMandatory }) => ({
              name,
              numberOfDoses,
              fill: isMandatory ? 'red' : 'green',
            }))}
            margin={{
              top: 20,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" hide label={''} />
            <YAxis
              orientation="left"
              label={
                <Text x={0} y={0} dx={50} dy={200} offset={0} angle={-90}>
                  Number of Doses
                </Text>
              }
            />
            <Tooltip />
            <Bar dataKey="numberOfDoses" stackId="a" />
          </BarChart>
        )}
        {renderLegend()}
      </CardContent>
    </Card>
  );
}
