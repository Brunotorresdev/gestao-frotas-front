import './App.css';
import AppRouter from './routes/AppRoutes';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient();

function App() {
  return (
    <div >
       <QueryClientProvider client={queryClient}>
      <AppRouter/>
      </QueryClientProvider>
    </div>
  );
}

export default App;
