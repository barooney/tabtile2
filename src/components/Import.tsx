import {Box, Button, TextareaAutosize, Typography} from "@mui/material";
import useImportTable from "../store/useImportTable";
import {Link} from "react-router-dom";
import {useState} from "react";

const Import = () => {
    const setTableString = useImportTable((state: any) => state.setTableString);
    const hasTableString = useImportTable((state: any) => state.table.length);

    const [tableLocalString, setTableLocalString] = useState("");

    const handleImportTable = () => {
        setTableString(tableLocalString
            .split("\n")
            .map((line: string) => { return line.trim() })
            .join("\n"));
    }

    return (
        <>
            <Typography variant={"h4"} sx={{marginY: 4}}>Import</Typography>
            <TextareaAutosize maxRows={25} minRows={25} style={{width: "100%", fontFamily: "monospace"}}
                              placeholder={"Paste your Textile Table here."} value={tableLocalString}
                              onChange={e => setTableLocalString(e.currentTarget.value)}/>
            <Box display={"flex"} flex={1} flexDirection={"row"} justifyContent={"end"}>
                {hasTableString ? <Link to={"/edit"} onClick={handleImportTable}>
                    <Button variant={"contained"}>Edit</Button>
                </Link> : <Button variant={"contained"} disabled={true}>Edit</Button>}
            </Box>
        </>
    )
}

export default Import;