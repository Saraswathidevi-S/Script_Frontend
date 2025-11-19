import React from 'react';
import {
    Box,
    Typography,
    Button,
    IconButton,
    Snackbar,
    Alert,
    Dialog,
    Tooltip,
    Menu,
    MenuItem
} from "@mui/material";

import Editor from '@monaco-editor/react';
import EditIcon from '@mui/icons-material/Edit';
import FileIcon from '@mui/icons-material/FilePresent';
import FolderIcon from '@mui/icons-material/FolderOpen';
import type { ScriptItem } from "../data/scripts";
import EditScriptForm from "../components/EditScriptForm";

interface ScriptDetailsProps {
    script: ScriptItem;
    onUpdate?: (updated: ScriptItem) => void;
}

const ScriptDetails: React.FC<ScriptDetailsProps> = ({ script, onUpdate }) => {
const initialEditor = `# Python script for ${script.scriptName}
# Procedure: ${script.procedureName}
# You can access Example scripts from the Templates menu (folder icon) or open a local .py file using the file icon.
`;

    const [editorContent, setEditorContent] = React.useState<string>(initialEditor);
    const [snack, setSnack] = React.useState({
        open: false,
        message: '',
        severity: "info" as 'success' | 'info' | 'error'
    });

    const [openEdit, setOpenEdit] = React.useState(false);

    // TEMPLATE 
    const [templateAnchor, setTemplateAnchor] = React.useState<null | HTMLElement>(null);
    const loadTemplate = async (fileName: string) => {
        try {
            const response = await fetch(`/templates/${fileName}`);
            const text = await response.text();
            setEditorContent(text);
        } catch (err) {
            console.error("Error loading template", err);
        }
    };

    // FILE OPEN HANDLER
    const handleFileOpen = () => {
        const input = document.createElement("input");
        input.type = "file";
        input.accept = ".py";

        input.onchange = async (e: any) => {
            const file = e.target.files[0];
            if (!file) return;

            const text = await file.text();
            setEditorContent(text);
        };

        input.click();
    };
    const openTemplateMenu = (e: React.MouseEvent<HTMLButtonElement>) => {
        setTemplateAnchor(e.currentTarget);
    };

    const closeTemplateMenu = () => {
        setTemplateAnchor(null);
    };

    // SAVE HANDLER
    const handleUpdate = () => {
        setSnack({
            open: true,
            message: 'Script updated successfully.',
            severity: 'success'
        });
    };

    const handleOpenEdit = () => setOpenEdit(true);
    const handleCloseEdit = () => setOpenEdit(false);

    const handleSaveEdit = (data: { scriptName: string; procedureName: string }) => {
        const updated: ScriptItem = {
            ...script,
            scriptName: data.scriptName,
            procedureName: data.procedureName
        };

        if (onUpdate) onUpdate(updated);

        setSnack({
            open: true,
            message: 'Script details updated',
            severity: 'success'
        });

        setOpenEdit(false);
    };

    const handleCloseSnack = () => setSnack(s => ({ ...s, open: false }));


    return (
        <Box p={3} width="100%">

            {/* HEADER PANEL */}
            <Box
                mb={3}
                sx={{
                    p: 2,
                    borderRadius: 2,
                    backgroundColor: "#fff",
                    boxShadow: "0 2px 6px rgba(0,0,0,0.05)"
                }}
            >

                {/* Labels */}
                <Box
                    display="grid"
                    gridTemplateColumns="1fr 2fr 2fr 1fr 1fr 1fr"
                    alignItems="center"
                    mb={0.5}
                >
                    <Typography variant="caption" color="text.secondary">Script ID</Typography>
                    <Typography variant="caption" color="text.secondary">Script</Typography>
                    <Typography variant="caption" color="text.secondary">Procedure Name</Typography>
                    <Typography variant="caption" color="text.secondary">Created By</Typography>
                </Box>

                {/* Values */}
                <Box
                    display="grid"
                    gridTemplateColumns="1fr 2fr 2fr 1fr 1fr 1fr"
                    alignItems="center"
                    gap={1}
                >
                    <Typography variant="body1" fontWeight={600}>{script.id}</Typography>
                    <Typography variant="body1" fontWeight={600}>{script.scriptName}</Typography>
                    <Typography variant="body1" fontWeight={600}>{script.procedureName}</Typography>
                    <Typography variant="body1">{script.createdBy}</Typography>

                    <Button
                        startIcon={<EditIcon />}
                        onClick={handleOpenEdit}
                        sx={{
                            textTransform: "none",
                            color: "black",
                            "&:hover": { background: "#f0f0f0" }
                        }}
                    >
                        Edit
                    </Button>

                    <Button
                        sx={{
                            textTransform: "none",
                            backgroundColor: "#FFC60B",
                            color: "black",
                            "&:hover": { backgroundColor: "#e6b307" }
                        }}
                        onClick={handleUpdate}
                    >
                        Save
                    </Button>

                </Box>
            </Box>


            {/* SCRIPT EDITOR */}
            <Box mt={3}>
                <Typography variant="h6" fontWeight={700} mb={1}>
                    Script Editor
                </Typography>

                {/* Toolbar */}
                <Box display="flex" alignItems="center" gap={1.5} pb={1} pl={0.5}>

                    {/* Templates */}
                    <Tooltip title="Examples">
                        <IconButton size="small" onClick={openTemplateMenu}>
                            <FolderIcon sx={{ fontSize: 22 }} />
                        </IconButton>
                    </Tooltip>

                    {/* Open File */}
                    <Tooltip title="Open Python File">
                        <IconButton size="small" onClick={handleFileOpen}>
                            <FileIcon sx={{ fontSize: 22 }} />
                        </IconButton>
                    </Tooltip>

                </Box>

                {/* TEMPLATE POPUP MENU */}
                <Menu
                    anchorEl={templateAnchor}
                    open={Boolean(templateAnchor)}
                    onClose={closeTemplateMenu}
                >
                    <MenuItem onClick={() => { loadTemplate("average.py"); closeTemplateMenu(); }}>
                        Average
                    </MenuItem>

                    <MenuItem onClick={() => { loadTemplate("minimum.py"); closeTemplateMenu(); }}>
                        Minimum
                    </MenuItem>

                    <MenuItem onClick={() => { loadTemplate("maximum.py"); closeTemplateMenu(); }}>
                        Maximum
                    </MenuItem>
                </Menu>

                {/* Editor */}
                <Box
                    sx={{
                        border: "1px solid #d1d1d1",
                        borderRadius: "12px",
                        overflow: "hidden",
                        boxShadow: "0 1px 3px rgba(0,0,0,0.08)"
                    }}
                >
                    <Editor
                        height="65vh"
                        defaultLanguage="python"
                        value={editorContent}
                        onChange={val => setEditorContent(val ?? "")}
                        options={{
                            minimap: { enabled: false },
                            fontSize: 14,
                            padding: { top: 12 }
                        }}
                    />
                </Box>


                {/* Snackbar */}
                <Snackbar
                    open={snack.open}
                    autoHideDuration={2500}
                    onClose={handleCloseSnack}
                    anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
                >
                    <Alert severity={snack.severity} sx={{ width: "100%" }}>
                        {snack.message}
                    </Alert>
                </Snackbar>

            </Box>


            {/* EDIT MODAL */}
            <Dialog open={openEdit} onClose={handleCloseEdit} fullWidth maxWidth="sm">
                <EditScriptForm
                    initialScriptName={script.scriptName}
                    initialProcedureName={script.procedureName}
                    onSave={handleSaveEdit}
                    onCancel={handleCloseEdit}
                />
            </Dialog>

        </Box>
    );
};

export default ScriptDetails;
