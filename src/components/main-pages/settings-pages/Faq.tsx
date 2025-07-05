"use client";

import { useRef, useState } from "react";
import { Button, Typography, Paper } from "@mui/material";
import dynamic from "next/dynamic";
import { toast } from "sonner";
import AddIcon from "@mui/icons-material/Add";
const JoditEditor = dynamic(() => import("jodit-react"), { ssr: false });

const Faq = () => {
  const [content, setContent] = useState("");
  const editor = useRef(null);

  const config = {
    readonly: false,
    placeholder: "Start typing...",
    style: {
      height: "58vh",
      background: "white",
    },
  };

  return (
    <div>
      <Paper
        sx={{
          borderRadius: "8px",
          padding: "16px 24px",
        }}
        elevation={3}
      >
        <div className="jodit-container">
          <div>
            <JoditEditor
              ref={editor}
              value={content}
              config={config}
              onBlur={(newContent) => setContent(newContent)}
              onChange={() => {}}
            />
          </div>
        </div>
        <div
          style={{
            marginTop: 24,
            marginBottom: 24,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Button
            variant="contained"
            sx={{
              height: 48,
              width: "543px",
              backgroundColor: "#6366f1",
              borderRadius: "8px",
              textTransform: "none",
              fontSize: "16px",
              "&:hover": {
                backgroundColor: "#1589b5",
              },
            }}
            startIcon={<AddIcon />}
          >
            Save Changes
          </Button>
        </div>
      </Paper>
    </div>
  );
};

export default Faq;
