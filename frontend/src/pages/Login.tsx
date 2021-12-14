import { Button, Flex, FormControl, FormLabel, Heading, Input } from "@chakra-ui/react";
import { useEffect, useState } from "react";

export default function LoginPage() {
    const [user, setUser] = useState('')
    const [password, setPassword] = useState('')
    useEffect(() => {
        console.log(user, password)
    }, [user,password])
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
            <Button marginTop='1rem'>Enviar</Button>
        </Flex>
    )
}