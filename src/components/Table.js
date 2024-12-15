import React, { useState } from "react";
import { useReactTable, getCoreRowModel, flexRender } from "@tanstack/react-table";
import { FaExclamationCircle, FaShieldAlt, FaMoneyBillWave } from "react-icons/fa";
import NewDeliveryFormModal from "./NewDeliveryFormModal"; 

const fleetData = [
  {
    truckId: "C001",
    driver: "João Silva",
    deliveries: [
      {
        deliveryId: "E001",
        destination: "São Paulo",
        cargoType: "Eletrônicos",
        value: 35000,
        insurance: true,
        date: "2024-12-14",
      },
    ],
  },
  {
    truckId: "C002",
    driver: "Maria Oliveira",
    deliveries: [
      {
        deliveryId: "E003",
        destination: "Argentina",
        cargoType: "Alimentos",
        value: 15000,
        date: "2024-12-12",
      },
    ],
  },
];

const columns = [
  {
    accessorKey: "deliveryId",
    header: "Entrega ID",
  },
  {
    accessorKey: "destination",
    header: "Destino",
  },
  {
    accessorKey: "cargoType",
    header: "Tipo de Carga",
    cell: (info) => {
      const cargoType = info.getValue();
      if (cargoType === "Eletrônicos")
        return (
          <span>
            {cargoType} <FaShieldAlt style={{ color: "blue", marginLeft: "5px" }} title="Seguro" />
          </span>
        );
      if (cargoType === "Combustível")
        return (
          <span>
            {cargoType} <FaExclamationCircle style={{ color: "red", marginLeft: "5px" }} title="Perigosa" />
          </span>
        );
      return cargoType;
    },
  },
  {
    accessorKey: "value",
    header: "Valor (R$)",
    cell: (info) => {
      const value = info.getValue();
      if (value > 30000) {
        return (
          <span>
            R$ {value.toLocaleString()}{" "}
            <FaMoneyBillWave style={{ color: "green", marginLeft: "5px" }} title="Valiosa" />
          </span>
        );
      }
      return `R$ ${value.toLocaleString()}`;
    },
  },
  {
    accessorKey: "date",
    header: "Data da Entrega",
  },
];

const FleetTable = () => {
  const [data, setData] = useState(
    fleetData.flatMap((truck) =>
      truck.deliveries.map((delivery) => ({
        ...delivery,
        truckId: truck.truckId,
        driver: truck.driver,
      }))
    )
  );

  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleAddDelivery = (newDelivery) => {
    setData((prevData) => [...prevData, newDelivery]);
    setIsModalOpen(false); 
  };

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div style={{ padding: "1rem" }}>
      <h1>Controle de Frota e Entregas</h1>
      <button
        onClick={() => setIsModalOpen(true)}
        style={{
          marginBottom: "1rem",
          padding: "0.5rem 1rem",
          backgroundColor: "#007bff",
          color: "white",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer",
        }}
      >
        Cadastrar Nova Entrega
      </button>
      <NewDeliveryFormModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleAddDelivery}
        fleetData={fleetData}
      />
      <table style={{ width: "100%", borderCollapse: "collapse", marginTop: "1rem" }}>
        <thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th
                  key={header.id}
                  style={{
                    border: "1px solid #ddd",
                    padding: "8px",
                    textAlign: "left",
                  }}
                >
                  {flexRender(header.column.columnDef.header, header.getContext())}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map((row) => (
            <tr key={row.id}>
              {row.getVisibleCells().map((cell) => (
                <td
                  key={cell.id}
                  style={{
                    border: "1px solid #ddd",
                    padding: "8px",
                  }}
                >
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default FleetTable;
