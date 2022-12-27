import React, { useState } from 'react';

import { Add as AddIcon } from '@mui/icons-material';

import VaccineDialog from '../../components/VaccineDialog';
import FabButton from '../../components/FabButton/FabButton';

import VaccineTable from '../../components/VaccineTable';

function VaccinePage() {
  const [isVaccineDialogOpen, setIsVaccineDialogOpen] = useState(false);

  const openVaccineDialog = React.useCallback(
    () => setIsVaccineDialogOpen(true),
    [],
  );

  const closeVaccineDialog = React.useCallback(
    () => setIsVaccineDialogOpen(false),
    [],
  );

  return (
    <>
      <VaccineDialog
        isOpen={isVaccineDialogOpen}
        onClose={closeVaccineDialog}
      />
      <VaccineTable openVaccineDialog={openVaccineDialog} />

      <FabButton tooltipMessage="Add Vaccine" onClick={openVaccineDialog}>
        <AddIcon />
      </FabButton>
    </>
  );
}

export default VaccinePage;
