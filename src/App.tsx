import { QueryClientProvider } from 'react-query';
import { QueryClient } from 'react-query';
import Searchbar from './components/Searchbar';
import './App.css';

const queryClient = new QueryClient();

const App: React.FC = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <div>
        <Searchbar/>
      </div>
    </QueryClientProvider>
  );
}

export default App;
