import {Link} from "react-router-dom";
import {Typography} from "@mui/material";

const Dashboard = () => {
    return (
        <>
            <Typography variant={"h1"}>Get started</Typography>

            <Typography variant={"body1"}>
                Click on <Link to={"/import"}>Import</Link> to get started.
            </Typography>
        </>
    );
}

export default Dashboard