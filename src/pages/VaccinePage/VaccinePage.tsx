import React, { useState } from 'react';

import { Add as AddIcon } from '@mui/icons-material';
import { Card, CardContent, Typography } from '@mui/material';

import VaccineTable from '../../components/VaccineTable';
import VaccineDialog from '../../components/VaccineDialog';
import FabButton from '../../components/FabButton/FabButton';
import ConfirmationDialog from '../../components/ConfirmationDialog';

import { DialogOptions, IdParams } from '../../interfaces/commonInterface';
import {
  Vaccine,
  CreateVaccinePayload,
  PatchVaccinePayload,
} from '../../interfaces/vaccineInterface';

import { useAppDispatch } from '../../hooks';

import { deleteVaccineThunk, getVaccineThunk } from '../../slices/vaccineSlice';

import { showErrorMessage, showSuccessMessage } from '../../utils/toast';
import VaccineStageCard from '../../components/VaccineStageCard/VaccineStageCard';
import VaccineAllergycard from '../../components/VaccineAllergyCard';

const INITIAL_VACCINE: CreateVaccinePayload = {
  name: '',
  description: '',
  numberOfDoses: 1,
  isMandatory: false,
  stage: 'R&D',
  allergies: [],
};

function VaccinePage() {
  const [vaccineAddEditDialogOptions, setVaccineAddEditDialogOptions] =
    useState<DialogOptions<CreateVaccinePayload | PatchVaccinePayload>>({
      data: INITIAL_VACCINE,
      isOpen: false,
      mode: 'create',
    });
  const [vaccineDeleteDialogOptions, setVaccineDeleteDialogOptions] = useState<{
    data: IdParams;
    isOpen: boolean;
  }>({
    isOpen: false,
    data: {
      id: null,
    },
  });
  const dispatch = useAppDispatch();

  const openVaccineDialog = React.useCallback(
    (
      option: DialogOptions<CreateVaccinePayload> = {
        data: INITIAL_VACCINE,
        isOpen: false,
        mode: 'create',
      },
    ) => {
      setVaccineAddEditDialogOptions({
        isOpen: true,
        data: { ...option.data },
        mode: option.mode,
      });
    },
    [],
  );

  const closeVaccineDialog = React.useCallback(
    () =>
      setVaccineAddEditDialogOptions({
        isOpen: false,
        data: INITIAL_VACCINE,
        mode: 'create',
      }),
    [],
  );

  const openVaccineDeleteDialog = React.useCallback(
    (vaccine: Vaccine) =>
      setVaccineDeleteDialogOptions({ isOpen: true, data: vaccine }),
    [],
  );

  const closeVaccineDeleteDialog = React.useCallback(
    () => setVaccineDeleteDialogOptions({ isOpen: false, data: { id: null } }),
    [],
  );

  const deleteVaccine = React.useCallback(async () => {
    const { id } = vaccineDeleteDialogOptions.data;
    if (!id) {
      showErrorMessage('Invalid ID. Please try again.');
      closeVaccineDeleteDialog();
      return;
    }

    await dispatch(deleteVaccineThunk(id));

    showSuccessMessage('Vaccine Deleted Successfully.');
    dispatch(getVaccineThunk());
    closeVaccineDeleteDialog();
  }, [closeVaccineDeleteDialog, dispatch, vaccineDeleteDialogOptions.data]);

  return (
    <>
      <div className="grid max-h-96 grid-cols-3">
        <Card className="flex max-w-sm justify-center">
          <CardContent>
            <Typography className="text-center" component="div" variant="h5">
              Summary
            </Typography>

            <Typography
              component="div"
              variant="subtitle1"
              color="text.secondary"
            >
              Total Vaccines: <span>{100}</span>
            </Typography>
            <Typography
              component="div"
              variant="subtitle1"
              color="text.secondary"
            >
              Mandatory Vaccines: <span>{40}</span>
            </Typography>
            <Typography
              component="div"
              variant="subtitle1"
              color="text.secondary"
            >
              Non Mandatory Vaccines: <span>{60}</span>
            </Typography>
            <Typography
              component="div"
              variant="subtitle1"
              color="text.secondary"
            >
              Average Dose: <span>{12}</span>
            </Typography>
          </CardContent>
        </Card>
        <VaccineStageCard />
        <VaccineAllergycard />
      </div>

      {vaccineAddEditDialogOptions.isOpen && (
        <VaccineDialog
          isOpen
          mode={vaccineAddEditDialogOptions.mode}
          onClose={closeVaccineDialog}
          data={vaccineAddEditDialogOptions.data}
        />
      )}

      <ConfirmationDialog
        onAccept={deleteVaccine}
        acceptButtontext="Delete"
        cancelButtonText="Cancel"
        heading="Delete Vaccine?"
        onClose={closeVaccineDeleteDialog}
        isOpen={vaccineDeleteDialogOptions.isOpen}
        message="Are you sure you want to delete the vaccine"
      ></ConfirmationDialog>
      <VaccineTable
        openVaccineDialog={openVaccineDialog}
        openVaccineDeleteDialog={openVaccineDeleteDialog}
      />

      <FabButton
        tooltipMessage="Add Vaccine"
        onClick={() => openVaccineDialog()}
      >
        <AddIcon />
      </FabButton>
    </>
  );
}

export default VaccinePage;
