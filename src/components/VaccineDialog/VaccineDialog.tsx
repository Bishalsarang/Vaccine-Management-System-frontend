import { useAppDispatch } from '../../hooks';
import Dialog from '../Dialog';
import Form, { FormField } from '../../components/Form';

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
import { useFormik } from 'formik';

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
    companyName: '',
    description: '',
    numberOfDoses: 1,
    isMandatory: false,
    stage: '',
  },
}: VaccineDialogProps) => {
  const dispatch = useAppDispatch();

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

  formik.dirty = true;
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
      type: 'text',
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
      placeholder: 'Enter Dose Amount',
    },
  ];
  return (
    <Dialog
      isOpen={isOpen}
      onClose={() => {
        formik.resetForm();
        onClose && onClose();
      }}
      heading="Add vacccine"
      onAccept={formik.handleSubmit}
    >
      <Form hasBorder={false} fields={FIELDS} formikInstance={formik}></Form>
    </Dialog>
  );
};

export default VaccineDialog;
