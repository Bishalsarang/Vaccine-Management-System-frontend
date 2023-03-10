import WordCloud, { Word } from 'react-wordcloud';
import SkeletonWrapper from '../Skeleton';

interface WordCloudWrapperProps {
  data: Word[];
  width?: number;
  height?: number;
  isLoading: boolean;
}

export function WordCloudWrapper({
  data = [],
  width = 350,
  height = 160,
  isLoading = false,
}: WordCloudWrapperProps) {
  if (isLoading) {
    return <SkeletonWrapper width={width} height={height} />;
  }

  return (
    <div>
      <WordCloud
        options={{
          fontSizes: [16, 54],
        }}
        size={[width, height]}
        words={data}
      />
    </div>
  );
}
