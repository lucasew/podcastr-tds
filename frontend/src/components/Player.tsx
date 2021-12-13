import { IconButton } from "@chakra-ui/button"
import { Box, Flex, Heading } from "@chakra-ui/layout"
import {Image, Text} from '@chakra-ui/react'
import {FiPlay, FiFastForward, FiRewind} from 'react-icons/fi'

export default function PlayerComponent() {
    const pos = Array(100).fill(true, 0, 32).fill(false, 32, 100)
   return (
    <>
    <Flex width="100%" direction='row' height='2px'>
        {pos.map((v, idx) => <Flex key={idx} flex={1} backgroundColor={v ? 'black' : 'white'}/>)}
    </Flex>
    <Flex
        width='100%'
        height='3rem'
        alignItems='center'
        justifyContent='space-around'
    >
        <Flex alignItems='center'>
            <Image 
                maxHeight='2rem'
                src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fep01.epimg.net%2Fverne%2Fimagenes%2F2017%2F07%2F28%2Farticulo%2F1501238709_606186_1501240719_noticia_normal.jpg&f=1&nofb=1"
                marginRight='1rem'
            />
            <Flex direction='column'>
                <Heading size='sm'>Never gonna give you up</Heading>
                <Text>Rick Astley</Text>
            </Flex>
        </Flex>
        <Box>
            <IconButton
                aria-label="voltar"
                as={FiRewind}
            />
            <IconButton
                aria-label="play/pause"
                as={FiPlay}
                marginX='1rem'
            />
            <IconButton
                aria-label="avançar"
                as={FiFastForward}
            />
        </Box>
        <Text>2:50/3:56 (1x)</Text>
    </Flex>
    </>
   )
}