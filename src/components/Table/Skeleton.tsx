interface SkeletonTableProps {
  columns: string[];
  rows: number;
}

const SkeletonTable = ({ columns = [], rows = 1 }: SkeletonTableProps) => {
  return (
    <table className="table-auto">
      <thead>
        <tr>
          {columns.map((column) => (
            <th
              key={column}
              className="h-10 w-20 rounded-md bg-gray-200 px-4 py-2"
            />
          ))}
        </tr>
      </thead>
      <tbody>
        {Array.from({ length: rows }).map((_, index) => (
          <tr key={index}>
            {columns.map((_, index) => (
              <td
                key={index}
                className="h-10 w-20 rounded-md bg-gray-200 px-4 py-2"
              />
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default SkeletonTable;
