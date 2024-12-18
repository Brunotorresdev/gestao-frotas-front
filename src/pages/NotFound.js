import React from "react";
import { Box, Typography, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

function NotFound() {
  const navigate = useNavigate();

  const handleGoHome = () => {
    navigate("/"); // Redireciona para a página inicial
  };

  return (
    <Box
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      height="100vh"
      textAlign="center"
    >
      <Typography variant="h3" color="error">
        Página Não Encontrada
      </Typography>
      <Typography variant="h6" color="textSecondary" marginTop={2}>
        Desculpe, a página que você está procurando não existe.
      </Typography>
      <Button
        variant="contained"
        color="primary"
        onClick={handleGoHome}
        sx={{ marginTop: 3 }}
      >
        Voltar para a Página Inicial
      </Button>
    </Box>
  );
}

export default NotFound;
