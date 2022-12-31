import { Card, CardContent, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { Word } from 'react-wordcloud';
import { getAllergies } from '../../services/vaccineService';
import { showErrorMessage } from '../../utils/toast';

import WordCloudWrapper from '../WordCloud';

export function VaccineAllergyCard() {
  const [isLoading, setIsLoading] = useState(false);

  const [vaccineAllergies, setVaccineAllergies] = useState<Word[]>([]);

  useEffect(() => {
    async function fetchAllergiesAndSideEffects() {
      setIsLoading(true);
      try {
        const result = await getAllergies();
        setVaccineAllergies(
          result.map(({ name, count }) => ({ text: name, value: count })),
        );
      } catch (err: any) {
        showErrorMessage(err);
      } finally {
        setIsLoading(false);
      }
    }

    fetchAllergiesAndSideEffects();
  }, []);

  return (
    <Card className="flex h-full max-w-sm items-start justify-center">
      <CardContent>
        <Typography className="text-center" component="div" variant="h5">
          Allergies/ SideEffects
        </Typography>

        <WordCloudWrapper isLoading={isLoading} data={vaccineAllergies} />
      </CardContent>
    </Card>
  );
}
