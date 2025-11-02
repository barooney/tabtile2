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

        if (!trimmed.includes("|")) {
            let regex = trimmed.match(/^(\d+)x(\d+)$/);
            console.log(regex)
            if (regex) {
                const height = Math.max(1, Number(regex[1]));
                const width = Math.max(1, Number(regex[2]));
                console.log(height, width);
                const table = Array.from({length: height}, () =>
                    Array<string>(width).fill(""));
                set({
                    table: table,
                    rowCount: height,
                    columnCount: width,
                })
                return;
            }
            set({
                table: [[trimmed]],
                rowCount: 1,
                columnCount: 1,
            })
            return;
        }

        const lines: string[] = trimmed.split(/\r?\n/);
        const tableRows: string[] =  [];
        let currentRow: string = "";
        lines.forEach((line: string) => {
            if (!(line.trim() === "|" && currentRow !== "")) {
                currentRow += "\n" + line;
                if (line.startsWith("|")) {
                    currentRow = line;
                }
                if (line.endsWith("|")) {
                    tableRows.push(currentRow.trim());
                    currentRow = "";
                }
            } else {
                tableRows.push(currentRow.trim() + "|");
                currentRow = "";
            }
        });

        const tableSkewered: string[][] = tableRows.map((row) => {
            return row.split("|")
                .slice(1, -1)
                .map((cell) => cell
                    .replace("_. ", "")
                    .trim());
        });

        const rowCount = tableSkewered.length;
        const columnCount = tableSkewered
            .reduce((max, row) => Math.max(max, row.length), 0);

        const tableFilled = Array.from({length: rowCount}, () =>
            Array<string>(columnCount).fill(""));

        tableSkewered.forEach((row, rowIdx) => {
            row.forEach((cell, colIdx) => {
                tableFilled[rowIdx][colIdx] = cell;
            })
        });

        set({
            table: tableFilled,
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