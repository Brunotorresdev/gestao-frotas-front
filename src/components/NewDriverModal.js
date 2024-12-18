import React, { useState } from "react";
import Modal from "react-modal";
import { TextField, Button, Box, Typography } from "@mui/material";
import { defaultStylesModal } from "../utils/stylesDefault";
import { useCreateDrivers } from "../hooks/useCreateDrivers";

const NewDriverModal = ({ isOpen, onClose }) => {
  const [driverData, setDriverData] = useState({ name: "" });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDriverData({ ...driverData, [name]: value });
  };

  const createDriver = useCreateDrivers()


  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createDriver.mutateAsync(driverData);
    onClose();

    } catch(error) {
      console.error(error)
    }
  };

  return (
    <Modal 
    style={{
            content: defaultStylesModal,
          }}
    isOpen={isOpen} onRequestClose={onClose}>
      <Box padding={3}>
        <Typography variant="h6">Cadastrar Novo Motorista</Typography>
        <form onSubmit={handleSubmit}>
          <Box display="flex" flexDirection="column" gap={2} marginTop={2}>
            <TextField
              label="Nome do Motorista"
              name="name"
              value={driverData.name}
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

export default NewDriverModal;
