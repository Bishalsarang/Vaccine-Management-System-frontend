import React, { useCallback, useEffect } from 'react';

import {
  flexRender,
  CellContext,
  useReactTable,
  getCoreRowModel,
  createColumnHelper,
} from '@tanstack/react-table';

import { MdEdit, MdDelete } from 'react-icons/md';
import { VscError, VscPass } from 'react-icons/vsc';

import SkeletonWrapper from '../../components/Skeleton';
import ThreeDotMenu from '../../components/ThreeDotMenu';

import { useAppDispatch, useAppSelector } from '../../hooks';

import { deleteVaccineThunk, getVaccineThunk } from '../../slices/vaccineSlice';
import { Vaccine } from '../../interfaces/vaccine.interface';

import { formateDateToShort } from '../../utils/date';
import { showSuccessMessage } from '../../utils/toast';

const columnHelper = createColumnHelper<Vaccine>();

interface VaccineTableProps {
  openVaccineDialog: () => void;
}

function VaccineTable({ openVaccineDialog }: VaccineTableProps) {
  const { vaccines = [], isLoading } = useAppSelector((state) => state.vaccine);
  const dispatch = useAppDispatch();

  const skeleton = useCallback(() => <SkeletonWrapper height={'20px'} />, []);
  const threeDotMenu = useCallback(
    (info: CellContext<Vaccine, unknown>) => (
      <ThreeDotMenu
        menuItems={[
          {
            label: 'Edit',
            icon: <MdEdit size={24} />,
            onClick: () => {
              openVaccineDialog();

              console.log('Open Edit', info.cell.row.original);
            },
          },
          {
            label: 'Delete',
            icon: <MdDelete size={24} />,
            onClick: () => {
              // TODO: Add a confirmation dialog.
              try {
                dispatch(deleteVaccineThunk(info.cell.row.original.id));
              } catch (err: any) {}

              showSuccessMessage('Vaccine Deleted Successfully.');
              dispatch(getVaccineThunk());
            },
          },
        ]}
      />
    ),
    [openVaccineDialog],
  );

  useEffect(() => {
    dispatch(getVaccineThunk());
  }, []);

  const COLUMNS = React.useMemo(
    () => [
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
          info.getValue() ? (
            <VscPass color="green" />
          ) : (
            <VscError color="red" />
          ),
      }),
      columnHelper.accessor('createdAt', {
        header: 'Created At',
        cell: (info) => formateDateToShort(info.getValue()),
      }),
      columnHelper.accessor('updatedAt', {
        header: 'Updated At',
        cell: (info) => formateDateToShort(info.getValue()),
      }),
      columnHelper.display({
        id: 'actions',
        cell: threeDotMenu,
      }),
    ],
    [],
  );

  const SKELETON_COLUMNS = COLUMNS.map((column) => ({
    ...column,
    cell: skeleton,
  }));

  const columns = React.useMemo(
    () => (isLoading ? SKELETON_COLUMNS : COLUMNS),
    [isLoading, SKELETON_COLUMNS, COLUMNS],
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
    <div className="h-4/5 overflow-auto rounded-xl p-2">
      <table className="w-full table-auto shadow-md">
        <thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th
                  key={header.id}
                  className="sticky top-0 bg-gray-700 p-4 text-left text-white"
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
            <tr
              key={row.id}
              className="m-1 cursor-pointer shadow-sm hover:bg-zinc-50"
            >
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

export default VaccineTable;
