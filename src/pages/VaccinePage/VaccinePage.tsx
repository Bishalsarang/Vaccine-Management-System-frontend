import React, { useState } from 'react';

import { Add as AddIcon } from '@mui/icons-material';
import { Card, CardContent, Typography } from '@mui/material';

import VaccineTable from '../../components/VaccineTable';
import WordCloudWrapper from '../../components/WordCloud';
import VaccineDialog from '../../components/VaccineDialog';
import FabButton from '../../components/FabButton/FabButton';
import ConfirmationDialog from '../../components/ConfirmationDialog';

import { IdParams } from '../../interfaces/commonInterface';
import { Vaccine } from '../../interfaces/vaccineInterface';

import { useAppDispatch } from '../../hooks';

import { deleteVaccineThunk, getVaccineThunk } from '../../slices/vaccineSlice';

import { showErrorMessage, showSuccessMessage } from '../../utils/toast';
import VaccineStageCard from '../../components/VaccineStageCard/VaccineStageCard';

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
      <div className="grid grid-cols-3">
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
        {<VaccineStageCard />}

        <Card className="flex max-w-sm items-start justify-center">
          <CardContent>
            <Typography className="text-center" component="div" variant="h5">
              Allergies/ SideEffects
            </Typography>
            <WordCloudWrapper />
          </CardContent>
        </Card>
      </div>
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
