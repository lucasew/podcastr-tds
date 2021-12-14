import { Button, IconButton } from "@chakra-ui/button";
import { Box, Flex, Heading } from "@chakra-ui/layout";
import { Image, Menu, MenuButton, MenuItem, MenuList, Text } from "@chakra-ui/react";
import e from "cors";
import { decode } from 'he';
import { useEffect, useMemo, useState } from "react";
import { FiFastForward, FiPlay, FiRewind, FiPause } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import { useLoginState } from "../hooks/LoginContext";
import nop from "../hooks/nop";
import { usePlayerState } from "../hooks/PlayerContext";
import numberToTimeExpression from "../utils/numberToTimeExpression";
import PlayerSpeedButtonComponent from "./PlayerSpeedButton";
import UserMenuComponent from "./UserMenu";

export default function PlayerComponent() {
  const playerState = usePlayerState()
  const playerEpisode = playerState?.episode.data
  const [intervalTick, setIntervalTick] = useState(0)
  const login = useLoginState()
  useEffect(() => {
    const interval = setInterval(() => {
      console.log('tick')
      setIntervalTick(i => i + 1)
    }, 1000)
    return () => clearInterval(interval)
  }, [])
  const playerPercent = useMemo(() => {
    nop(intervalTick)
    if (!playerEpisode) return 0
    if (!playerState.player.current) return 0
    if (isNaN(playerState.player.current.duration)) return 0
    const currentTime = playerState.player.current.currentTime
    const size = playerState.player.current.duration
    return currentTime / size 
  }, [intervalTick, playerEpisode, playerState?.player])
  const pos = Array(100).fill(true, 0, playerPercent).fill(false, playerPercent, 100);
  const navigate = useNavigate();
  const playerCurrentState = useMemo(() => {
    nop(intervalTick)
    if (!playerState?.episode.data) return "- / - "
    const pos = numberToTimeExpression(playerState.player.current.currentTime)
    const size = numberToTimeExpression(playerState.player.current.duration)
    console.log(pos, size)
    return `${pos} / ${size}`
  }, [intervalTick, playerState?.episode.data, playerState?.player]) 
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
              onClick={() => playerState && (playerState.player.current.currentTime -= 30)}
              aria-label="voltar"
              as={FiRewind}
            />
            <IconButton
              onClick={() => {
                if (!playerState) return
                if (playerState.player.current.paused) {
                  playerState.player.current.play()
                } else {
                  playerState.player.current.pause()
                }
              }}
              aria-label="play/pause"
              as={!playerState ? FiPlay : playerState.player.current.paused ? FiPlay : FiPause}
              marginX="1rem"
            />
            <IconButton 
              onClick={() => playerState && (playerState.player.current.currentTime += 30)}
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
