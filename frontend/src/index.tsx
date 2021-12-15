import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { ChakraProvider } from '@chakra-ui/react';
import {BrowserRouter} from 'react-router-dom'
import {QueryClient, QueryClientProvider} from 'react-query'
import { PlayerContext } from './hooks/PlayerContext';
import { LoginContext } from './hooks/LoginContext';

const queryClient = new QueryClient()
ReactDOM.render(
  <React.StrictMode>
    <ChakraProvider resetCSS>
      <QueryClientProvider client={queryClient}>
        <LoginContext>
          <PlayerContext>
              <BrowserRouter>
                <App />
              </BrowserRouter>
          </PlayerContext>
        </LoginContext>
      </QueryClientProvider>
    </ChakraProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
