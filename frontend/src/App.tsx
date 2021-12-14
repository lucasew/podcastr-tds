import { Flex } from '@chakra-ui/react';
import './App.css';
import PlayerComponent from './components/Player';
import RoutesPage from './routes';

function App() {
  return (
    <Flex height='100vh' direction='column'>
      <Flex flex={1} height='calc(100vh - 2rem)' overflowX='hidden' overflowY='scroll'>
        <RoutesPage/>
      </Flex>
      <PlayerComponent />
    </Flex>
  );
}

export default App;
