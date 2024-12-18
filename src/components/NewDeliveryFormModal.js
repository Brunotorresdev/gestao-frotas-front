import React, { useEffect, useState } from "react";
import Modal from "react-modal";
import {
  TextField,
  Select,
  MenuItem,
  Button,
  Box,
  Typography,
  IconButton,
} from "@mui/material";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import { useTrucks } from "../hooks/getTrucks";
import { useDrivers } from "../hooks/getDrivers";
import NewTruckModal from "./NewTruckModal";
import NewDriverModal from "./NewDriverModal";
import { defaultStylesModal } from "../utils/stylesDefault";

Modal.setAppElement("#root");

const NewDeliveryFormModal = ({ isOpen, onClose, onSave, initialData }) => {
  const { data: listTrucks } = useTrucks();
  const { data: listDrivers } = useDrivers();

  // const [drivers, setDrivers] = useState(listDrivers?.drivers || []);

  // const [trucks, setTrucks] = useState(listTrucks?.trucks || []);

  console.log("initialData", initialData);

  const [formData, setFormData] = useState({
    destination: "",
    type: "",
    value: "",
    truckId: "",
    driverId: "",
    date: "",
    status: "Em andamento",
  });

  useEffect(() => {
    if (initialData) {
      setFormData({
        ...formData,
        destination: initialData?.destination || "",
        type: initialData?.type || "",
        value: initialData?.value || "",
        truckId: initialData?.truckId || "",
        driverId: initialData?.driverId || "",
        date: initialData?.date || "",
        status: initialData?.status || "Em andamento",
      });

      // setDrivers([...drivers, initialData.driver]);

      // setTrucks([...trucks, initialData.truck]);
    }
  }, [initialData]);

  const [isTruckModalOpen, setTruckModalOpen] = useState(false);
  const [isDriverModalOpen, setDriverModalOpen] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleClearInputs = () => {
    setFormData({
      destination: "",
      type: "",
      value: "",
      truckId: "",
      driverId: "",
      date: "",
      status: "Em andamento",
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
    setFormData({
      destination: "",
      type: "",
      value: "",
      truckId: "",
      driverId: "",
      date: "",
      status: "Em andamento",
    });
  };

  const handleClose = () => {
    console.log('clear')
    onClose();
    handleClearInputs();
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={handleClose}
      style={{
        content: defaultStylesModal,
      }}
    >
      <Typography variant="h5" marginBottom={2}>
        Cadastrar Nova Entrega
      </Typography>
      <form onSubmit={handleSubmit}>
        <Box display="flex" flexDirection="column" gap={2}>
          <TextField
            label="Destino"
            name="destination"
            value={formData.destination}
            onChange={handleChange}
            required
          />
          <TextField
            label="Tipo de Carga"
            name="type"
            value={formData.type}
            onChange={handleChange}
            required
          />
          <TextField
            label="Valor (R$)"
            type="number"
            name="value"
            value={formData.value}
            onChange={handleChange}
            required
          />
          <Box display="flex" alignItems="center" gap={1}>
            <Select
              fullWidth
              name="truckId"
              value={formData.truckId}
              onChange={handleChange}
              displayEmpty
              required
            >
              <MenuItem value="">Selecione Caminhão</MenuItem>
              {listTrucks?.trucks?.map((truck) => (
                <MenuItem key={truck.id} value={truck.id}>
                  {truck.name} - {truck.plate}
                </MenuItem>
              ))}
            </Select>
            <IconButton onClick={() => setTruckModalOpen(true)}>
              <AddCircleOutlineIcon />
            </IconButton>
          </Box>
          <Box display="flex" alignItems="center" gap={1}>
            <Select
              fullWidth
              name="driverId"
              value={formData.driverId}
              onChange={handleChange}
              displayEmpty
              required
              
            >
              <MenuItem value="">Selecione Motorista</MenuItem>
              {listDrivers?.drivers?.map((driver) => (
                <MenuItem key={driver.id} value={driver.id}>
                  {driver.name}
                </MenuItem>
              ))}
            </Select>
            <IconButton onClick={() => setDriverModalOpen(true)}>
              <AddCircleOutlineIcon />
            </IconButton>
          </Box>
          <TextField
            label="Data"
            type="date"
            name="date"
            InputLabelProps={{ shrink: true }}
            value={formData.date}
            onChange={handleChange}
            required
          />
        </Box>
        <Box marginTop={2} display="flex" justifyContent="flex-end" gap={2}>
          <Button variant="contained" type="submit">
            Salvar
          </Button>
          <Button variant="outlined" onClick={handleClose}>
            Cancelar
          </Button>
        </Box>
      </form>

      {/* Modais de cadastro */}
      <NewTruckModal
        isOpen={isTruckModalOpen}
        onClose={() => setTruckModalOpen(false)}
      />
      <NewDriverModal
        isOpen={isDriverModalOpen}
        onClose={() => setDriverModalOpen(false)}
      />
    </Modal>
  );
};

export default NewDeliveryFormModal;
