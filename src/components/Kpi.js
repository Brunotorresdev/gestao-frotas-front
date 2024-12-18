import { Box, Typography } from "@mui/material";
import { defaultStylesKpi } from "../utils/stylesDefault";

const Kpi = ({ title, content }) => {
  return (
    <Box
      sx={defaultStylesKpi}
    >
      <Typography
        variant="h6"
        sx={{ fontWeight: "bold", color: "primary.main", marginBottom: "0.5rem" }}
      >
        {title}
      </Typography>
      <Typography
        variant="h4"
        sx={{ fontWeight: "bold", color: "text.primary" }}
      >
        {content}
      </Typography>
    </Box>
  );
};

export default Kpi;
