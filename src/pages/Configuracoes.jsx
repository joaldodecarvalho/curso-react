import React from 'react';
import { Button, Container, Form } from 'react-bootstrap';
import { connect } from 'react-redux';
import UserService from '../services/UserService';

import { usuarioUpdate } from '../state/actions/UsuarioActions';

class Configuracoes extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            displayName: '',
            userName: '',
            photoURL: ''
        }
    }

    componentDidMount() {
        this.updateUserInState(this.props.usuarioLogado)
    }

    componentDidUpdate(oldProps) {

        if (this.props.usuarioLogado !== undefined && oldProps.usuarioLogado !== this.props.usuarioLogado) {
            this.updateUserInState(this.props.usuarioLogado)
        }
    }

    updateUserInState = user => {
        this.setState({ ...user })
    };

    onChange = (event) => {
        const { value, name } = event.target;
        this.setState({
            [name]: value
        });
    };

    onSave = () => {
        UserService.updateUserData({ ...this.state }).then(() => this.props.history.goBack());
    };

    render() {
        const { displayName, userName, photoURL } = this.state;

        return (
            <Container >
                <Form>
                    <Form.Group>
                        <Form.Label>Nome</Form.Label>
                        <Form.Control name="displayName" value={displayName} onChange={this.onChange} size="sm" />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Nome de Usuário</Form.Label>
                        <Form.Control name="userName" value={userName} onChange={this.onChange} />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Url da foto</Form.Label>
                        <Form.Control name="photoURL" value={photoURL} onChange={this.onChange} />
                    </Form.Group>
                    <Button variant="success" onClick={this.onSave}>Salvar</Button>
                </Form>
            </Container>
        )
    }
}

const mapStateToProps = state => {
    return { usuarioLogado: state.usuario.usuarioAtual }
}

const mapDispatchToProps = dispatch => {
    return {
        onSave: usuarioAtualizado => {
            return dispatch(usuarioUpdate(usuarioAtualizado))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Configuracoes);
