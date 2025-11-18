export interface ScriptItem {
    id: number;
    procedureName: string;
    scriptName: string;
    createdBy: string;
}

export const scriptData: ScriptItem[] = [
    {
        id: 3001,
        procedureName: "PROC_FETCH_DATA",
        scriptName: "fetch_data.sql",
        createdBy: "Admin"
    },
    {
        id: 3002,
        procedureName: "PROC_UPDATE_USER",
        scriptName: "update_user.sql",
        createdBy: "John"
    },
    {
        id: 3003,
        procedureName: "PROC_CLEANUP",
        scriptName: "cleanup.sql",
        createdBy: "Sarah"
    },
    {
        id: 3004,
        procedureName: "PROC_EXPORT",
        scriptName: "export.sql",
        createdBy: "Admin"
    }
];
