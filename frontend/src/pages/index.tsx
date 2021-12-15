import { Button } from "@chakra-ui/button";
import { Flex, Heading } from "@chakra-ui/layout";
import { Icon, Text } from '@chakra-ui/react';
import { FiKey, FiSearch } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom'
import { useLoginState } from "../hooks/LoginContext";

export default function MainPage() {
    const navigate = useNavigate()
    const auth = useLoginState()
    return (
        <Flex maxWidth='md' direction='column'>
            <Heading>Bem vindo, {auth?.state?.username || "anônimo"}!</Heading>
            <Text>Opções disponíveis</Text>
            <Button onClick={() => navigate('/podcast')} marginY='1rem' leftIcon={<Icon as={FiSearch}/>}>Explorar podcasts</Button>
            <Button onClick={() => navigate('/login')} leftIcon={<Icon as={FiKey}/>}>Fazer login</Button>
        </Flex>
    )
}