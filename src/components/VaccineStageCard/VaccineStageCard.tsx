import { useEffect, useState } from 'react';

import { Card, CardContent, Typography } from '@mui/material';

import PieChartWrapper from '../PieChart';
import {
  getVaccineStages,
  FieldCountWrapper,
} from '../../services/vaccineService';
import { showErrorMessage } from '../../utils/toast';

function VaccineStageCard() {
  const [isLoading, setIsLoading] = useState(false);

  const [vaccineStages, setVaccineStages] = useState<FieldCountWrapper[]>([]);

  useEffect(() => {
    async function fetchVaccines() {
      setIsLoading(true);

      try {
        const result = await getVaccineStages();
        setVaccineStages(result);
      } catch (err: any) {
        showErrorMessage(err);
      } finally {
        setIsLoading(false);
      }
    }

    fetchVaccines();
  }, []);

  return (
    <Card className="flex h-full max-w-sm items-start justify-center">
      <CardContent>
        <Typography className="text-center" component="div" variant="h5">
          Vaccine Stages
        </Typography>
        <PieChartWrapper
          height={330}
          dataKey="count"
          outerRadius={80}
          loaderRadius={120}
          data={vaccineStages}
          isLoading={isLoading}
        ></PieChartWrapper>
      </CardContent>
    </Card>
  );
}

export default VaccineStageCard;
