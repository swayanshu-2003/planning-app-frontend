/* eslint-disable react/destructuring-assignment */
import * as React from 'react';

import Slide from '@mui/material/Slide';
import Dialog from '@mui/material/Dialog';
import { type TransitionProps } from '@mui/material/transitions';

const Transition = React.forwardRef(
  (
    props: TransitionProps & {
      children: React.ReactElement<any, any>;
    },
    ref: React.Ref<unknown>
  ) => <Slide direction="down" ref={ref} {...props} />
);

interface props {
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  open: boolean;
  children: React.ReactNode;

  fullWidth?: boolean;
}

/*
 * @param {Object} props - The component props.
 * @param {React.Dispatch<React.SetStateAction<boolean>>} props.setOpen - A function to update the state of the dialog's open status.
 * @param {boolean} props.open - A boolean value indicating whether the dialog is open or closed.
 * @param {React.ReactNode} props.children - The content to be displayed inside the dialog.
 * @param {string} [props.width] - A string representing the width of the dialog.
 * @returns {JSX.Element} - The rendered component.
 */

export default function SlideInModel(props: props) {
  const handleClose = () => {
    props.setOpen(false);
  };

  const handleDialogClose = (event: React.SyntheticEvent, reason: string) => {
    if (reason !== 'backdropClick') {
      // Prevent closing when clicking outside the Dialog
      handleClose();
    }
  };

  return (
    <Dialog
      fullWidth={props.fullWidth}
      maxWidth="xl"
      sx={{
        borderRadius: 20,
        zIndex: 999,
      }}
      PaperProps={{
        style: { borderRadius: 8 },
      }}
      onKeyDown={(e) => {
        if (e.key === 'Escape') {
          props.setOpen(false);
        }
      }}
      open={props.open}
      TransitionComponent={Transition}
      transitionDuration={330}
      disableEscapeKeyDown
      keepMounted
      onClose={handleDialogClose}
      aria-describedby="alert-dialog-slide-description"
    >
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        {props.children}
      </div>
    </Dialog>
  );
}
