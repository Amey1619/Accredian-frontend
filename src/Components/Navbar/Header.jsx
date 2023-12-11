import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";

export default function ButtonAppBar() {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar sx={{ width: "100%", marginBottom : "10px", backgroundColor: "#535c68"}}>
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Accredian
          </Typography>
          <Button color="inherit" sx={{marginRight:"30px"}}>Home</Button>
          <Button color="inherit">About us</Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
