import { useEffect } from "react"
import { useLoginState } from "../hooks/LoginContext"
import {useNavigate} from 'react-router-dom'
import { useToast } from "@chakra-ui/toast"
import { Flex, Heading, useTimeout } from "@chakra-ui/react"

export default function HistoricoPage() {
    const auth = useLoginState()
    const navigate = useNavigate()
    const toast = useToast()
    useEffect(() => {
        if (!auth?.jwt) {
            toast({
                title: "Acesso negado",
                description: "Página inacessível se não logado",
                status: 'error'
            })
            navigate('/')
        }
    }, [auth])
    return (
        <Flex flex={1}>
            <Heading>Histórico</Heading>
        </Flex>
    )
}