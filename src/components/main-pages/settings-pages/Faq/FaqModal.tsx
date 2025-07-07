import React, { useState } from "react";
import {
  Box,
  Typography,
  Button,
  Modal,
  TextField,
  Divider,
  IconButton,
} from "@mui/material";
import {
  Add as AddIcon,
  Edit as EditIcon,
  DeleteOutline as DeleteOutlineIcon,
  Close as CloseIcon,
} from "@mui/icons-material";
import { toast } from "sonner";

interface FaqModalProps {
  isModalOpen: boolean;
  handleModalClose: () => void;
  formValues: FormValues;
  setFormValues: React.Dispatch<React.SetStateAction<FormValues>>;
  editingItem: any;
}

interface FAQItem {
  id: string;
  title: string;
  content: string;
  selected: boolean;
}

interface FormValues {
  title: string;
  content: string;
}
export default function FaqModal({
  isModalOpen,
  handleModalClose,
  formValues,
  setFormValues,
  editingItem,
}: FaqModalProps) {
  const [errors, setErrors] = useState<{ title?: string; content?: string }>(
    {}
  );

  const handleFormChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormValues((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const validateForm = () => {
    const newErrors: { title?: string; content?: string } = {};
    if (!formValues.title.trim()) {
      newErrors.title = "Please enter a title";
    }
    if (!formValues.content.trim()) {
      newErrors.content = "Please enter content";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleModalOk = () => {
    if (!validateForm()) return;

    if (editingItem) {
      toast.success("FAQ item updated successfully");
    } else {
      const newItem: FAQItem = {
        id: Date.now().toString(),
        title: formValues.title,
        content: formValues.content,
        selected: false,
      };
      console.log(newItem);
      toast.success("FAQ item added successfully");
    }
    handleModalClose();
    setFormValues({ title: "", content: "" });
    setFormValues({ title: "", content: "" });
    // setEditingItem(null); // No longer needed, since editingItem is a prop
  };
  return (
    <Modal
      open={isModalOpen}
      onClose={handleModalClose}
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Box
        sx={{
          width: 537,
          bgcolor: "background.paper",
          borderRadius: 2,
          p: 2,
          position: "relative",
        }}
      >
        <IconButton
          onClick={handleModalClose}
          sx={{ position: "absolute", top: 8, right: 8, color: "#999" }}
        >
          <CloseIcon />
        </IconButton>
        <Typography variant="h6" sx={{ fontWeight: 600, color: "#333", mb: 3 }}>
          {editingItem ? "Edit" : "Add"} FAQ
        </Typography>
        <Divider sx={{ mb: 3, bgcolor: "#e8e8e8" }} />
        <TextField
          name="title"
          label="Question"
          value={formValues.title}
          onChange={handleFormChange}
          fullWidth
          placeholder="Write Faq question here"
          sx={{ mb: 2.5 }}
          error={!!errors.title}
          helperText={errors.title}
        />
        <TextField
          name="content"
          label="Answer"
          value={formValues.content}
          onChange={handleFormChange}
          fullWidth
          multiline
          rows={10}
          placeholder="Write Faq answer here"
          sx={{ mb: 4 }}
          error={!!errors.content}
          helperText={errors.content}
        />
        <Button
          onClick={handleModalOk}
          variant="contained"
          fullWidth
          sx={{
            bgcolor: "#6366f1",
          }}
        >
          Save & Change
        </Button>
      </Box>
    </Modal>
  );
}
