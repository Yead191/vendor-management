"use client";

import React, { useState } from "react";
import {
  Box,
  Typography,
  Button,
  Checkbox,
  Modal,
  TextField,
  Divider,
  IconButton,
  Tooltip,
  Paper,
} from "@mui/material";
import {
  Add as AddIcon,
  Edit as EditIcon,
  DeleteOutline as DeleteOutlineIcon,
  Close as CloseIcon,
} from "@mui/icons-material";
import { toast } from "sonner";
import FaqModal from "./FaqModal";

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

const Faq: React.FC = () => {
  const [faqItems, setFaqItems] = useState<FAQItem[]>([
    {
      id: "1",
      title: "Our Story",
      content:
        "convallis. Praesent felis, placerat Ut ac quis dui volutpat vitae elementum quis adipiscing malesuada tempor non ipsum non, nec vitae amet, Donec tincidunt efficitur. In In ipsum Cras turpis viverra laoreet ullamcorper placerat diam sed leo. faucibus vitae eget vitae vehicula, luctus id Lorem fringilla tempor faucibus ipsum Vestibulum tincidunt ullamcorper elit diam turpis placerat vitae Nunc vehicula, ex faucibus venenatis at, maximus commodo urna. Nam ex quis sit non vehicula, massa urna at",
      selected: false,
    },
    {
      id: "2",
      title: "When to use Doctor For You",
      content:
        "convallis. Praesent felis, placerat Ut ac quis dui volutpat vitae elementum quis adipiscing malesuada tempor non ipsum non, nec vitae amet, Donec tincidunt efficitur. In In ipsum Cras turpis viverra laoreet ullamcorper placerat diam sed leo. faucibus vitae eget vitae vehicula, luctus id Lorem fringilla tempor faucibus ipsum Vestibulum tincidunt ullamcorper elit diam turpis placerat vitae Nunc vehicula, ex faucibus venenatis at, maximus commodo urna. Nam ex quis sit non vehicula, massa urna at",
      selected: false,
    },
    {
      id: "3",
      title: "Our Mission",
      content:
        "convallis. Praesent felis, placerat Ut ac quis dui volutpat vitae elementum quis adipiscing malesuada tempor non ipsum non, nec vitae amet, Donec tincidunt efficitur. In In ipsum Cras turpis viverra laoreet ullamcorper placerat diam sed leo. faucibus vitae eget vitae vehicula, luctus id Lorem fringilla tempor faucibus ipsum Vestibulum tincidunt ullamcorper elit diam turpis placerat vitae Nunc vehicula, ex faucibus venenatis at, maximus commodo urna. Nam ex quis sit non vehicula, massa urna at",
      selected: false,
    },
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<FAQItem | null>(null);
  const [deletingItem, setDeletingItem] = useState<FAQItem | null>(null);
  const [formValues, setFormValues] = useState<FormValues>({
    title: "",
    content: "",
  });
  const [errors, setErrors] = useState<{ title?: string; content?: string }>(
    {}
  );

  const handleAddContent = () => {
    setEditingItem(null);
    setFormValues({ title: "", content: "" });
    setErrors({});
    setIsModalOpen(true);
  };

  const handleEdit = (item: FAQItem) => {
    setEditingItem(item);
    setFormValues({ title: item.title, content: item.content });
    setErrors({});
    setIsModalOpen(true);
  };

  const handleDelete = (item: FAQItem) => {
    setDeletingItem(item);
    setIsDeleteModalOpen(true);
  };

  const confirmDelete = () => {
    if (deletingItem) {
      setFaqItems(faqItems.filter((item) => item.id !== deletingItem.id));
      toast.success("FAQ item deleted successfully");
      setIsDeleteModalOpen(false);
      setDeletingItem(null);
    }
  };

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
      setFaqItems(
        faqItems.map((item) =>
          item.id === editingItem.id
            ? { ...item, title: formValues.title, content: formValues.content }
            : item
        )
      );
      toast.success("FAQ item updated successfully");
    } else {
      const newItem: FAQItem = {
        id: Date.now().toString(),
        title: formValues.title,
        content: formValues.content,
        selected: false,
      };
      setFaqItems([...faqItems, newItem]);
      toast.success("FAQ item added successfully");
    }
    setIsModalOpen(false);
    setFormValues({ title: "", content: "" });
    setEditingItem(null);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setFormValues({ title: "", content: "" });
    setErrors({});
    setEditingItem(null);
  };

  const handleCheckboxChange = (id: string, checked: boolean) => {
    setFaqItems(
      faqItems.map((item) =>
        item.id === id ? { ...item, selected: checked } : item
      )
    );
  };

  const renderFAQItem = (item: FAQItem) => (
    <Box key={item.id} sx={{ mb: 2 }}>
      <Paper
        sx={{
          display: "flex",
          alignItems: "flex-start",
          border: "1px solid #e0e0e0",
          borderRadius: 2,
          p: 2,
        }}
      >
        <Checkbox
          checked={item.selected}
          onChange={(e) => handleCheckboxChange(item.id, e.target.checked)}
          sx={{ mr: 1.5, mt: 1.5 }}
        />
        <Box sx={{ flex: 1 }}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "flex-start",
              mb: 1.5,
              gap: 2.5,
            }}
          >
            <Box sx={{ width: "100%" }}>
              <Typography
                variant="h6"
                sx={{
                  boxShadow: 1,
                  borderRadius: 2,
                  p: 1,
                  bgcolor: "#F9F9F9",
                  color: "#666",
                  mb: 1,
                }}
              >
                {item.title}
              </Typography>
              <Typography
                variant="body2"
                sx={{
                  boxShadow: 1,
                  borderRadius: 2,
                  p: 1,
                  bgcolor: "#F9F9F9",
                  color: "#888",
                  fontSize: 14,
                  lineHeight: 1.6,
                }}
              >
                {item.content}
              </Typography>
            </Box>
            <Box sx={{ display: "flex", flexDirection: "column", gap: 0.5 }}>
              <Tooltip title="Edit">
                <IconButton
                  onClick={() => handleEdit(item)}
                  sx={{ color: "#58553A" }}
                >
                  <EditIcon />
                </IconButton>
              </Tooltip>
              <Tooltip title="Delete">
                <IconButton
                  onClick={() => handleDelete(item)}
                  sx={{ color: "#58553A" }}
                >
                  <DeleteOutlineIcon />
                </IconButton>
              </Tooltip>
            </Box>
          </Box>
        </Box>
      </Paper>
    </Box>
  );

  return (
    <Box
      sx={{
        bgcolor: "#fff",
        borderRadius: 2,
        p: 2,
      }}
    >
      <Box sx={{ p: 2, pb: 4 }}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "flex-end",
            alignItems: "center",
          }}
        >
          <Button
            onClick={handleAddContent}
            variant="contained"
            startIcon={<AddIcon />}
            sx={{
              bgcolor: "#6366f1",
            }}
          >
            Add FAQ
          </Button>
        </Box>
        <Box sx={{ height: "70vh", overflowY: "auto", pb: 3, mt: 1.5 }}>
          {faqItems.map(renderFAQItem)}
        </Box>

        {/* Add/Edit Modal */}
        <FaqModal
          isModalOpen={isModalOpen}
          handleModalClose={handleModalClose}
          formValues={formValues}
          setFormValues={setFormValues}
          editingItem={editingItem}
        />

        {/* Delete Confirmation Modal */}
        <Modal
          open={isDeleteModalOpen}
          onClose={() => {
            setIsDeleteModalOpen(false);
            setDeletingItem(null);
          }}
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Box
            sx={{
              width: 350,
              bgcolor: "background.paper",
              borderRadius: 2,
              p: 2.5,
              textAlign: "center",
            }}
          >
            <Typography
              variant="h6"
              sx={{ color: "#ff4d4f", fontSize: 16, fontWeight: 600, mb: 1.5 }}
            >
              Are you sure!
            </Typography>
            <Typography sx={{ color: "#666", fontSize: 14, mb: 3 }}>
              Do you want to Delete a FAQ item
            </Typography>
            <Box sx={{ display: "flex", gap: 1.5, justifyContent: "center" }}>
              <Button
                onClick={() => {
                  setIsDeleteModalOpen(false);
                  setDeletingItem(null);
                }}
                variant="outlined"
                sx={{
                  borderColor: "#52c41a",
                  color: "#52c41a",
                  borderRadius: 1.5,
                  p: "6px 20px",
                  fontSize: 14,
                  textTransform: "none",
                }}
              >
                Cancel
              </Button>
              <Button
                onClick={confirmDelete}
                variant="contained"
                sx={{
                  bgcolor: "#ff4d4f",
                  borderRadius: 1.5,
                  p: "6px 20px",
                  fontSize: 14,
                  textTransform: "none",
                  "&:hover": { bgcolor: "#e64446" },
                }}
              >
                Confirm
              </Button>
            </Box>
          </Box>
        </Modal>
      </Box>
    </Box>
  );
};

export default Faq;
