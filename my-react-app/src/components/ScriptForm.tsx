import React, { useState } from "react";
import { Box, TextField, Typography, Button, Paper } from "@mui/material";

interface ScriptFormProps {
    onClose: () => void;
}

const CreateScriptForm: React.FC<ScriptFormProps> = ({ onClose }) => {
    const [scriptName, setScriptName] = useState("");
    const [procedureName, setProcedureName] = useState("");

    const handleCancel = () => {
        setScriptName("");
        setProcedureName("");
        onClose();
    };

    const handleCreate = () => {
        if (!scriptName.trim()) {
            alert("Script Name is required");
            return;
        }

        alert("Script Created Successfully!");
        onClose();
    };

    return (
        <Box
            width="100%"
            display="flex"
            justifyContent="center"
            alignItems="center"
            m={0}
            p={0}
            sx={{ px: 0 }}
        >
            <Paper
                sx={{
                    width: "100%",
                    maxWidth: "100%",
                    boxSizing: "border-box",
                    p: 3,
                    borderRadius: "12px",
                    mx: 0,
                }}
            >
                <Typography variant="h6" fontWeight="bold" mb={1.5}>
                    Create Script
                </Typography>

                <Typography fontSize="14px" fontWeight="500" mb={1}>
                    Script Name <span style={{ color: "red" }}>*</span>
                </Typography>
                <TextField
                    placeholder="Enter script name"
                    fullWidth
                    required
                    size="small"
                    value={scriptName}
                    onChange={(e) => setScriptName(e.target.value)}
                    sx={{ mb: 2 }}
                />

                <Typography fontSize="14px" fontWeight="500" mb={1}>
                    Procedure Name
                </Typography>
                <TextField
                    placeholder="Enter procedure name"
                    fullWidth
                    size="small"
                    value={procedureName}
                    onChange={(e) => setProcedureName(e.target.value)}
                    sx={{ mb: 3 }}
                />

                <Box display="flex" justifyContent="flex-end" gap={2}>
                    <Button onClick={handleCancel} sx={{ textTransform: "none" }}>
                        Cancel
                    </Button>

                    <Button
                        variant="contained"
                        onClick={handleCreate}
                        sx={{
                            backgroundColor: "#ffc60b",
                            color: "black",
                            fontWeight: "bold",
                            textTransform: "none",
                            "&:hover": { backgroundColor: "#e0ad00" },
                        }}
                    >
                        Create
                    </Button>
                </Box>
            </Paper>
        </Box>
    );
};

export default CreateScriptForm;
