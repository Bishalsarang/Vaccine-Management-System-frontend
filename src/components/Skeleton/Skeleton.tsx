interface SkeletonProps {
  width?: number | string;
  height?: number | string;
}

export const Skeleton = ({
  width = 'auto',
  height = 'auto',
}: SkeletonProps) => {
  return (
    <div
      className="rounded-md bg-gray-200 px-4 py-2"
      style={{ width, height }}
    ></div>
  );
};
