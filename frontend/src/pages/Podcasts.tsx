import { useApiEndpoint } from "../hooks/useApiEndpoint"
import {Flex, Heading, Spinner, Image, Text, Button} from '@chakra-ui/react'
import { Maybe } from "../utils/Maybe"
import {Link} from 'react-router-dom'

export default function PodcastsPage() {
    const podcasts = useApiEndpoint<{
        feed: string,
        homepage: string,
        icon: string,
        id: number,
        description: Maybe<string>,
        title: string
    }[]>('/api/public/podcast')
    console.log(podcasts.data)
    if (!podcasts.data) {
        return (
            <Spinner/>
        )
    }
    return (
        <Flex flex={1} direction='row' wrap='wrap' justifyContent='center'>
            {podcasts.data.map(v => {
                return (
                    <Button as={Link} to={`/podcast/${v.id}`} boxSize='fit-content' margin='1rem' padding='1rem' flexDirection='column'>
                        <Image maxWidth='100' maxHeight='100' src={v.icon} alignSelf='center'/>
                        <Heading size='md'>{v.title}</Heading>
                    </Button>
                )
            })}
        </Flex>
    )
}