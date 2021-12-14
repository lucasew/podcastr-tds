import { Button, Flex, FormControl, FormLabel, Heading, Input, useToast } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useLoginState } from "../hooks/LoginContext";
import {useNavigate} from 'react-router-dom'

export default function LoginPage() {
    const toast = useToast()
    const navigate = useNavigate()
    const loginState = useLoginState()
    const [user, setUser] = useState('')
    const [password, setPassword] = useState('')
    useEffect(() => {
        console.log(user, password)
    }, [user,password])

    function handleLogin() {
        if (!loginState) {
            toast({
                title: "Primitivas de autenticação ainda não inicializadas",
                description: "Isso é um bug",
                status: 'error'
            })
            return
        }
        loginState.login(user, password)
        .then(() => toast({
            title: "Sucesso",
            description: "Login realizado com sucesso!",
            status: 'success'
        }))
        .catch((e: Error) => toast({
            title: "Erro durante login",
            description: e.message,
            status: 'error'
        }))
    }
    return (
        <Flex direction='column' minWidth='300px' boxShadow='2xl' padding='1rem' borderRadius='lg'>
            <Heading marginLeft='1rem' marginBottom='2rem'>Login</Heading>
            <FormControl id='username' isRequired>
                <FormLabel marginLeft='1rem'>Usuário</FormLabel>
                <Input
                    value={user}
                    onChange={(e) => setUser(e.target.value)}
                    placeholder="Nome de usuário"
                />
            </FormControl>
            <FormControl id='password' isRequired>
                <FormLabel marginLeft='1rem'>Senha</FormLabel>
                <Input 
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    type='password'
                    placeholder="Nome de usuário"
                />
            </FormControl>
            <Button onClick={handleLogin} marginTop='1rem'>Enviar</Button>
            <Button onClick={() => navigate('/signup')} marginTop='1rem'>Sem conta?</Button>
        </Flex>
    )
}