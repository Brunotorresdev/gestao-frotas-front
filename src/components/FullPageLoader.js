import React from "react";
import { Backdrop, CircularProgress, Box } from "@mui/material";

function FullPageLoader({ isLoading }) {
  return (
    <Backdrop
      sx={{
        color: "#fff",
        zIndex: (theme) => theme.zIndex.drawer + 1,
      }}
      open={isLoading}
    >
      <Box display="flex" justifyContent="center" alignItems="center">
        <CircularProgress color="inherit" />
      </Box>
    </Backdrop>
  );
}

export default FullPageLoader;
