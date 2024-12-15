import styled from "styled-components";
import Kpi from "../../components/Kpi";
import FleetTable from "../../components/Table";
import SkeletonLoading from "../../components/Skeleton";

const mockValues = {
  inRotation: 8,
  available: 2,
  totalValue: 2000
  
}

const Container = styled.div`
 display: flex;
gap: 20px
  
`;

const Main = () => {
  return (
    <>
      <h1>aplicação</h1>
      <Container>

      <Kpi title={'em rota'} content={`${mockValues.inRotation} caminhões`}/>
      <Kpi title={'disponiveis'} content={`${mockValues.available} caminhões`}/>
      <Kpi title={'Valor total'} content={`${mockValues.totalValue} caminhões`}/>

      <SkeletonLoading/>
      <SkeletonLoading/>
      <SkeletonLoading/>


      </Container>
<FleetTable/>
    </>
  );
};

export default Main;
