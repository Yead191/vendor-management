import React from "react";
import {
  Box,
  Typography,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
} from "@mui/material";
export default function VendorDelete({
  open,
  setOpen,
  handleConfirmDelete,
}: {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  handleConfirmDelete: () => void;
}) {
  return (
    <Dialog
      open={open}
      maxWidth="xs"
      fullWidth
      onClose={() => setOpen(false)}
      aria-labelledby="dialog-title"
      slotProps={{
        paper: {
          sx: {
            borderRadius: "15px",
          },
        },
      }}
    >
      <DialogTitle
        id="dialog-title"
        sx={{ fontSize: "1.2rem", textAlign: "center" }}
      >
        Confirm Delete
      </DialogTitle>
      <DialogContent>
        <DialogContentText sx={{ textAlign: "center" }}>
          Are you sure you want to delete this{" "}
          <Typography
            component="span"
            sx={{ fontWeight: "bold", color: "primary.main" }}
          >
            Vendor
          </Typography>{" "}
        </DialogContentText>
      </DialogContent>
      <DialogActions sx={{ p: 0, borderTop: "1px solid #ccc" }}>
        <Box sx={{ flex: 1 }} display="flex" justifyContent="center">
          <Button
            fullWidth
            variant="text"
            sx={{ p: 1.5 }}
            onClick={() => setOpen(false)}
          >
            Cancel
          </Button>
        </Box>
        <Box
          sx={{ flex: 1, borderLeft: "1px solid #ccc" }}
          display="flex"
          justifyContent="center"
        >
          <Button
            fullWidth
            variant="text"
            color="error"
            sx={{ p: 1.5 }}
            onClick={handleConfirmDelete}
          >
            Yes
          </Button>
        </Box>
      </DialogActions>
    </Dialog>
  );
}
