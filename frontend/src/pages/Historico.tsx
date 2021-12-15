import { Image } from '@chakra-ui/image'
import { Flex, Heading, HStack, Stack } from '@chakra-ui/layout'
import { Button, Icon, IconButton, Text, useToast } from '@chakra-ui/react'
import { Spinner } from '@chakra-ui/spinner'
import { decode } from 'he'
import { useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useLoginState } from '../hooks/LoginContext'
import { usePlayerState } from '../hooks/PlayerContext'
import { useApiEndpoint } from '../hooks/useApiEndpoint'
import usePodcast from '../hooks/usePodcast'
import { Maybe } from '../utils/Maybe'
import {FiRefreshCw, FiCheck} from 'react-icons/fi'
import numberToTimeExpression from '../utils/numberToTimeExpression'

export default function HistoricoPage() {
    const auth = useLoginState()
    const navigate = useNavigate()
    const toast = useToast()
    const playerState = usePlayerState()
    const historico = useApiEndpoint<Array<{
        episode: {
            id: number,
            guid: string,
            title: string,
            url: string,
            icon: string,
            description: string,
            mp3url: string,
            pubDate: Date,
            duration: number
        },
        id: number,
        isListened: boolean,
        lastActivity: Date,
        position: number
    }>>(`/api/position/episode?jwt=${auth?.jwt}`)
    useEffect(() => {
        if (!auth?.jwt) {
            toast({
                title: "Acesso negado",
                description: "Página inacessível se não logado",
                status: 'error'
            })
            navigate('/')
        }
    }, [auth, navigate, toast])

    return (
        <Flex flex={1} height='100%' direction='column'>
            <Flex flex={1} direction='column' minHeight='100%'>
                <HStack justifyContent='space-between' marginX='1rem'>
                    <Heading marginLeft="10%">Episódios</Heading>
                    <IconButton
                        aria-label="atualizar"
                        as={FiRefreshCw}
                        onClick={() => historico.refetch()}
                    />
                </HStack>
                <Flex flex={1} direction='column' alignItems='center' height='100%'>
                { !historico.data ? (
                    <Spinner margin='auto' size='xl' />
                ) : (
                historico.data?.map(v => {
                    const e = v.episode
                    return (
                        <Button
                            key={e.id}
                            // as={Button}
                            onClick={() => playerState?.jumpToItem(e.id)}
                            width='calc(90vw)'
                            boxSize='max-content'
                            alignItems='flex-start'
                            padding='5px'
                            margin='5px'
                        >
                            <Image src={e.icon} width='100px' />
                            <Stack alignSelf='flex-start' justifyContent='space-between' marginLeft='0.5rem'>
                                <Heading
                                    width='60vw'
                                    alignSelf='flex-start'
                                    size='sm'
                                    marginLeft='1rem'
                                    overflow='hidden'
                                    textOverflow='ellipsis'
                                >{decode(e.title)}</Heading>
                                <HStack justifyContent='space-around'>
                                    {v.isListened ? <Icon as={FiCheck} /> : null}
                                    <Text>{numberToTimeExpression(v.position)} / {numberToTimeExpression(v.episode.duration)}</Text>
                                </HStack>
                                <Text
                                    width='60vw' 
                                    fontWeight='normal'
                                    textAlign='justify'
                                    whiteSpace='normal'
                                    maxHeight='40vh'
                                    overflow='hidden'
                                    textOverflow='ellipsis'
                                >{decode(e.description)}</Text>
                                <div/>
                            </Stack>
                        </Button>
                    )
                }))}
                </Flex>
            </Flex>
        </Flex>
    )
}