import { Flex } from "@chakra-ui/react";
import { Route, Routes } from 'react-router-dom';
import MainPage from "./pages";
import NowPlayingPage from "./pages/NowPlaying";

export default function RoutesPages() {
    return (
      <Flex flex={1} alignItems='center' justifyContent='center'>
        <Routes>
          <Route path="/" element={<MainPage/>}/>
          <Route path="/now-playing" element={<NowPlayingPage/>}/>
        </Routes>
      </Flex>
    )
}