import { Button, Menu, MenuButton, MenuItem, MenuList } from "@chakra-ui/react";
import { usePlayerState } from "../hooks/PlayerContext";

export default function PlayerSpeedButtonComponent() {
  const playerState = usePlayerState();
  if (!playerState) return null
  const {changePlaybackSpeed, speed} = playerState
  return (
    <Menu>
      <MenuButton marginLeft="5" as={Button}>
        {String(Math.floor(speed * 100) / 100)}x
      </MenuButton>
      <MenuList>
        <MenuItem onClick={() => changePlaybackSpeed(0.5)}>0.5x</MenuItem>
        <MenuItem onClick={() => changePlaybackSpeed(0.75)}>0.75x</MenuItem>
        <MenuItem onClick={() => changePlaybackSpeed(1)}>1x</MenuItem>
        <MenuItem onClick={() => changePlaybackSpeed(1.25)}>1.25x</MenuItem>
        <MenuItem onClick={() => changePlaybackSpeed(1.5)}>1.5x</MenuItem>
        <MenuItem onClick={() => changePlaybackSpeed(1.75)}>1.75x</MenuItem>
        <MenuItem onClick={() => changePlaybackSpeed(2)}>2x</MenuItem>
        <MenuItem
          onClick={() => {
            if (!playerState) return;
            const res = prompt("Velocidade desejada:");
            if (!res) return;
            const ires = parseFloat(res);
            if (!isNaN(ires)) {
              changePlaybackSpeed(ires);
            }
          }}
        >
          Custom
        </MenuItem>
      </MenuList>
    </Menu>
  );
}
