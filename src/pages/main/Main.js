import styled from "styled-components";
import Kpi from "../../components/Kpi";
import FleetTable from "../../components/Table";
import { SkeletonLoading } from "../../components/Skeleton";
import { useDeliveriesKpis } from "../../hooks/getDeliveriesKpis";
import { Box, Button, Stack } from "@mui/material";
import { useNavigate } from "react-router-dom";

const Container = styled.div`
  display: flex;
  gap: 20px;
`;

const Main = () => {
  const { data: kpis, isFetched } = useDeliveriesKpis();

  const navigate = useNavigate();

  return (
    <Box maxWidth={"1300px"} margin={"auto"} p={5}>
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
          <Stack  width={'100%'} flexDirection={"row"} flexWrap={'wrap'} gap={2}>
              <Kpi
                title={"Disponíveis"}
                content={`${kpis?.available || "sem"} caminhões`}
              />
            <Kpi
              title={"Em rota"}
              content={`${kpis?.inRotation || "sem"} caminhões`}
            />
            <Kpi
              title={"Valor total"}
              content={`R$ ${kpis?.totalValue.toLocaleString() || "0"}`}
            />
          <Kpi
              title={"Disponíveis"}
              content={`${(kpis?.totalDrivers - kpis?.inRotationDrivers) || "sem"} motoristas `}
          />
          <Kpi
              title={"Em Rota"}
              content={`${kpis?.inRotationDrivers || "sem"} motoristas`}
          />
          </Stack>
        ) : (
          <Stack
          width={'100%'} flexDirection={"row"} flexWrap={'wrap'} gap={2}
          >
            <SkeletonLoading />
            <SkeletonLoading />
            <SkeletonLoading />
            <SkeletonLoading />
            <SkeletonLoading />
          </Stack>
        )}
      </Container>

      <FleetTable />
    </Box>
  );
};

export default Main;
