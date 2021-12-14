import { Image } from '@chakra-ui/image'
import { Flex, Heading, HStack, Stack } from '@chakra-ui/layout'
import { Button, Text } from '@chakra-ui/react'
import { Spinner } from '@chakra-ui/spinner'
import { decode } from 'he'
import { useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { usePlayerState } from '../hooks/PlayerContext'
import usePodcast from '../hooks/usePodcast'

export default function PodcastPage() {
    const params = useParams()
    const navigate = useNavigate()
    const id = parseInt(String(params.id))
    const podcast = usePodcast(id)
    const playerState = usePlayerState()
    useEffect(() => {
        if (isNaN(id)) {
            navigate("/")
        }
    }, [id, navigate])
    if (!podcast.data) {
        return (
            <Spinner />
        )
    }
    return (
        <Flex flex={1} height='100%' direction='column'>
            <Flex>
                <Image width='100' height='100' src={podcast.data.icon} />
                <Flex direction='column' marginLeft='1rem'>
                    <Heading>{podcast.data.title}</Heading>
                    <Text>{podcast.data.description}</Text>
                </Flex>
            </Flex>
            <Flex flex={1} direction='column'>
                <Heading marginLeft="10%">Episódios</Heading>
                <Flex flex={1} direction='column' alignItems='center'>
                {podcast.data.episodes.map(e => {
                    return (
                        <HStack
                            key={e.id}
                            as={Button}
                            onClick={() => playerState?.jumpToItem(e.id)}
                            width='calc(90vw)'
                            boxSize='max-content'
                            alignItems='flex-start'
                            padding='5px'
                            margin='5px'
                        >
                            <Image src={e.icon} width='100px' />
                            <Stack alignSelf='flex-start' justifyContent='space-between'>
                                <Heading
                                    width='60vw'
                                    alignSelf='flex-start'
                                    size='sm'
                                >{decode(e.title)}</Heading>
                                <Text
                                    width='60vw' 
                                    fontWeight='normal'
                                    textAlign='justify'
                                    whiteSpace='normal'
                                    textOverflow='ellipsis'
                                >{decode(e.description)}</Text>
                                <div/>
                            </Stack>
                        </HStack>
                    )
                })}
                </Flex>
            </Flex>
        </Flex>
    )
}