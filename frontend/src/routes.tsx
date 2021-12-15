import { Flex } from "@chakra-ui/react";
import { Route, Routes } from 'react-router-dom';
import MainPage from "./pages";
import HistoricoPage from "./pages/Historico";
import LoginPage from "./pages/Login";
import NowPlayingPage from "./pages/NowPlaying";
import PodcastPage from "./pages/Podcast";
import PodcastsPage from "./pages/Podcasts";
import SignUpPage from "./pages/SignUp";

export default function RoutesPages() {
    return (
      <Flex flex={1} alignItems='center' justifyContent='center'>
        <Routes>
          <Route path="/" element={<MainPage/>}/>
          <Route path="/now-playing" element={<NowPlayingPage/>}/>
          <Route path="/podcast" element={<PodcastsPage/>}/>
          <Route path="/podcast/:id" element={<PodcastPage/>}/>
          <Route path="/login" element={<LoginPage/>}/>
          <Route path="/signup" element={<SignUpPage/>}/>
          <Route path="/historic" element={<HistoricoPage/>}/>
        </Routes>
      </Flex>
    )
}