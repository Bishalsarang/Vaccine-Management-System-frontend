import { Skeleton, SkeletonProps } from '@mui/material';

export const SkeletonWrapper = (skeletonProps: SkeletonProps) => {
  return <Skeleton variant="rectangular" animation="wave" {...skeletonProps} />;
};
