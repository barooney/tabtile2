import {create} from "zustand";

interface ImportTableState {
    table: string[][];
    tableString: string;
    rowCount: number;
    columnCount: number;
    setTableString: (tableString: string) => void;
    updateCellValue: (rowIndex: number, columnIndex: number, value: string) => void;

    removeColumn: (columnIndex: number) => void;
    addColumn: (columnIndex: number) => void;

    removeRow: (rowIndex: number) => void;
    addRow: (rowIndex: number) => void;
}

const useImportTable = create<ImportTableState>()((set: any) => ({
    table: [[] as string[]],
    tableString: "",
    rowCount: 0,
    columnCount: 0,
    testing: false,
    setTableString: (tableString: string) => {
        const trimmed = tableString.trim();
        if (trimmed === "") {
            set({
                table: [[]],
                rowCount: 0,
                columnCount: 0
            })
            return;
        }


        const lines: string[] = trimmed.split(/\r?\n/);
        const tableRows: string[] =  [];
        let currentRow: string = "";
        lines.forEach((line: string) => {
            currentRow += "\n" + line;
            if (line.startsWith("|")) {
                currentRow = line;
            }
            if (line.endsWith("|")) {
                tableRows.push(currentRow.trim());
                currentRow = "";
            }
        });

        const table: string[][] = tableRows.map((row) => {
            return row.split("|")
                .filter((cell) => cell.length > 0)
                .map((cell) => cell
                    .replace("_. ", "")
                    .trim())
        });
        const rowCount = table.length;
        const columnCount = table
            .reduce((max, row) => Math.max(max, row.length), 0);

        set({
            table,
            tableString,
            rowCount,
            columnCount,
        })
    },
    updateCellValue: (rowIndex: number, columnIndex: number, value: string) => {
        set((state: any) => {
            console.log(state.table)

            const table = [...state.table];
            table[rowIndex][columnIndex] = value;
            return {
                table
            }
        })
    },

    removeColumn: (columnIndex: number) => {
        set((state: any) => {
            const table = [...state.table];
            table.forEach(row => row.splice(columnIndex, 1));
            return {
                table,
                columnCount: state.columnCount - 1
            }
        })
    },
    addColumn: (columnIndex: number) => {
        set((state: any) => {
            const table = [...state.table];
            table.forEach(row => row.splice(columnIndex, 0, ""));
            return {
                table,
                columnCount: state.columnCount + 1
            }
        })
    },

    removeRow: (rowIndex: number) => {
        set((state: any) => {
            const table = [...state.table];
            table.splice(rowIndex, 1);
            return {
                table,
                rowCount: state.rowCount - 1
            }
        })
    },
    addRow: (rowIndex: number) => {
        set((state: any) => {
            const table = [...state.table];
            table.splice(rowIndex, 0, Array(state.columnCount).fill(""));
            return {
                table,
                rowCount: state.rowCount + 1
            }
        })
    }
}));

export default useImportTable;