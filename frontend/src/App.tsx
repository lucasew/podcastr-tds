import './App.css';
import { Box, Container, Flex } from '@chakra-ui/react';
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
