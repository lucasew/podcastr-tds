import { Button, Menu, MenuButton, MenuDivider, MenuGroup, MenuItem, MenuList } from "@chakra-ui/react";
import { useLoginState } from "../hooks/LoginContext";
import {useNavigate} from 'react-router-dom'

export default function UserMenuComponent() {
    const loginState = useLoginState()
    const navigate = useNavigate()
    console.log(loginState)
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
            </MenuList>
        </Menu>
    )
}