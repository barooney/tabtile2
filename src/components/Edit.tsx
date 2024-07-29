import useImportTable from "../store/useImportTable";
import {
    Box,
    Button,
    ClickAwayListener,
    MenuItem,
    MenuList,
    Paper,
    Popper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    TextField,
    Typography
} from "@mui/material";
import React, {useRef, useState} from "react";
import {ArrowDropDown} from "@mui/icons-material";
import {Link} from "react-router-dom";

const ColumnDropdownButton = ({column}: { column: number }) => {
    const buttonRef = useRef(null);
    const [open, setOpen] = useState(false);
    const handleClose = () => {
        setOpen(false);
    }

    const removeColumn = useImportTable((state: any) => state.removeColumn);
    const addColumn = useImportTable((state: any) => state.addColumn);

    const handleAddColumnBefore = () => {
        addColumn(column);
        setOpen(false);
    }

    const handleAddColumnAfter = () => {
        addColumn(column + 1);
        setOpen(false);
    }

    const handleRemoveColumn = () => {
        removeColumn(column);
        setOpen(false);
    }

    return <>
        <Button ref={buttonRef} sx={{minWidth: 0}} size={"small"} variant={"outlined"} onClick={() => setOpen(true)}>
            <ArrowDropDown/>
        </Button>
        <Popper
            sx={{zIndex: 1}}
            open={open}
            anchorEl={buttonRef.current}
            disablePortal
        >
            <Paper>
                <ClickAwayListener onClickAway={handleClose}>
                    <MenuList autoFocusItem>
                        <MenuItem onClick={handleAddColumnBefore}>Add column before</MenuItem>
                        <MenuItem onClick={handleAddColumnAfter}>Add column after</MenuItem>
                        <MenuItem onClick={handleRemoveColumn}>Remove column</MenuItem>
                    </MenuList>
                </ClickAwayListener>
            </Paper>
        </Popper>
    </>
}

const RowDropdownButton = ({row}: { row: number }) => {
    const buttonRef = useRef(null);
    const [open, setOpen] = useState(false);
    const handleClose = () => {
        setOpen(false);
    }

    const removeRow = useImportTable((state: any) => state.removeRow);
    const addRow = useImportTable((state: any) => state.addRow);

    const handleAddRowBefore = () => {
        addRow(row);
        setOpen(false);
    }

    const handleAddRowAfter = () => {
        addRow(row + 1);
        setOpen(false);
    }

    const handleAddFiveRowsAfter = () => {
        for (let i = 0; i < 5; i++) {
            addRow(row + 1);
        }
        setOpen(false);
    }

    const handleRemoveRow = () => {
        removeRow(row);
        setOpen(false);
    }

    return <>
        <Button ref={buttonRef} sx={{minWidth: 0}} size={"small"} variant={"outlined"} onClick={() => setOpen(true)}>
            <ArrowDropDown/>
        </Button>
        <Popper
            sx={{zIndex: 1}}
            open={open}
            anchorEl={buttonRef.current}
            disablePortal
        >
            <Paper>
                <ClickAwayListener onClickAway={handleClose}>
                    <MenuList autoFocusItem>
                        <MenuItem onClick={handleAddRowBefore}>Add row before</MenuItem>
                        <MenuItem onClick={handleAddRowAfter}>Add row after</MenuItem>
                        <MenuItem onClick={handleAddFiveRowsAfter}>Add five rows after</MenuItem>
                        <MenuItem onClick={handleRemoveRow}>Remove row</MenuItem>
                    </MenuList>
                </ClickAwayListener>
            </Paper>
        </Popper>
    </>
}

const Edit = () => {

    const table = useImportTable((state: any) => state.table);
    const hasTable = useImportTable((state: any) => state.table.length > 0 && state.table[0].length > 0);
    const columnCount = useImportTable((state: any) => state.columnCount);
    const updateCellValue = useImportTable((state: any) => state.updateCellValue);

    return (
        <Box>
            <Typography variant={"h4"} sx={{marginY: 4}}>Edit</Typography>
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow key={"row-0"}>
                            {table[0].length === 0 && <TableCell key={"cell-0-0"}>
                                <ColumnDropdownButton column={0}/>
                            </TableCell>}
                            {table[0].map((cell: string, index: number) => {
                                return <TableCell key={`cell-0-${index}`}>
                                    <Box display={"flex"} gap={1} flex={1} flexDirection={"row"}>
                                        <TextField sx={{flexGrow: 1}} size={"small"} variant={"outlined"} value={cell}
                                                   onChange={e => updateCellValue(0, index, e.currentTarget.value)}/>
                                        <ColumnDropdownButton column={index}/>
                                    </Box>
                                </TableCell>
                            })}
                            <TableCell key={`cell-0-${columnCount + 1}`}></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {table.length <= 1 && <TableCell key={`cell-0-${columnCount + 1}`} colSpan={columnCount + 2}>
                            <RowDropdownButton row={1}/>
                        </TableCell>}
                        {table.slice(1).map((row: string[], rowIndex: number) => {
                            return <TableRow key={`row-${rowIndex}`}>
                                {row.map((cell: string, cellIndex: number) => {
                                    return <TableCell key={`cell-${rowIndex}-${cellIndex}`}>
                                        <TextField sx={{width: "100%"}} size={"small"} variant={"standard"} value={cell}
                                                   onChange={e => updateCellValue(rowIndex + 1, cellIndex, e.currentTarget.value)}/>
                                    </TableCell>
                                })}
                                <TableCell key={`cell-${rowIndex}-${columnCount + 1}`} colSpan={columnCount + 2}>
                                    <Box sx={{display: "flex"}} flex={1} flexDirection={"row"} justifyContent={"end"}>
                                        <RowDropdownButton row={rowIndex + 1}/>
                                    </Box>
                                </TableCell>
                            </TableRow>
                        })}
                    </TableBody>
                </Table>
            </TableContainer>
            <Box display={"flex"} flex={1} flexDirection={"row"} justifyContent={"end"} sx={{marginY: 4}}>
                {hasTable ? <Link to={"/export"}>
                    <Button variant={"contained"}>Export</Button>
                </Link> : <Button variant={"contained"} disabled={true}>Export</Button>}
            </Box>
        </Box>
    )
}

export default Edit;