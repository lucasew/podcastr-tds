import { Flex } from '@chakra-ui/react';
import './App.css';
import PlayerComponent from './components/Player';
import RoutesPage from './routes';

function App() {
  return (
    <Flex height='100vh' direction='column'>
      <RoutesPage/>
      <PlayerComponent />
    </Flex>
  );
}

export default App;
