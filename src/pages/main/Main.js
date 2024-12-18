import styled from "styled-components";
import Kpi from "../../components/Kpi";
import FleetTable from "../../components/Table";
import {SkeletonLoading} from "../../components/Skeleton";
import { useDeliveriesKpis } from "../../hooks/getDeliveriesKpis";
import { Box } from "@mui/material";

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

  return (
    <Box maxWidth={'1300px'} margin={'auto'}>
      <h1>aplicação</h1>
      <Container >
        {isFetched ? (
          <>
            <Kpi title={"em rota"} content={`${kpis?.inRotation} caminhões`} />
            <Kpi
              title={"disponiveis"}
              content={`${kpis?.available} caminhões`}
            />
            <Kpi
              title={"Valor total"}
              content={`R$ ${kpis?.totalValue.toLocaleString()}`}
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
