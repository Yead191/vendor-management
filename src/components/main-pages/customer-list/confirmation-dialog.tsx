"use client";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  Box,
  Alert,
} from "@mui/material";
import { Warning as WarningIcon } from "@mui/icons-material";

interface ConfirmationDialogProps {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
  severity?: "warning" | "error" | "info";
  customerName?: string;
}

export default function ConfirmationDialog({
  open,
  onClose,
  onConfirm,
  title,
  message,
  confirmText = "Confirm",
  cancelText = "Cancel",
  severity = "warning",
  customerName,
}: ConfirmationDialogProps) {
  const handleConfirm = () => {
    onConfirm();
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <WarningIcon color={severity} />
          <Typography variant="h6">{title}</Typography>
        </Box>
      </DialogTitle>
      <DialogContent>
        <Alert severity={severity} sx={{ mb: 2 }}>
          {message}
        </Alert>
        {customerName && (
          <Box sx={{ mt: 2, p: 2, bgcolor: "grey.50", borderRadius: 1 }}>
            <Typography variant="body2" color="text.secondary">
              Customer to be affected:
            </Typography>
            <Typography variant="body1" fontWeight="medium">
              {customerName}
            </Typography>
          </Box>
        )}
        <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>
          This action cannot be undone. Please confirm that you want to proceed.
        </Typography>
      </DialogContent>
      <DialogActions sx={{ px: 3, pb: 2 }}>
        <Button onClick={onClose} color="inherit">
          {cancelText}
        </Button>
        <Button
          onClick={handleConfirm}
          variant="contained"
          color={severity === "error" ? "error" : "warning"}
        >
          {confirmText}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
