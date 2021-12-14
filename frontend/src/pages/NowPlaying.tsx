import { Flex, Heading } from "@chakra-ui/layout";
import { Icon, Text } from '@chakra-ui/react';
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
        <>
            <Heading>Now playing</Heading>
        </>
    )
}