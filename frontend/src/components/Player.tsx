import { IconButton } from "@chakra-ui/button";
import { Box, Flex, Heading } from "@chakra-ui/layout";
import { Image, Text } from "@chakra-ui/react";
import { useMemo } from "react";
import { FiPlay, FiFastForward, FiRewind } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import { usePlayerState } from "../hooks/PlayerContext";

export default function PlayerComponent() {
  const playerState = usePlayerState()
  const playerEpisode = playerState?.episode.data
  const playerPercent = useMemo(() => {
    if (!playerEpisode) return 0
    const rawPercentage = playerState.position / playerEpisode.duration
    return rawPercentage > 100 ? 100 : rawPercentage
  }, [playerState])
  const pos = Array(100).fill(true, 0, playerPercent).fill(false, playerPercent, 100);
  const navigate = useNavigate();
  return (
    <>
      <Flex width="100%" direction="row" height="2px">
        {pos.map((v, idx) => (
          <Flex key={idx} flex={1} backgroundColor={v ? "black" : "white"} />
        ))}
      </Flex>
      <Flex
        width="100%"
        alignItems="center"
        justifyContent="space-around"
        flexWrap="wrap"
      >
        <Flex
          alignItems="center"
          onClick={() => navigate('now-playing')}
          cursor='pointer'
        >
          <Image
            height="2rem"
            src={playerEpisode?.icon || ""}
            marginRight="1rem"
          />
          <Flex direction="column">
            <Heading size="sm">{playerEpisode?.title || "* Nada *"}</Heading>
            <Text>{playerEpisode?.__podcast__?.title || "* Ninguém *"}</Text>
          </Flex>
        </Flex>
        <Box>
          <IconButton aria-label="voltar" as={FiRewind} />
          <IconButton aria-label="play/pause" as={FiPlay} marginX="1rem" />
          <IconButton aria-label="avançar" as={FiFastForward} />
        </Box>
        <Text>2:50/3:56 (1x)</Text>
      </Flex>
    </>
  );
}
