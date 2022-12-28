import { useEffect, useState } from 'react';

import { Card, CardContent, Typography } from '@mui/material';

import PieChartWrapper from '../PieChart';
import {
  getVaccineStages,
  VaccineStageCount,
} from '../../services/vaccineService';

function VaccineStageCard() {
  const [isLoading, setIsLoading] = useState(false);

  const [vaccineStages, setVaccineStages] = useState<VaccineStageCount[]>([]);

  useEffect(() => {
    async function fetchVaccines() {
      setIsLoading(true);
      const result = await getVaccineStages();
      setIsLoading(false);
      setVaccineStages(result);
    }

    fetchVaccines();
  }, []);

  return (
    <Card className="flex max-w-sm items-start justify-center">
      <CardContent>
        <Typography className="text-center" component="div" variant="h5">
          Vaccine Stages
        </Typography>
        <PieChartWrapper
          outerRadius={55}
          loaderRadius={120}
          isLoading={isLoading}
          dataKey="count"
          data={vaccineStages}
        ></PieChartWrapper>
      </CardContent>
    </Card>
  );
}

export default VaccineStageCard;
