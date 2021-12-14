import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { ChakraProvider } from '@chakra-ui/react';
import {BrowserRouter} from 'react-router-dom'
import {QueryClient, QueryClientProvider} from 'react-query'
import { PlayerContext } from './hooks/PlayerContext';

const queryClient = new QueryClient()
ReactDOM.render(
  <React.StrictMode>
    <ChakraProvider resetCSS>
        <QueryClientProvider client={queryClient}>
          <PlayerContext>
            <BrowserRouter>
            <App />
          </BrowserRouter>
        </PlayerContext>
      </QueryClientProvider>
    </ChakraProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
