import styled from "styled-components";
import Kpi from "../../components/Kpi";
import FleetTable from "../../components/Table";
import { SkeletonLoading } from "../../components/Skeleton";
import { useDeliveriesKpis } from "../../hooks/getDeliveriesKpis";
import { Box, Button, Stack } from "@mui/material";
import { useNavigate } from "react-router-dom";

const mockValues = {
  inRotation: 8,
  available: 2,
  totalValue: 2000,
};

const Container = styled.div`
  display: flex;
  gap: 20px;
`;

const Main = () => {
  const { data: kpis, isLoading, error, isFetched } = useDeliveriesKpis();

  const navigate = useNavigate();

  return (
    <Box maxWidth={"1300px"} margin={"auto"}>
      <Stack
        mb={"100px"}
        flexDirection={"row"}
        justifyContent={"space-between"}
        alignItems={"center"}
      >
        <h1>Sistema de controle de frotas</h1>
        <Button
          onClick={() => navigate("/")}
          sx={{
            padding: "25px",
            maxHeight: "50px",
            bgcolor: "#F00",
            color: "#fff",
            fontWeight: "600",
            fontSize: "18px",
          }}
        >
          Sair
        </Button>
      </Stack>
      <Container>
        {isFetched ? (
          <>
            <Kpi
              title={"em rota"}
              content={`${kpis?.inRotation || "sem"} caminhões`}
            />
            <Kpi
              title={"disponiveis"}
              content={`${kpis?.available || "sem"} caminhões`}
            />
            <Kpi
              title={"Valor total"}
              content={`R$ ${kpis?.totalValue.toLocaleString() || "0"}`}
            />
          </>
        ) : (
          <>
            <SkeletonLoading />
            <SkeletonLoading />
            <SkeletonLoading />
          </>
        )}
      </Container>

      <FleetTable />
    </Box>
  );
};

export default Main;
