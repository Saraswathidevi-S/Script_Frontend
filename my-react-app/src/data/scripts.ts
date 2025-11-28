export interface ScriptItem {
    id: number;
    procedureName: string;
    scriptName: string;
    createdBy: string;
}

export const scriptData: ScriptItem[] = [
    {
        id: 3001,
        procedureName: "Input_power",
        scriptName: "Sum",
        createdBy: "Admin"
    },
    {
        id: 3002,
        procedureName: "Procedure_test",
        scriptName: "Maximum",
        createdBy: "John"
    },
    {
        id: 3003,
        procedureName: "Input_test_data",
        scriptName: "minimum",
        createdBy: "Sar"
    },
    {
        id: 3004,
        procedureName: "procedure_demo",
        scriptName: "Average",
        createdBy: "Admin"
    }
];
