import {Box, Button, TextareaAutosize, Typography} from "@mui/material";
import React, {useState} from "react";
import useImportTable from "../store/useImportTable";

const Export = () => {

    const textareaRef = React.useRef(null);

    const [copied, setCopied] = useState(false);

    const longestSingleLine = (cellText: string) => {
        return cellText.split("\n")
            .map((line: string, index: number, arr: string[]) => {
                return index === 0 ? line.length : line.length + 1
            })
            .reduce((maxLength: number, lineLength: number) => {
                return Math.max(maxLength, lineLength)
            }, 0)
    }

    const table = useImportTable((state: any) => state.table);
    let columnWidths: number[] = [];
    table.forEach((row: string[], rowIndex: number) => {
        row.forEach((cell: string, cellIndex: number) => {
            const cellText = (rowIndex === 0 ? "_. " : " ") + cell.trim();
            const longestLine = longestSingleLine(cellText);
            if (!columnWidths[cellIndex] || columnWidths[cellIndex] < longestLine) {
                columnWidths[cellIndex] = longestLine;
            }
        })
    })

    const cellOpeningOffsetForMultiline: number = 2;
    const calculatePrefixSpaces = (cellIndex: number) => {
        return columnWidths.slice(0, cellIndex).reduce((sum: number, current: number) => {
            return sum + current + cellOpeningOffsetForMultiline;
        }, cellOpeningOffsetForMultiline);
    }

    const parseCell = (rowIndex: number, cell: string, cellIndex: number) => {
        return ((rowIndex === 0 ? "_. " : " ")
            + cell.split("\n")
                    .filter(line => line.trim() !== "")
                    .map((line: string, index: number, array: string[]) => {
                        let prefixSpaces = calculatePrefixSpaces(cellIndex);
                        let paddedLine = line.padStart(prefixSpaces + line.length, " ");
                        return array.length > 1 && index === array.length - 1
                        ? paddedLine.padEnd(columnWidths[cellIndex] + prefixSpaces - 1, " ")
                            : paddedLine;
                    })
                    .join("\n")
                    .trimStart())
                .padEnd(columnWidths[cellIndex], " ")
            + (rowIndex === 0 ? " " : " ");
    }

    const tableString = table.map((row: string[], rowIndex: number) => {
        return "|" + row.map((cell: string, cellIndex: number) => {
            return parseCell(rowIndex, cell, cellIndex);
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