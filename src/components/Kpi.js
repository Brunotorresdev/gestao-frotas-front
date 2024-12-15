import { Box } from "@mui/material";

const Kpi = ({ title, content }) => {
  return (
    <Box
      border={"1px solid red"}
      borderRadius={"20px"}
      maxWidth={"200px"}
      width={"100%"}
    >
      <h2>{title}</h2>
      <p>{content}</p>
    </Box>
  );
};

export default Kpi;
