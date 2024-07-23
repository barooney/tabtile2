import {Box, Button, TextareaAutosize, Typography} from "@mui/material";
import React, {useState} from "react";
import useImportTable from "../store/useImportTable";

const Export = () => {

    const textareaRef = React.useRef(null);

    const [copied, setCopied] = useState(false);

    const table = useImportTable((state: any) => state.table);
    let columnWidths: number[] = [];
    table.forEach((row: string[], rowIndex: number) => {
        row.forEach((cell: string, cellIndex: number) => {
            const cellText = (rowIndex === 0 ? "_. " : " ") + cell.trim();
            if (!columnWidths[cellIndex] || columnWidths[cellIndex] < cellText.length) {
                columnWidths[cellIndex] = cellText.length;
            }
        })
    })

    const tableString = table.map((row: string[], rowIndex: number) => {
        return "|" + row.map((cell: string, cellIndex: number) => {
            return ((rowIndex === 0 ? "_. " : " ") + cell.trim()).padEnd(columnWidths[cellIndex], " ") + (rowIndex === 0 ? " " : " ");
        }).join("|") + "|";
    }).join("\n");

    const copyToClipboard = () => {
        navigator.clipboard.writeText(tableString)
        setCopied(true);
        setTimeout(() => setCopied(false), 3000);
    }

    return <>
        <Typography variant={"h4"} sx={{marginY: 4}}>Export</Typography>
        <TextareaAutosize maxRows={25} minRows={25} style={{width: "100%", fontFamily: "monospace"}}
                          placeholder={"Paste your Textile Table here."} value={tableString}
                          readOnly={true} ref={textareaRef}/>
        <Box display={"flex"} flex={1} flexDirection={"row"} justifyContent={"end"} alignItems={"center"} gap={4}>
            {copied && <Typography variant={"body2"}>Copied!</Typography>}
            <Button variant={"contained"} onClick={copyToClipboard}>Copy</Button>
        </Box>

    </>
}

export default Export