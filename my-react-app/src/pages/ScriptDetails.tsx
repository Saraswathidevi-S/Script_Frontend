import React from 'react';
import { Box, Typography, Select, MenuItem, InputLabel, FormControl, IconButton, Divider, Button, Snackbar, Alert, Paper } from "@mui/material";
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import SaveIcon from '@mui/icons-material/Save';
import Editor from '@monaco-editor/react';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import EditIcon from '@mui/icons-material/Edit';
import type { ScriptItem } from "../data/scripts";
import EditScriptForm from "../components/EditScriptForm";
import Dialog from '@mui/material/Dialog';

interface ScriptDetailsProps {
    script: ScriptItem;
    onBack: () => void;
    onUpdate?: (updated: ScriptItem) => void;
}

interface ScriptDetailsProps {
    script: ScriptItem;
    onBack: () => void;
}

const ScriptDetails: React.FC<ScriptDetailsProps> = ({ script, onBack, onUpdate }) => {
    const [action, setAction] = React.useState<string>("option1");
    const initialEditor = `-- ${script.scriptName}\n-- Procedure: ${script.procedureName}\n\nSELECT * FROM your_table;`;
    const [editorContent, setEditorContent] = React.useState<string>(initialEditor);
    const [snack, setSnack] = React.useState<{ open: boolean; message: string; severity?: 'success' | 'info' | 'error' }>({ open: false, message: '', severity: 'info' });
    const [runOutput, setRunOutput] = React.useState<string | null>(null);

    const handleRun = () => {
        // placeholder run action
        console.log('Running script:\n', editorContent);
        // Simulate output — replace with real execution result from API
        const simulated = `-- Execution result for ${script.scriptName}\nRows returned: 3\n\nid | name | status\n1  | Alice | OK\n2  | Bob   | OK\n3  | Carol | OK`;
        setRunOutput(simulated);
        setSnack({ open: true, message: 'Script executed', severity: 'success' });
    };

    const handleUpdate = () => {
        // placeholder update action (e.g., save)
        console.log('Updating script with content:\n', editorContent);
        setSnack({ open: true, message: 'Script updated', severity: 'success' });
    };

    // Edit dialog state
    const [openEdit, setOpenEdit] = React.useState(false);

    const handleOpenEdit = () => setOpenEdit(true);
    const handleCloseEdit = () => setOpenEdit(false);

    const handleSaveEdit = (data: { scriptName: string; procedureName: string }) => {
        // update displayed script
        const updated: ScriptItem = { ...script, scriptName: data.scriptName, procedureName: data.procedureName };
        if (onUpdate) onUpdate(updated);
        setSnack({ open: true, message: 'Script details updated', severity: 'success' });
        setOpenEdit(false);
    };

    const handleCloseSnack = () => setSnack((s) => ({ ...s, open: false }));

    return (
        <Box p={3} width="100%">
            <Box display="flex" alignItems="center" justifyContent="space-between" mb={3}>
                <Box display="flex" alignItems="center" gap={2}>
                    <IconButton onClick={onBack} aria-label="back">
                        <ArrowBackIcon />
                    </IconButton>

                    <Box>
                        <Typography variant="h5" fontWeight={700}>
                            {script.scriptName}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            {script.procedureName}
                        </Typography>
                    </Box>
                </Box>

                <Box display="flex" alignItems="center" gap={2}>
                    <Typography color="text.secondary" sx={{ mr: 1 }}>ID: {script.id}</Typography>
                    <Button variant="outlined" startIcon={<EditIcon />} sx={{ textTransform: 'none' }} onClick={handleOpenEdit}>Edit</Button>
                </Box>
            </Box>

            <Divider sx={{ mb: 2 }} />

            <Box display="flex" flexWrap="wrap" gap={3} mb={2}>
                <Box sx={{ width: { xs: '100%', sm: '48%', md: '30%' } }}>
                    <Typography variant="caption" color="text.secondary">Script Name</Typography>
                    <Typography variant="body1" fontWeight={600}>{script.scriptName}</Typography>
                </Box>

                <Box sx={{ width: { xs: '100%', sm: '48%', md: '30%' } }}>
                    <Typography variant="caption" color="text.secondary">Procedure Name</Typography>
                    <Typography variant="body1" fontWeight={600}>{script.procedureName}</Typography>
                </Box>

                <Box sx={{ width: { xs: '100%', sm: '48%', md: '30%' } }}>
                    <Typography variant="caption" color="text.secondary">Created By</Typography>
                    <Typography variant="body1">{script.createdBy}</Typography>
                </Box>
            </Box>

            <Box mt={1}>
                <FormControl fullWidth sx={{ maxWidth: 480 }}>
                    <InputLabel id="action-label">Choose Action</InputLabel>
                    <Select
                        labelId="action-label"
                        value={action}
                        label="Choose Action"
                        onChange={(e) => setAction(e.target.value as string)}
                    >
                        <MenuItem value="option1">Run Script</MenuItem>
                        <MenuItem value="option2">Schedule</MenuItem>
                        <MenuItem value="option3">Export</MenuItem>
                    </Select>
                </FormControl>
            </Box>

            <Box mt={3}>
                <Box display="flex" alignItems="center" justifyContent="space-between" mb={1}>
                    <Typography variant="subtitle2" color="text.secondary">Script Editor</Typography>

                    <Box display="flex" gap={1}>
                        <IconButton color="primary" onClick={handleRun} aria-label="run script">
                            <PlayArrowIcon />
                        </IconButton>
                        <IconButton color="primary" onClick={handleUpdate} aria-label="update script">
                            <SaveIcon />
                        </IconButton>
                    </Box>
                </Box>

                <Editor
                    height="60vh"
                    defaultLanguage="sql"
                    value={editorContent}
                    onChange={(value) => setEditorContent(value ?? '')}
                    options={{ minimap: { enabled: false }, fontSize: 13 }}
                />

                <Snackbar open={snack.open} autoHideDuration={2500} onClose={handleCloseSnack} anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}>
                    <Alert onClose={handleCloseSnack} severity={snack.severity} sx={{ width: '100%' }}>
                        {snack.message}
                    </Alert>
                </Snackbar>
                {/* Output panel shown after running the script */}
                {runOutput && (
                    <Paper sx={{ mt: 2, p: 2, backgroundColor: '#0f172a', color: '#e6eef8', fontFamily: 'monospace', whiteSpace: 'pre-wrap', maxHeight: 260, overflow: 'auto' }} elevation={1}>
                        <Typography component="pre" sx={{ m: 0, fontFamily: 'inherit', fontSize: 13 }}>{runOutput}</Typography>
                    </Paper>
                )}
            </Box>
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
