import { useFormik } from 'formik';

import Dialog from '../Dialog';
import Form, { FormField } from '../../components/Form';

interface VaccineDialogProps {
  isOpen?: boolean;
  onClose?: () => void;
}

const VaccineDialog = ({ isOpen = false, onClose }: VaccineDialogProps) => {
  const formik = useFormik({
    initialValues: {
      name: '',
      description: '',
      numberOfDoses: 1,
      isMandatory: false,
    },

    onSubmit: () => {
      console.log('test');
      formik.resetForm();

      // TODO: handle the submit here
    },
  });

  const FIELDS: FormField[] = [
    {
      type: 'text',
      renderer: 'text',
      id: 'name',
      label: 'Name*',
      placeholder: 'Enter name',
    },
    {
      type: 'text',
      renderer: 'textArea',
      id: 'description',
      label: 'Description*',
      placeholder: 'Enter description',
    },
    {
      type: 'number',
      id: 'numberOfDoses',
      renderer: 'text',
      label: 'Number of Doses*',
      placeholder: 'Enter Dose Amount',
    },
    {
      renderer: 'checkbox',
      id: 'isMandatory',
      label: 'Is Mandatory*',
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
