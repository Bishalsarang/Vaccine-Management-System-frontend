import * as React from 'react';

import Box from '@mui/material/Box';
import { Avatar } from '@mui/material';
import { DataGrid, GridColDef } from '@mui/x-data-grid';

import { MdEdit, MdDelete } from 'react-icons/md';
import { BsFileEarmarkImage } from 'react-icons/bs';
import { VscError, VscPass } from 'react-icons/vsc';

import Chip from '../Chip';
import ThreeDotMenu from '../ThreeDotMenu';

import {
  Vaccine,
  VaccineStage,
  CreateVaccinePayload,
} from '../../interfaces/vaccineInterface';
import { DialogOptions } from '../../interfaces/commonInterface';

import { useAppDispatch, useAppSelector } from '../../hooks';

import { getVaccineThunk } from '../../slices/vaccineSlice';

import { VACCINE_STAGES } from '../../constants/base.constants';

import { formateDateToShort } from '../../utils/date';
import { useCallback } from 'react';

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

interface VaccineTableProps {
  openVaccineDialog: (options: DialogOptions<CreateVaccinePayload>) => void;
  openVaccineDeleteDialog: (vaccine: Vaccine) => void;
}

export default function VaccineTable({
  openVaccineDialog,
  openVaccineDeleteDialog,
}: VaccineTableProps) {
  const { vaccines = [], isLoading } = useAppSelector((state) => state.vaccine);
  const dispatch = useAppDispatch();

  React.useEffect(() => {
    dispatch(getVaccineThunk());
  }, [dispatch]);

  const handleOpenEditDialog = useCallback(
    (params: { row: any }) => {
      openVaccineDialog({
        isOpen: true,
        mode: 'edit',
        data: params.row,
      });
    },
    [openVaccineDialog],
  );

  const columns: GridColDef[] = React.useMemo(
    () => [
      {
        field: 'actions',
        headerName: '',
        type: 'actions',
        width: 20,
        headerClassName: 'tes',

        renderCell(params) {
          return (
            <ThreeDotMenu
              menuItems={[
                {
                  label: 'Edit',
                  icon: <MdEdit size={24} />,
                  onClick: () => handleOpenEditDialog(params),
                },
                {
                  label: 'Delete',
                  icon: <MdDelete size={24} />,
                  onClick: () => {
                    openVaccineDeleteDialog(params.row);
                  },
                },
              ]}
            />
          );
        },
      },
      {
        field: 'imageUrl',
        headerName: 'Image',
        width: 60,
        sortable: false,

        renderCell(params) {
          return (
            <Avatar variant="square" src={params.row.imageUrl}>
              <BsFileEarmarkImage />
            </Avatar>
          );
        },
      },
      {
        field: 'name',
        headerName: 'Name',
        width: 150,
      },
      {
        field: 'stage',
        headerName: 'Stage',
        width: 150,
        type: 'singleSelect',
        valueOptions: Object.values(VACCINE_STAGES),
        renderCell(params) {
          return renderStage(params.row.stage);
        },
        maxWidth: 200,
      },
      {
        field: 'description',
        headerName: 'Description',
        width: 400,
      },
      {
        field: 'numberOfDoses',
        headerName: '# Doses',
        width: 90,
      },
      {
        field: 'companyName',
        headerName: 'Company',
      },
      {
        field: 'isMandatory',
        headerName: 'Mandatory?',
        width: 90,
        renderCell(params) {
          return (
            <span className="flex justify-center">
              {params.row.isMandatory ? (
                <VscPass color="green" />
              ) : (
                <VscError color="red" />
              )}
            </span>
          );
        },
      },
      {
        field: 'createdAt',
        headerName: 'Created At',
        width: 150,
        renderCell(params) {
          return formateDateToShort(params.row.createdAt);
        },
      },
      {
        field: 'updatedAt',
        headerName: 'Updated At',
        width: 150,
        renderCell(params) {
          return formateDateToShort(params.row.updatedAt);
        },
      },
    ],
    [openVaccineDeleteDialog, handleOpenEditDialog],
  );

  return (
    <Box sx={{ height: 500, width: '100%' }}>
      <DataGrid
        rows={vaccines}
        columns={columns}
        density="standard"
        loading={isLoading}
        disableSelectionOnClick
        onRowDoubleClick={handleOpenEditDialog}
        rowsPerPageOptions={[5, 10, 50, 100]}
        experimentalFeatures={{ newEditingApi: true }}
      />
    </Box>
  );
}
