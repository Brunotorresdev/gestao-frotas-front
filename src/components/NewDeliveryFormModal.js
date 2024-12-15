import React, { useState } from "react";
import Modal from "react-modal";

Modal.setAppElement("#root");

const NewDeliveryFormModal = ({ isOpen, onClose, onSave, fleetData }) => {
  const [formData, setFormData] = useState({
    deliveryId: "",
    destination: "",
    cargoType: "",
    value: "",
    truckId: "",
    driver: "",
    date: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
    setFormData({
      deliveryId: "",
      destination: "",
      cargoType: "",
      value: "",
      truckId: "",
      driver: "",
      date: "",
    });
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      style={{
        content: {
          top: "50%",
          left: "50%",
          right: "auto",
          bottom: "auto",
          marginRight: "-50%",
          transform: "translate(-50%, -50%)",
          width: "500px",
          padding: "2rem",
          borderRadius: "10px",
        },
      }}
    >
      <h2>Cadastrar Nova Entrega</h2>
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: "1rem" }}>
          <label>ID da Entrega:</label>
          <input
            type="text"
            name="deliveryId"
            value={formData.deliveryId}
            onChange={handleChange}
            required
          />
        </div>
        <div style={{ marginBottom: "1rem" }}>
          <label>Destino:</label>
          <input
            type="text"
            name="destination"
            value={formData.destination}
            onChange={handleChange}
            required
          />
        </div>
        <div style={{ marginBottom: "1rem" }}>
          <label>Tipo de Carga:</label>
          <input
            type="text"
            name="cargoType"
            value={formData.cargoType}
            onChange={handleChange}
            required
          />
        </div>
        <div style={{ marginBottom: "1rem" }}>
          <label>Valor (R$):</label>
          <input
            type="number"
            name="value"
            value={formData.value}
            onChange={handleChange}
            required
          />
        </div>
        <div style={{ marginBottom: "1rem" }}>
          <label>Caminhão:</label>
          <select
            name="truckId"
            value={formData.truckId}
            onChange={handleChange}
            required
          >
            <option value="">Selecione</option>
            {fleetData.map((truck) => (
              <option key={truck.truckId} value={truck.truckId}>
                {truck.truckId}
              </option>
            ))}
          </select>
        </div>
        <div style={{ marginBottom: "1rem" }}>
          <label>Motorista:</label>
          <select
            name="driver"
            value={formData.driver}
            onChange={handleChange}
            required
          >
            <option value="">Selecione</option>
            {fleetData.map((truck) => (
              <option key={truck.driver} value={truck.driver}>
                {truck.driver}
              </option>
            ))}
          </select>
        </div>
        <div style={{ marginBottom: "1rem" }}>
          <label>Data:</label>
          <input
            type="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit" style={{ marginRight: "1rem" }}>
          Salvar
        </button>
        <button type="button" onClick={onClose}>
          Cancelar
        </button>
      </form>
    </Modal>
  );
};

export default NewDeliveryFormModal;
