import { IconButton } from "@chakra-ui/button";
import { Box, Flex, Heading } from "@chakra-ui/layout";
import { Image, Text } from "@chakra-ui/react";
import { decode } from 'he';
import { useMemo } from "react";
import { FiFastForward, FiPause, FiPlay, FiRewind } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import { usePlayerState } from "../hooks/PlayerContext";
import numberToTimeExpression from "../utils/numberToTimeExpression";
import PlayerSpeedButtonComponent from "./PlayerSpeedButton";
import UserMenuComponent from "./UserMenu";

export default function PlayerComponent() {
  const navigate = useNavigate();
  const playerState = usePlayerState()
  const playerEpisode = playerState?.episode.data
  const playerCurrentState = useMemo(() => {
    if (!playerState) return
    if (!playerEpisode) {
      return "- / -"
    }
    const pos = numberToTimeExpression(playerState.position)
    const len = numberToTimeExpression(playerState.length)
    return `${pos} / ${len}`
  }, [playerEpisode, playerState])
  const playerPercent = Math.floor((playerState ? playerState.position / playerState.length : 0) * 100)
  const pos = useMemo(() => {
    return Array(100).fill(true, 0, playerPercent).fill(false, playerPercent, 100)
  }, [playerPercent]);
  if (!playerState) return null
  return (
    <>
      <Flex width="100%" direction="row" height="2px">
        {pos.map((v, idx) => (
          <Flex key={idx} flex={1} backgroundColor={v ? "black" : "white"} />
        ))}
      </Flex>
      <Flex
        alignItems="center"
        justifyContent="space-between"
        marginX='1rem'
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
            <Heading size="sm">{decode(playerEpisode?.title || "* Nada *")}</Heading>
            <Text>{decode(playerEpisode?.__podcast__?.title || "* Ninguém *")}</Text>
          </Flex>
        </Flex>
        <Flex alignItems='center'>
          <Box>
            <IconButton
              onClick={() => playerState.jumpToPositionDelta(-30)}
              aria-label="voltar"
              as={FiRewind}
            />
            <IconButton
              onClick={() => playerState.togglePlayPause()}
              aria-label="play/pause"
              as={playerState.isPaused ? FiPlay : FiPause}
              marginX="1rem"
            />
            <IconButton 
              onClick={() => playerState.jumpToPositionDelta(30)}
              aria-label="avançar"
              as={FiFastForward}
            />
          </Box>
        </Flex>
        <Flex alignItems='center'>
          <Text marginX='1rem'>{playerCurrentState}</Text>
          <PlayerSpeedButtonComponent />
          <UserMenuComponent />
        </Flex>
      </Flex>
    </>
  );
}
