import { Button, Flex, FormControl, FormLabel, Heading, Input, useToast } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useLoginState } from "../hooks/LoginContext";

export default function SignUpPage() {
    const [user, setUser] = useState('')
    const [password, setPassword] = useState('')
    const loginState = useLoginState()
    const toast = useToast()
    useEffect(() => {
        console.log(user, password)
    }, [user,password])
    function handleSignUp() {
        if (!loginState) {
            toast({
                title: "Primitivas de autenticação ainda não inicializadas",
                description: "Isso é um bug",
                status: 'error'
            })
            return
        }
        loginState.signup(user, password)
            .then(() => toast({
                title: "Sucesso",
                description: "Cadastro realizado com sucesso!",
                status: 'success'
            }))
            .catch((e: Error) => toast({
                title: "Erro durante cadastro",
                description: e.message,
                status: 'error'
            }))
    }
    return (
        <Flex direction='column' minWidth='300px' boxShadow='2xl' padding='1rem' borderRadius='lg'>
            <Heading marginLeft='1rem' marginBottom='2rem'>Cadastro</Heading>
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
            <Button onClick={handleSignUp} marginTop='1rem'>Enviar</Button>
        </Flex>
    )
}