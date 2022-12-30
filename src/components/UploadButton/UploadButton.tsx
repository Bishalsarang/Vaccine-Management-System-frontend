import { ReactElement, useEffect, useState } from 'react';

import { Box, IconButton } from '@mui/material';
import { PhotoCamera } from '@mui/icons-material';

import Button from '../Button';

interface UploadButtonProps {
  label?: string;
  icon?: ReactElement;
  acceptTypes?: string;
  allowMultipleSelection?: boolean;
  variant?: 'icon' | 'default';
  file: File;
  imageUrl: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export function UploadButton({
  onBlur,
  onChange,
  file,
  imageUrl = '',
  label = 'Upload',
  variant = 'default',
  acceptTypes = '*.*',
  icon = <PhotoCamera />,
  allowMultipleSelection = false,
}: UploadButtonProps) {
  const [src, setSrc] = useState('/no-image.jpg');

  useEffect(() => {
    if (imageUrl) {
      setSrc(imageUrl);
    }

    if (file) {
      setSrc(URL.createObjectURL(file));
    }
  }, [imageUrl, file]);

  if (variant === 'icon') {
    return (
      <IconButton color="primary" aria-label="upload picture" component="label">
        {renderHiddenInput()}
        <span>{label}</span>
        {icon}
      </IconButton>
    );
  }

  return (
    <div>
      <div>
        <Button variant="contained" label={label}>
          {renderHiddenInput()}
        </Button>
      </div>
      {showFileStatus()}
    </div>
  );

  function showFileStatus() {
    return (
      <Box
        src={src}
        component="img"
        className="shadow-lg"
        sx={{ height: '150px', width: 'auto', maxWidth: '150px' }}
      />
    );
  }

  function renderHiddenInput() {
    return (
      <input
        hidden
        type="file"
        onBlur={onBlur}
        onChange={onChange}
        accept={acceptTypes}
        multiple={allowMultipleSelection}
      />
    );
  }
}
