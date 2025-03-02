import * as React from 'react';
import IconButton from '@mui/material/IconButton';
import Stack from '@mui/material/Stack';
import AddIcon from '@mui/icons-material/Add';

export default function AddIconButton() {
    return (
      <Stack direction="row" spacing={1}>
        <IconButton aria-label="delete">
          <AddIcon />
        </IconButton>
      </Stack>
    );
  }