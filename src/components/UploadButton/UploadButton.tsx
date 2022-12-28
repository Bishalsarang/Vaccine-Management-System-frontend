import { IconButton } from '@mui/material';
import Button from '../Button';

import { PhotoCamera } from '@mui/icons-material';
import { ReactElement } from 'react';

interface UploadButtonProps {
  label?: string;
  icon?: ReactElement;
  acceptTypes?: string;
  allowMultipleSelection?: boolean;
  variant?: 'icon' | 'default';
}

export function UploadButton({
  variant = 'default',
  label = 'Upload',
  acceptTypes = '*.*',
  allowMultipleSelection = false,
  icon = <PhotoCamera />,
}: UploadButtonProps) {
  if (variant === 'icon') {
    return (
      <IconButton color="primary" aria-label="upload picture" component="label">
        <input hidden accept={acceptTypes} type="file" />
        {icon}
      </IconButton>
    );
  }

  return (
    <Button variant="contained" label={label}>
      <input
        hidden
        accept={acceptTypes}
        multiple={allowMultipleSelection}
        type="file"
        onChange={(event) => {
          const files = event.target.files || [];
          const formData = new FormData();
          console.log(files.length);
          for (let i = 0; i < files.length; i++) {
            formData.append('files', files[i]);
          }

          console.log(formData);

          fetch('/upload', {
            method: 'POST',
            body: formData,
          })
            .then((response) => {
              return response.json();
            })
            .then((data) => {
              console.log(data);
            });
        }}
      />
    </Button>
  );
}
