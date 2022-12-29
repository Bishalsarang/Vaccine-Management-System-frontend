import { useFormik } from 'formik';

import Dialog from '../Dialog';
import Form, { FormField } from '../../components/Form';

import { useAppDispatch } from '../../hooks';
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
import { useEffect, useState } from 'react';

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
  },
}: VaccineDialogProps) => {
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
        );
      } else {
        await dispatch(
          updateVaccineThunk(formik.values as PatchVaccinePayload),
        );
      }

      onClose();
      formik.resetForm();
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
  ];

  return (
    <Dialog
      open={isOpen}
      onClose={() => {
        formik.resetForm();
        onClose && onClose();
      }}
      heading={mode === 'create' ? 'Create Vaccine' : 'Update Vaccine'}
      onAccept={formik.handleSubmit}
    >
      <Form hasBorder={false} fields={FIELDS} formikInstance={formik}></Form>
    </Dialog>
  );
};

export default VaccineDialog;
