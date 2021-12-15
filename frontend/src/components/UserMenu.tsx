import { Button, Menu, MenuButton, MenuDivider, MenuItem, MenuList, useToast } from "@chakra-ui/react";
import { useNavigate } from 'react-router-dom';
import { useLoginState } from "../hooks/LoginContext";
import requestAPI from "../hooks/requestAPI";

export default function UserMenuComponent() {
    const loginState = useLoginState()
    const navigate = useNavigate()
    const toast = useToast()
    if (!loginState) return null
    return (
        <Menu>
            <MenuButton marginLeft={1} as={Button}>
                {loginState && loginState.state ? loginState.state.username[0].toUpperCase() : '?'}
            </MenuButton>
            <MenuList>
                <MenuItem>{loginState.state ? `${loginState.state.username} (${loginState.state.id}) ${loginState.state.is_admin ? "ADM" : ""}` : "Deslogado"}</MenuItem>
                <MenuDivider/>
                {loginState.state && (
                    <MenuItem onClick={loginState.signout}>Sair</MenuItem>
                )}
                {!loginState.state && (
                    <MenuItem onClick={() => navigate("/login")}>Entrar</MenuItem>
                )}
                {!loginState.state && (
                    <MenuItem onClick={() => navigate("/signup")}>Cadastrar</MenuItem>
                )}
                <MenuDivider/>
                <MenuItem onClick={() => navigate('/podcast')}>Podcasts</MenuItem>
                <MenuItem onClick={() => navigate('/')}>Página inicial</MenuItem>
                <MenuItem onClick={() => navigate('/now-playing')}>Tocando agora</MenuItem>
                {loginState.state && (
                    <MenuItem onClick={() => {
                        const url = prompt("URL do feed:")
                        if (url && url.length > 0) {
                            requestAPI(`/api/admin/create-feed?jwt=${loginState.jwt}&url=${encodeURIComponent(url)}`)
                            .catch((e: Error) => {
                                toast({
                                    title: "Erro ao adicionar/atualizar podcast",
                                    description: e.message,
                                    status: 'error'
                                })
                            })
                            .then(() => {
                                toast({
                                    title: "Podcast adicionado/atualizado com sucesso",
                                    status: 'success'
                                })
                            })
                        } else {
                            toast({
                                title: 'Nenhuma URL foi especificada',
                                description: "A operação foi cancelada",
                                status: 'warning'
                            })
                            return
                        }
                    }}>Adicionar novo feed</MenuItem>
                )}
            </MenuList>
        </Menu>
    )
}