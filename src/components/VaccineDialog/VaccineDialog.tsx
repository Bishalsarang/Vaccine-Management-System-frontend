import { useFormik } from 'formik';

import Dialog from '../Dialog';
import Form, { FormField } from '../../components/Form';

import { useAppDispatch, useAppSelector } from '../../hooks';
import { vaccineSchema } from '../../schemas/vaccineSchema';
import {
  getVaccineThunk,
  createVaccineThunk,
  updateVaccineThunk,
} from '../../slices/vaccineSlice';
import { VACCINE_STAGES } from '../../constants/base.constants';
import {
  PatchVaccinePayload,
  CreateVaccinePayload,
} from '../../interfaces/vaccineInterface';
import { useCallback, useEffect, useState } from 'react';
import { CONTENT_TYPE } from '../../constants/http.constants';
import { showSuccessMessage } from '../../utils/toast';
import { Backdrop, CircularProgress } from '@mui/material';

interface VaccineDialogProps {
  isOpen?: boolean;
  mode: 'create' | 'edit' | 'delete';
  data: CreateVaccinePayload | PatchVaccinePayload;
  onClose: () => void;
}

const VaccineDialog = ({
  isOpen = false,
  mode = 'create',
  onClose,
  data = {
    name: '',
    stage: '',
    allergies: [],
    companyName: '',
    description: '',
    numberOfDoses: 1,
    isMandatory: false,
    image: null,
    imageUrl: null,
  },
}: VaccineDialogProps) => {
  const { isLoading } = useAppSelector((state) => state.vaccine);

  const [allergiesOptions, setAllergiesOptions] = useState<string[]>([]);

  const dispatch = useAppDispatch();

  useEffect(() => {
    setAllergiesOptions([]);
  }, []);

  const formik = useFormik({
    initialValues: data,
    validationSchema: vaccineSchema,
    onSubmit: async () => {
      if (mode === 'create') {
        await dispatch(
          createVaccineThunk(formik.values as CreateVaccinePayload),
        ).unwrap();
        showSuccessMessage('Vaccine Created Sucessfully');
      } else {
        await dispatch(
          updateVaccineThunk(formik.values as PatchVaccinePayload),
        ).unwrap();
        showSuccessMessage('Vaccine Updated Sucessfully');
      }

      onClose();
      formik.resetForm();
      // TODO: Create middleware create and get, updatea and get
      dispatch(getVaccineThunk());
    },
  });

  const FIELDS: FormField[] = [
    {
      type: 'text',
      renderer: 'text',
      id: 'name',
      label: 'Name*',
      errorLabel: formik.errors.name,
      placeholder: 'Enter name',
    },
    {
      renderer: 'dropdown',
      id: 'stage',
      label: 'Stage*',
      dropDownOptions: Object.values(VACCINE_STAGES).map((stage) => ({
        label: stage,
        value: stage,
      })),
      errorLabel: formik.errors.stage,
      placeholder: 'Enter Stage',
    },
    {
      type: 'text',
      renderer: 'textArea',
      id: 'description',
      label: 'Description',
      errorLabel: formik.errors.description,
      placeholder: 'Enter description',
    },
    {
      id: 'allergies',
      renderer: 'autocomplete',
      label: 'Allergies & SideEffects',
      autocompleteOptions: {
        options: allergiesOptions,
        setOptions: (options: string[]) => setAllergiesOptions(options),
        selectedOptions: formik.values.allergies || [],
      },
      placeholder: 'Enter Dose Amount',
      errorLabel: formik.errors.allergies,
    },
    {
      type: 'number',
      id: 'numberOfDoses',
      renderer: 'text',
      errorLabel: formik.errors.numberOfDoses,
      label: 'Number of Doses*',
      placeholder: 'Enter Dose Amount',
    },
    {
      type: 'text',
      id: 'companyName',
      renderer: 'text',
      errorLabel: formik.errors.companyName,
      label: 'Company Name',
      placeholder: 'Enter Company Name',
    },
    {
      renderer: 'checkbox',
      id: 'isMandatory',
      label: 'Is Mandatory',
      errorLabel: formik.errors.isMandatory,
    },
    {
      renderer: 'upload',
      id: 'image',
      label: 'Select Image',
      uploadOptions: {
        acceptedTypes: CONTENT_TYPE.IMAGE,
        existingImageUrl: formik.values.imageUrl,
      },
      errorLabel: formik.errors.isMandatory,
    },
  ];

  const resetFormAndCloseDialog = useCallback(
    function () {
      formik.resetForm();
      onClose();
    },
    [formik, onClose],
  );

  return (
    <Dialog
      open={isOpen}
      isLoading={isLoading}
      onAccept={formik.handleSubmit}
      onClose={resetFormAndCloseDialog}
      isAccceptButtonDisabled={formik.isSubmitting || !formik.isValid}
      heading={mode === 'create' ? 'Create Vaccine' : 'Update Vaccine'}
    >
      <Form
        isLoading={isLoading}
        hasBorder={false}
        fields={FIELDS}
        formikInstance={formik}
      ></Form>
    </Dialog>
  );
};

export default VaccineDialog;
