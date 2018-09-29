import React from 'react'
import { Navbar, Nav, Button } from 'react-bootstrap';
import { NavLink, withRouter } from 'react-router-dom';
import { connect } from 'react-redux'
import AuthService from '../services/AuthService';

const Header = (props) => {

    const { usuarioLogado } = props;

    const logado = usuarioLogado !== undefined;

    const onLogin = () => {
        AuthService.loginWithGoogle();
    };

    const onLogout = () => {
        AuthService.logout();
        props.history.push('/')
    };

    return (
        <Navbar bg="primary" variant="dark">
            <NavLink to="/" className="navbar-brand">Twitter</NavLink>
            <Nav className="ml-auto">
                {
                    logado ? (
                        <div>
                            <Button variant="light" style={{ marginRight: 10 }}><NavLink to="/configuracao">Configurações</NavLink></Button>
                            <Button variant="light" style={{ marginRight: 10 }}><NavLink to={`/perfil/${usuarioLogado.uid}`}>Meu perfil</NavLink></Button>
                            <Button variant="danger" onClick={onLogout}>Sair</Button>
                        </div>
                    ) :
                        (
                            <Button variant="success" onClick={onLogin}>Login</Button>
                        )
                }
            </Nav>
        </Navbar>
    )
};

const mapStateToProps = (state) => {
    return { usuarioLogado: state.usuario.usuarioAtual }
}

export default connect(mapStateToProps)(withRouter(Header));
