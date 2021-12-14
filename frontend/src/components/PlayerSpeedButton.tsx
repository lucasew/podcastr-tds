import { Button, Menu, MenuButton, MenuItem, MenuList } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { usePlayerState } from "../hooks/PlayerContext";

export default function PlayerSpeedButtonComponent() {
  const playerState = usePlayerState();
  const [playbackRate, setPlaybackRate] = useState(
    playerState?.player.current.playbackRate || 1
  );
  useEffect(() => {
    if (!playerState) return;
    playerState.player.current.playbackRate = playbackRate;
  }, [playbackRate]);
  return (
    <Menu>
      <MenuButton marginLeft="5" as={Button}>
        {String(Math.floor(playbackRate * 100) / 100)}x
      </MenuButton>
      <MenuList>
        <MenuItem onClick={() => setPlaybackRate(0.5)}>0.5x</MenuItem>
        <MenuItem onClick={() => setPlaybackRate(0.75)}>0.75x</MenuItem>
        <MenuItem onClick={() => setPlaybackRate(1)}>1x</MenuItem>
        <MenuItem onClick={() => setPlaybackRate(1.25)}>1.25x</MenuItem>
        <MenuItem onClick={() => setPlaybackRate(1.5)}>1.5x</MenuItem>
        <MenuItem onClick={() => setPlaybackRate(1.75)}>1.75x</MenuItem>
        <MenuItem onClick={() => setPlaybackRate(2)}>2x</MenuItem>
        <MenuItem
          onClick={() => {
            if (!playerState) return;
            const res = prompt("Velocidade desejada:");
            if (!res) return;
            const ires = parseFloat(res);
            if (!isNaN(ires)) {
              setPlaybackRate(ires);
            }
          }}
        >
          Custom
        </MenuItem>
      </MenuList>
    </Menu>
  );
}
