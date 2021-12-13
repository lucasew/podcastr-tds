import { Flex } from "@chakra-ui/react";
import {BrowserRouter, Route, Routes} from 'react-router-dom'
import MainPage from "./pages";

export default function RoutesPages() {
    return (
      <Flex flex={1} alignItems='center' justifyContent='center'>
          <BrowserRouter>
            <Routes>
            <Route path="/" element={<MainPage/>}/>
            </Routes>
          </BrowserRouter>
      </Flex>
    )
}