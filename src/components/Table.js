import React, { useState } from "react";
import {
  useReactTable,
  getCoreRowModel,
  flexRender,
} from "@tanstack/react-table";
import {
  FaExclamationCircle,
  FaShieldAlt,
  FaMoneyBillWave,
  FaEdit,
  FaTrash,
} from "react-icons/fa";
import NewDeliveryFormModal from "./NewDeliveryFormModal";
import { useDeliveries } from "../hooks/getDeliveries";
import { SkeletonTable } from "./Skeleton";
import { useCreateDeliveries } from "../hooks/useCreateDeliveries";
import { useDeleteDeliveries } from "../hooks/useDeleteDeliveries";
import ModalConfirm from "./ModalConfirm";
import {
  Fab,
  Stack,
  Tooltip,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Box,
  Typography,
  IconButton,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { usePatchDeliveries } from "../hooks/usePatchDeliveries";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";
import dayjs from "dayjs";
import FullPageLoader from "./FullPageLoader";

const FleetTable = () => {
  const { data: deliveries, isLoading } = useDeliveries();
  const createDeliveries = useCreateDeliveries();
  const updateDeliveries = usePatchDeliveries();
  const [loading, setLoading] = useState(false);
  const deleteDelivery = useDeleteDeliveries();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
  const [selectedDelivery, setSelectedDelivery] = useState(null);

  const handleAddDelivery = async (newDelivery) => {
    setLoading(true);
    if (newDelivery.id) {
      await updateDeliveries.mutateAsync(newDelivery);
    } else {
      await createDeliveries.mutateAsync(newDelivery);
    }

    setTimeout(() => {
      setLoading(false);
      setIsModalOpen(false);
    }, 1000);
  };

  const handleEdit = (delivery) => {
    setSelectedDelivery(delivery);
    setIsModalOpen(true);
  };

  const handleDelete = (delivery) => {
    setSelectedDelivery(delivery);
    setIsConfirmModalOpen(true);
  };

  const confirmDelete = async () => {
    setLoading(true);

    await deleteDelivery.mutateAsync(selectedDelivery.id);
    setIsConfirmModalOpen(false);

    setTimeout(() => {
      setLoading(false);
      setIsModalOpen(false);
    }, 3000);
  };

  const handleMarkAsDelivered = async (id) => {
    setLoading(true);

    const payload = { id, status: "Concluida" };
    await updateDeliveries.mutateAsync(payload);
    setLoading(false);
  };

  const handleUnmarkAsDelivered = async (id) => {
    setLoading(true);

    const payload = { id, status: "Em andamento" };
    await updateDeliveries.mutateAsync(payload);
    setLoading(false);
  };

  const columns = [
    { accessorKey: "destination", header: "Destino" },
    {
      accessorKey: "date",
      header: "Data entrega",

      cell: (info) => {
        const date = info.getValue();

        return dayjs(date).format("DD/MM/YYYY HH:mm");
      },
    },

    {
      accessorKey: "type",
      header: "Tipo de Carga",
      cell: (info) => {
        const cargoType = info.getValue();
        if (cargoType === "Eletrônicos")
          return (
            <span>
              {cargoType}{" "}
              <FaShieldAlt
                style={{ color: "blue", marginLeft: "5px" }}
                title="Seguro"
              />
            </span>
          );
        if (cargoType === "Combustível")
          return (
            <span>
              {cargoType}{" "}
              <FaExclamationCircle
                style={{ color: "red", marginLeft: "5px" }}
                title="Perigosa"
              />
            </span>
          );
        return cargoType;
      },
    },
    {
      accessorKey: "value",
      header: "Valor (R$) + Taxa por localidade",
      cell: (info) => {
        const value = info.getValue();
        const rate = info.row?.original?.rate;
        return (
          <span>
            R$ {value.toLocaleString()}{" "}
            {rate > 0 && `+ ${rate.toLocaleString()}`}{" "}
            {value > 30000 && (
              <FaMoneyBillWave
                style={{ color: "green", marginLeft: "5px" }}
                title="Valiosa"
              />
            )}
          </span>
        );
      },
    },
    { accessorKey: "truck.name", header: "Caminhão" },
    { accessorKey: "truck.plate", header: "Placa" },
    { accessorKey: "driver.name", header: "Motorista" },
    { accessorKey: "status", header: "Status" },
    {
      header: "Ações",
      cell: ({ row }) => (
        <div style={{ display: "flex" }}>
          <Tooltip title="Editar">
            <IconButton
              color="primary"
              onClick={() => handleEdit(row.original)}
            >
              <FaEdit />
            </IconButton>
          </Tooltip>
          <Tooltip title="Excluir">
            <IconButton
              color="error"
              onClick={() => handleDelete(row.original)}
            >
              <FaTrash />
            </IconButton>
          </Tooltip>

          <div style={{ display: "flex", gap: "10px" }}>
            {row.original.status === "Em andamento" ? (
              <Tooltip title="Marcar como entregue">
                <IconButton
                  onClick={() => handleMarkAsDelivered(row.original.id)}
                >
                  <CheckCircleIcon color="primary" />
                </IconButton>
              </Tooltip>
            ) : (
              <Tooltip title="Desmarcar entregue">
                <IconButton
                  onClick={() => handleUnmarkAsDelivered(row.original.id)}
                >
                  <CancelIcon color="error" />
                </IconButton>
              </Tooltip>
            )}
          </div>
        </div>
      ),
    },
  ];

  const table = useReactTable({
    data: deliveries || [],
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <Box mt={5} sx={{ p: 2 }}>
      <FullPageLoader isLoading={loading} />
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        mb={2}
      >
        <Typography variant="h4">Controle de Frota e Entregas</Typography>
        <Tooltip title="Cadastrar Nova Entrega" arrow>
          <Fab
            color="primary"
            aria-label="add"
            onClick={() => {
              setSelectedDelivery(null);
              setIsModalOpen(true);
            }}
          >
            <AddIcon />
          </Fab>
        </Tooltip>
      </Stack>

      <NewDeliveryFormModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleAddDelivery}
        initialData={selectedDelivery}
      />

      <ModalConfirm
        isOpen={isConfirmModalOpen}
        onClose={() => setIsConfirmModalOpen(false)}
        onConfirm={confirmDelete}
        message="Tem certeza que deseja excluir esta entrega?"
      />

      {isLoading ? (
        <SkeletonTable />
      ) : (
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id}>
                  {headerGroup.headers.map((header) => (
                    <TableCell key={header.id}>
                      {flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))}
            </TableHead>
            <TableBody>
              {table.getRowModel().rows.map((row) => (
                <TableRow key={row.id}>
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </Box>
  );
};

export default FleetTable;
