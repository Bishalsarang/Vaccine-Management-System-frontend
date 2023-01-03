import { Skeleton, SkeletonProps } from '@mui/material';

export function SkeletonWrapper(skeletonProps: SkeletonProps) {
  return (
    <Skeleton
      animation="wave"
      variant="rectangular"
      data-testid="skeleton"
      {...skeletonProps}
    />
  );
}
