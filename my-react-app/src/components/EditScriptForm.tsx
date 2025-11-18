import React, { useState } from "react";
import { Box, TextField, Typography, Button, Paper } from "@mui/material";

interface EditScriptFormProps {
    initialScriptName?: string;
    initialProcedureName?: string;
    onSave: (data: { scriptName: string; procedureName: string }) => void;
    onCancel: () => void;
}

const EditScriptForm: React.FC<EditScriptFormProps> = ({ initialScriptName = "", initialProcedureName = "", onSave, onCancel }) => {
    const [scriptName, setScriptName] = useState(initialScriptName);
    const [procedureName, setProcedureName] = useState(initialProcedureName);

    const handleSave = () => {
        if (!scriptName.trim()) {
            alert("Script Name is required");
            return;
        }
        onSave({ scriptName: scriptName.trim(), procedureName: procedureName.trim() });
    };

    return (
        <Box width="100%" display="flex" justifyContent="center" alignItems="center" p={0}>
            <Paper sx={{ width: "100%", maxWidth: 640, p: 3, borderRadius: 2 }}>
                <Typography variant="h6" fontWeight="bold" mb={1.5}>
                    Edit Script
                </Typography>

                <Typography fontSize="14px" fontWeight={500} mb={1}>
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

                <Typography fontSize="14px" fontWeight={500} mb={1}>
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
                    <Button onClick={onCancel} sx={{ textTransform: "none" }}>
                        Cancel
                    </Button>

                    <Button
                        variant="contained"
                        onClick={handleSave}
                        sx={{
                            backgroundColor: "#ffc60b",
                            color: "black",
                            fontWeight: "bold",
                            textTransform: "none",
                            "&:hover": { backgroundColor: "#e0ad00" },
                        }}
                    >
                        Save
                    </Button>
                </Box>
            </Paper>
        </Box>
    );
};

export default EditScriptForm;
