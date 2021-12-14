import { Image } from '@chakra-ui/image'
import {Button, Text} from '@chakra-ui/react'
import { Box, Center, Flex, Heading, HStack, Stack } from '@chakra-ui/layout'
import { Spinner } from '@chakra-ui/spinner'
import { useEffect } from 'react'
import {useParams, useNavigate} from 'react-router-dom'
import usePodcast from '../hooks/usePodcast'
import {decode} from 'he'

export default function PodcastPage() {
    const params = useParams()
    const navigate = useNavigate()
    const id = parseInt(String(params.id))
    const podcast = usePodcast(id)
    useEffect(() => {
        if (isNaN(id)) {
            navigate("/")
        }
    }, [])
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
                            as={Button}
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