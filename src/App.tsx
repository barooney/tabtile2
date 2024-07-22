import React from 'react';
import {Outlet} from "react-router";
import {AppBar, Box, Button, Container, Toolbar, Typography} from "@mui/material";
import {Link} from "react-router-dom";

function App() {


    return <Box sx={{flexGrow: 1}}>
        <AppBar position={"static"}>
            <Container>
                <Toolbar disableGutters>
                    <Typography variant={"h6"}>Tabtile2</Typography>
                    <Box sx={{ display: "flex", marginLeft: 4, flexGrow: 1, flexDirection: "row"}}>
                        <Link to={"/import"} style={{textDecoration: "none"}}>
                            <Button sx={{ color: 'white', display: 'block' }}>Import</Button>
                        </Link>
                        <Link to={"/edit"} style={{textDecoration: "none"}}>
                            <Button sx={{ color: 'white', display: 'block' }}>Edit</Button>
                        </Link>
                        <Link to={"/export"} style={{textDecoration: "none"}}>
                            <Button sx={{ color: 'white', display: 'block' }}>Export</Button>
                        </Link>
                    </Box>
                </Toolbar>
            </Container>
        </AppBar>
        <Container>
            <Outlet/>
        </Container>
    </Box>;
}

export default App;
