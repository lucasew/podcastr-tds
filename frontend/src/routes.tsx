import { Flex } from "@chakra-ui/react";
import { Route, Routes } from 'react-router-dom';
import MainPage from "./pages";
import NowPlayingPage from "./pages/NowPlaying";
import PodcastPage from "./pages/Podcast";
import PodcastsPage from "./pages/Podcasts";

export default function RoutesPages() {
    return (
      <Flex flex={1} alignItems='center' justifyContent='center'>
        <Routes>
          <Route path="/" element={<MainPage/>}/>
          <Route path="/now-playing" element={<NowPlayingPage/>}/>
          <Route path="/podcast" element={<PodcastsPage/>}/>
          <Route path="/podcast/:id" element={<PodcastPage/>}/>
        </Routes>
      </Flex>
    )
}