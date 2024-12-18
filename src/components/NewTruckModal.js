import React, { useState } from "react";
import Modal from "react-modal";
import { TextField, Button, Box, Typography } from "@mui/material";
import { defaultStylesModal } from "../utils/stylesDefault";

const NewTruckModal = ({ isOpen, onClose }) => {
  const [truckData, setTruckData] = useState({ name: "", plate: "" });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTruckData({ ...truckData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Novo Caminhão:", truckData);
    onClose();
  };

  return (
    <Modal
    style={{
            content: defaultStylesModal,
          }}
    isOpen={isOpen} onRequestClose={onClose}>
      <Box padding={3}>
        <Typography variant="h6">Cadastrar Novo Caminhão</Typography>
        <form onSubmit={handleSubmit}>
          <Box display="flex" flexDirection="column" gap={2} marginTop={2}>
            <TextField
              label="Nome do Caminhão"
              name="name"
              value={truckData.name}
              onChange={handleChange}
              required
            />
            <TextField
              label="Placa"
              name="plate"
              value={truckData.plate}
              onChange={handleChange}
              required
            />
            <Box display="flex" justifyContent="flex-end" gap={2}>
              <Button variant="contained" type="submit">
                Salvar
              </Button>
              <Button variant="outlined" onClick={onClose}>
                Cancelar
              </Button>
            </Box>
          </Box>
        </form>
      </Box>
    </Modal>
  );
};

export default NewTruckModal;
