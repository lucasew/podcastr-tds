import { Flex, Heading } from "@chakra-ui/layout";
import { Icon, Text, Image } from '@chakra-ui/react';
import { FiPower } from 'react-icons/fi';
import { usePlayerState } from "../hooks/PlayerContext";

export default function NowPlayingPage() {
    const playerState = usePlayerState()
    if (!playerState?.episode.data) {
        return (
            <Flex direction='column'>
                <Heading>Tocando agora</Heading>
                <Flex alignItems='center' justifyContent='center'>
                    <Icon as={FiPower} marginRight='.5rem' />
                    <Text>Nada</Text>
                </Flex>
            </Flex>
        )
    }
    return (
        <Flex direction='column'>
            <Heading>Tocando agora</Heading>
            <Image src={playerState.episode.data.icon || playerState.episode.data.__podcast__.icon || ""} width='50vw'/>
        </Flex>
    )
}