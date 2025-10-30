import {create} from "zustand";
import textile from "textile-js";

interface ImportTableState {
    table: string[][];
    tableString: string;
    rowCount: number;
    columnCount: number;
    testing: boolean;
    setTableString: (tableString: string, testing: boolean) => void;
    updateCellValue: (rowIndex: number, columnIndex: number, value: string) => void;
    setTableStringTest: (tableString: string) => void;

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
    setTableString: (tableString: string, testing: boolean) => {
        if (tableString === "") {
            set({
                table: [[]],
                rowCount: 0,
                columnCount: 0
            })
            return;
        }

        let rowCount = 0;
        let columnCount = 0;

        let table: string[][] = []

        const parsedTable = textile.parse(tableString);
        const tableWrapper = document.createElement("div");
        tableWrapper.innerHTML = parsedTable;
        const tbodyElement = tableWrapper.querySelector("table tbody");

        const headRows = tbodyElement?.querySelectorAll("th");
        if (!headRows) {
            return;
        }

        const rows = tbodyElement?.querySelectorAll("tr");
        if (!rows) {
            return
        }
        rowCount = rows.length;
        rows.forEach((row, rowIndex) => {
            table.push([])
            const cells = row.querySelectorAll("td");
            columnCount = Math.max(columnCount, cells.length);
            table[rowIndex] = []
            cells.forEach((cell, cellIndex) => {
                table[rowIndex].push(cell.innerText.trim())
            })
        })

        headRows.forEach((cell, cellIndex) => {
            table[0].push(cell.innerText.trim())
        })

        if (testing) {
            console.log(table);
            return
        }

        set({
            table,
            tableString,
            rowCount,
            columnCount
        })

    },
    setTableStringTest: (tableString: string) => {
        const trimmed = tableString.trim();
        if (trimmed === "") {
            set({
                table: [[]],
                rowCount: 0,
                columnCount: 0
            })
            return;
        }

        let rowCount = 0;
        let columnCount = 0;
        let table: string[][] = []

        const lines = trimmed.split(/\r?\n/);
        console.log(lines)

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