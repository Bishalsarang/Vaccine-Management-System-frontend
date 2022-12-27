import WordCloud from 'react-wordcloud';
import SkeletonWrapper from '../Skeleton';

const data = [
  { text: 'fever', value: 10 },
  { text: 'nausea', value: 20 },
  { text: 'headache', value: 5 },
  { text: 'vomiting', value: 15 },
];

export function WordCloudWrapper({
  width = 350,
  height = 160,
  isLoading = false,
}) {
  if (isLoading) {
    return <SkeletonWrapper />;
  }

  return (
    <div className=" max-h-9">
      <WordCloud size={[width, height]} words={data} />
    </div>
  );
}
