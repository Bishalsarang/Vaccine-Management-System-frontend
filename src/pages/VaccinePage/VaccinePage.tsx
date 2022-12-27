import React, { useState } from 'react';

import { Add as AddIcon } from '@mui/icons-material';

import VaccineDialog from '../../components/VaccineDialog';
import FabButton from '../../components/FabButton/FabButton';

import VaccineTable from '../../components/VaccineTable';
import ConfirmationDialog from '../../components/ConfirmationDialog';
import { Vaccine } from '../../interfaces/vaccineInterface';
import { showErrorMessage, showSuccessMessage } from '../../utils/toast';
import { useAppDispatch } from '../../hooks';
import { deleteVaccineThunk, getVaccineThunk } from '../../slices/vaccineSlice';
import { IdParams } from '../../interfaces/commonInterface';

function VaccinePage() {
  const [isVaccineDialogOpen, setIsVaccineDialogOpen] = useState(false);
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
    () => setIsVaccineDialogOpen(true),
    [],
  );

  const closeVaccineDialog = React.useCallback(
    () => setIsVaccineDialogOpen(false),
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
      <VaccineDialog
        isOpen={isVaccineDialogOpen}
        onClose={closeVaccineDialog}
      />
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

      <FabButton tooltipMessage="Add Vaccine" onClick={openVaccineDialog}>
        <AddIcon />
      </FabButton>
    </>
  );
}

export default VaccinePage;
