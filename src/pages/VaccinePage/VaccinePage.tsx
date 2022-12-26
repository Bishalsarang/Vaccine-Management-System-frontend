import {
  flexRender,
  useReactTable,
  getCoreRowModel,
  createColumnHelper,
} from '@tanstack/react-table';
import React, { useEffect } from 'react';
import { VscError, VscPass } from 'react-icons/vsc';

import Skeleton from '../../components/Skeleton';

import { useAppDispatch, useAppSelector } from '../../hooks/hooks';

import { Vaccine } from '../../interfaces/vaccine.interface';
import { getVaccineThunk } from '../../slices/vaccineSlice';

import { formateDateToShort } from '../../utils/date';

const columnHelper = createColumnHelper<Vaccine>();

const COLUMNS = [
  columnHelper.accessor('name', {
    header: 'Name',
  }),
  columnHelper.accessor('description', {
    header: 'Description',
  }),
  columnHelper.accessor('numberOfDoses', {
    header: 'Number of Doses',
    cell: (info) => <div className="text-right">{info.getValue()}</div>,
  }),
  columnHelper.accessor('isMandatory', {
    header: 'isMandatory',
    cell: (info) =>
      info.getValue() ? <VscPass color="green" /> : <VscError color="red" />,
  }),
  columnHelper.accessor('createdAt', {
    header: 'Created At',
    cell: (info) => formateDateToShort(info.getValue()),
  }),
  columnHelper.accessor('updatedAt', {
    header: 'Updated At',
    cell: (info) => formateDateToShort(info.getValue()),
  }),
];

const SKELETON_COLUMNS = COLUMNS.map((column) => ({
  ...column,
  cell: () => <Skeleton height={'20px'} />,
}));

function VaccinePage() {
  const { vaccines = [], isLoading } = useAppSelector((state) => state.vaccine);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getVaccineThunk());
  }, []);

  const columns = React.useMemo(
    () => (isLoading ? SKELETON_COLUMNS : COLUMNS),
    [isLoading],
  );
  const data = React.useMemo(
    () => (isLoading ? Array(10).fill({}) : vaccines),
    [vaccines, isLoading],
  );

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className="h-4/5 overflow-auto p-2">
      <table className="w-full table-auto shadow-md">
        <thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th
                  key={header.id}
                  className="sticky top-0 bg-gray-700 p-4 text-white"
                >
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.header,
                        header.getContext(),
                      )}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map((row) => (
            <tr key={row.id} className="m-1 shadow-sm">
              {row.getVisibleCells().map((cell) => (
                <td key={cell.id} className="p-4">
                  <div className="line-clamp-4">
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </div>
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default VaccinePage;
