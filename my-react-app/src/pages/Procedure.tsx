import React, { useState } from "react";
import {
    Box,
    Typography,
    Button,
    TextField,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Pagination,
    Checkbox,
    Dialog,
} from "@mui/material";

import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import { scriptData } from "../data/scripts";
import type { ScriptItem } from "../data/scripts";
import ScriptForm from "../components/ScriptForm";

interface ScriptManagerProps {
    onOpenDetails?: (script: ScriptItem) => void;
}

const ScriptManager: React.FC<ScriptManagerProps> = ({ onOpenDetails }) => {
    const [search, setSearch] = useState("");
    const [selected, setSelected] = useState<number[]>([]);
    const [selectAll, setSelectAll] = useState(false);
    const [openForm, setOpenForm] = useState(false);
    const [rows, setRows] = useState<ScriptItem[]>(scriptData);

    // Filter rows based on search
    const filteredRows = rows.filter((item) =>
        Object.values(item)
            .join(" ")
            .toLowerCase()
            .includes(search.toLowerCase())
    );

    // Checkbox handlers
    const handleSelectAll = () => {
        if (selectAll) {
            setSelected([]);
        } else {
            setSelected(filteredRows.map((row) => row.id));
        }
        setSelectAll(!selectAll);
    };

    const handleRowSelect = (id: number) => {
        let updated: number[] = [];
        if (selected.includes(id)) {
            updated = selected.filter((x) => x !== id);
        } else {
            updated = [...selected, id];
        }
        setSelected(updated);
        setSelectAll(updated.length === filteredRows.length);
    };

    const handleDeleteSelected = () => {
        if (selected.length === 0) return;
        const remaining = rows.filter((r) => !selected.includes(r.id));
        setRows(remaining);
        setSelected([]);
        setSelectAll(false);
    };

    return (
        <Box p={3} width="100%">
            <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                mb={2}
            >
                <Typography
                    variant="h6"
                    fontWeight="bold"
                    sx={{ fontSize: "24px", color: "#070707ff" }}
                >
                    Script Manager
                </Typography>

                <Box display="flex" gap={1.5} alignItems="flex-start">
                    <TextField
                        size="small"
                        placeholder="Search by ID, Name or Procedure"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        sx={{
                            width: "240px",
                            background: "white",
                        }}
                    />

                    <Box display="flex" flexDirection="column" gap={1}>
                        <Button
                            variant="contained"
                            startIcon={<AddIcon />}
                            onClick={() => setOpenForm(true)}
                            sx={{
                                backgroundColor: "#ffc60b",
                                color: "#070707ff",
                                textTransform: "none",
                                fontWeight: "bold",
                                "&:hover": { backgroundColor: "#ffc60b" },
                            }}
                        >
                            Create Script
                        </Button>

                        {selected.length > 0 && (
                            <Button
                                variant="outlined"
                                onClick={handleDeleteSelected}
                                startIcon={<DeleteIcon />}
                                sx={{
                                    textTransform: "none",
                                    color: "black",
                                    borderColor: "transparent",
                                    backgroundColor: "transparent",
                                    '&:hover': { backgroundColor: '#f5f5f5', borderColor: 'transparent' },
                                }}
                            >
                                Delete
                            </Button>
                        )}
                    </Box>
                </Box>
            </Box>

            <Paper elevation={0} sx={{ borderRadius: "10px", border: "1px solid #eee" }}>
                <TableContainer>
                    <Table>
                        <TableHead>
                            <TableRow sx={{ backgroundColor: "#FFF9E6" }}>
                                <TableCell padding="checkbox">
                                    <Checkbox
                                        checked={selectAll}
                                        onChange={handleSelectAll}
                                    />
                                </TableCell>

                                <TableCell sx={{ fontWeight: "bold" }}>Script ID</TableCell>
                                <TableCell sx={{ fontWeight: "bold" }}>Script Name</TableCell>
                                <TableCell sx={{ fontWeight: "bold" }}>Created By</TableCell>
                            </TableRow>
                        </TableHead>

                        <TableBody>
                            {filteredRows.map((row: ScriptItem) => (
                                <TableRow
                                    key={row.id}
                                    hover
                                    sx={{ cursor: "pointer" }}
                                    onClick={() => onOpenDetails && onOpenDetails(row)}
                                >
                                    <TableCell padding="checkbox">
                                        <Checkbox
                                            checked={selected.includes(row.id)}
                                            onChange={() => handleRowSelect(row.id)}
                                            onClick={(e) => e.stopPropagation()}
                                        />
                                    </TableCell>

                                    <TableCell>{row.id}</TableCell>
                                    <TableCell>{row.scriptName}</TableCell>
                                    <TableCell>{row.createdBy}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>

                    </Table>
                </TableContainer>

                <Box display="flex" justifyContent="flex-end" p={2}>
                    <Pagination count={1} shape="rounded" />
                </Box>
            </Paper>
            <Dialog
                open={openForm}
                onClose={() => setOpenForm(false)}
                fullWidth
                maxWidth="sm"
            >
                <ScriptForm onClose={() => setOpenForm(false)} />
            </Dialog>
        </Box>
    );
};

export default ScriptManager;
