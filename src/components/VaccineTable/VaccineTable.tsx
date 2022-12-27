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

import Chip from '../Chip';
import SkeletonWrapper from '../../components/Skeleton';
import ThreeDotMenu from '../../components/ThreeDotMenu';

import { useAppDispatch, useAppSelector } from '../../hooks';

import { getVaccineThunk } from '../../slices/vaccineSlice';
import { Vaccine, VaccineStage } from '../../interfaces/vaccineInterface';

import { formateDateToShort } from '../../utils/date';
import { VACCINE_STAGES } from '../../constants/base.constants';

const columnHelper = createColumnHelper<Vaccine>();

interface VaccineTableProps {
  openVaccineDialog: () => void;
  openVaccineDeleteDialog: (vaccine: Vaccine) => void;
}

function renderStage(stage: VaccineStage) {
  switch (stage) {
    case VACCINE_STAGES.research:
      return <Chip label={VACCINE_STAGES.research} color="info" />;
    case VACCINE_STAGES.preclinical:
      return <Chip label={VACCINE_STAGES.preclinical} color="primary" />;
    case VACCINE_STAGES.clinical:
      return <Chip label={VACCINE_STAGES.clinical} color="error" />;
    case VACCINE_STAGES.regulatory:
      return <Chip label={VACCINE_STAGES.regulatory} color="success" />;
    case VACCINE_STAGES.manufacturing:
      return <Chip label={VACCINE_STAGES.manufacturing} color="secondary" />;
    default:
      return <Chip label={VACCINE_STAGES.research} />;
  }
}

function VaccineTable({
  openVaccineDialog,
  openVaccineDeleteDialog,
}: VaccineTableProps) {
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
              openVaccineDeleteDialog(info.cell.row.original);
            },
          },
        ]}
      />
    ),
    [openVaccineDialog, dispatch],
  );

  useEffect(() => {
    dispatch(getVaccineThunk());
  }, []);

  const COLUMNS = React.useMemo(
    () => [
      columnHelper.accessor('name', {
        header: 'Name',
      }),
      columnHelper.accessor('stage', {
        header: 'Stage',
        cell: (info) => renderStage(info.getValue()),
      }),
      columnHelper.accessor('description', {
        header: 'Description',
      }),
      columnHelper.accessor('numberOfDoses', {
        header: '# Doses',
        cell: (info) => <div className="text-right">{info.getValue()}</div>,
      }),
      columnHelper.accessor('isMandatory', {
        header: 'Mandatory?',
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
