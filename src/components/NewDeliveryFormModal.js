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
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import dayjs from "dayjs";
import { Label } from "@mui/icons-material";

Modal.setAppElement("#root");

const NewDeliveryFormModal = ({ isOpen, onClose, onSave, initialData }) => {
  const { data: listTrucks } = useTrucks();
  const { data: listDrivers } = useDrivers();

  const [destinations, setDestinations] = useState([
    "São Paulo",
    "Rio de Janeiro",
    "Curitiba",
    "Salvador",
    "Nordeste",
    "Argentina",
    "Amazônia",
  ]);

  const handleDateChange = (newValue) => {
    setFormData({ ...formData, date: newValue });
  };

  console.log("initialData", initialData);

  const [formData, setFormData] = useState({
    id: null,
    destination: "",
    type: "",
    value: "",
    truckId: "",
    driverId: "",
    date: null,
    status: "Em andamento",
  });

  useEffect(() => {
    if (initialData) {
      setFormData({
        ...formData,
        id: initialData?.id || null,
        destination: initialData?.destination || "",
        type: initialData?.type || "",
        value: initialData?.value || "",
        truckId: initialData?.truckId || "",
        driverId: initialData?.driverId || "",
        date: dayjs(initialData?.date) || null,
        status: initialData?.status || "Em andamento",
      });

      if (
        initialData?.truck &&
        !listTrucks?.trucks.some((truck) => truck.id === initialData.truck.id)
      ) {
        listTrucks?.trucks.push(initialData.truck);
      }

      if (
        initialData?.driver &&
        !listDrivers?.drivers.some(
          (driver) => driver.id === initialData.driver.id
        )
      ) {
        listDrivers?.drivers.push(initialData.driver);
      }

      if (initialData?.destination) {
        console.log("initialData?.destination", initialData?.destination);
        setDestinations([...destinations, initialData?.destination]);
        console.log("destinations>>>", destinations);
      }
    }
  }, [initialData, listTrucks, listDrivers]);

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
      date: null,
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
      date: null,
      status: "Em andamento",
    });
  };

  const handleClose = () => {
    console.log("clear");
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
          <div>Destino</div>
          <Select
            name="destination"
            value={formData.destination}
            onChange={handleChange}
            fullWidth
            displayEmpty
            required
          >
            <MenuItem value="">Selecione Destino</MenuItem>
            {destinations?.map((destination) => (
              <MenuItem key={destination} value={destination}>
                {destination}
              </MenuItem>
            ))}
          </Select>
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

          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DateTimePicker
              label="Data e Hora"
              format="DD/MM/YYYY HH:mm"
              value={formData.date}
              onChange={handleDateChange}
              renderInput={(params) => <TextField {...params} required />}
            />
          </LocalizationProvider>
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
