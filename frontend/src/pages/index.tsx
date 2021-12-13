import { Button } from "@chakra-ui/button";
import { Flex, Heading } from "@chakra-ui/layout";
import {Text, Icon} from '@chakra-ui/react'
import {FiSearch, FiKey} from 'react-icons/fi'

export default function MainPage() {
    return (
        <Flex maxWidth='md' direction='column'>
            <Heading>Bem vindo, anônimo!</Heading>
            <Text>Opções disponíveis</Text>
            <Button leftIcon={<Icon as={FiSearch}/>}>Explorar podcasts</Button>
            <Button leftIcon={<Icon as={FiKey}/>}>Fazer login</Button>
        </Flex>
    )
}