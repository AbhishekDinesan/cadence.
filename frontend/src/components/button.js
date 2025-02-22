import * as React from 'react';
import Button from '@mui/material/Button';
//https://mui.com/material-ui/react-button/

export default function GenericButton({text, style="contained"}) {
  return (
    <>
    <Button variant={style}>{text}</Button>
    </>
  )
}