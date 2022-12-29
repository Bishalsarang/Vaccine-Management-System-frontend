import { Card, CardContent, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { Word } from 'react-wordcloud';
import { getAllergies } from '../../services/vaccineService';

import WordCloudWrapper from '../WordCloud';

export function VaccineAllergyCard() {
  const [isLoading, setIsLoading] = useState(false);

  const [vaccineAllergies, setVaccineAllergies] = useState<Word[]>([]);

  useEffect(() => {
    async function fetchAllergiesAndSideEffects() {
      setIsLoading(true);
      const result = await getAllergies();
      setIsLoading(false);
      setVaccineAllergies(
        result.map(({ name, count }) => ({ text: name, value: count })),
      );
    }

    fetchAllergiesAndSideEffects();
  }, []);

  return (
    <Card className="flex max-w-sm items-start justify-center">
      <CardContent>
        <Typography className="text-center" component="div" variant="h5">
          Allergies/ SideEffects
        </Typography>

        <WordCloudWrapper isLoading={isLoading} data={vaccineAllergies} />
      </CardContent>
    </Card>
  );
}
