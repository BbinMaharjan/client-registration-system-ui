import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";
import LoadingButton from "@mui/lab/LoadingButton";
import {
  Dialog,
  DialogActions,
  DialogContent,
  Typography,
  styled,
} from "@mui/material";
import React from "react";
import AnimateButton from "../extended/animateButton";

interface ModelProps {
  open: boolean;
  onConfirm: () => void;
  closeModal: () => void;
}
const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));

const DeleteModal = React.memo(
  ({
    open,
    onConfirm,
    closeModal,
    ...reset
  }: ModelProps): React.JSX.Element => {
    const handleCancel = (): void => {
      closeModal();
    };

    return (
      <BootstrapDialog
        onClose={() => {
          closeModal();
        }}
        aria-labelledby="customized-dialog-title"
        open={open}
      >
        <DialogContent>
          <Typography>{`Are you sure you want to delete?`}</Typography>
        </DialogContent>
        <DialogActions>
          <AnimateButton>
            <LoadingButton
              variant="outlined"
              id="cancel"
              disableElevation
              fullWidth
              size="small"
              type="button"
              loadingPosition="start"
              onClick={handleCancel}
              startIcon={<CloseIcon />}
              {...reset}
            >
              Cancel
            </LoadingButton>
          </AnimateButton>
          <AnimateButton>
            <LoadingButton
              variant="contained"
              id="confirm"
              disableElevation
              fullWidth
              size="small"
              color={"secondary"}
              type="button"
              onClick={onConfirm}
              startIcon={<CheckIcon />}
              {...reset}
            >
              Confirm
            </LoadingButton>
          </AnimateButton>
        </DialogActions>
      </BootstrapDialog>
    );
  }
);
export default DeleteModal;
