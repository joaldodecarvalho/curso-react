import React, { Component } from 'react';
import { Button, Container, Form, FormControl, InputGroup, Row, Alert } from 'react-bootstrap';
import ListaTweet from '../components/ListaTweet';
import ListaUser from '../components/ListaUser';
import UserService from '../services/UserService';
import TweetService from '../services/TweetService'
import { connect } from 'react-redux';

class Home extends Component {

    state = {
        currentPost: '',
        alertVisible: false,
        users: [],
        tweets: []
    };

    componentDidMount() {
        UserService.getAllUsers().then(users => this.setState({ users: users }))

        const { usuarioLogado } = this.props

        if (usuarioLogado !== undefined) {
            this.getUserFeed(usuarioLogado)
        }
    }

    componentDidUpdate(oldProps) {
        const { usuarioLogado } = this.props

        if (usuarioLogado !== oldProps.usuarioLogado && usuarioLogado !== undefined) {
            this.getUserFeed(usuarioLogado)
        }
    }

    getUserFeed = (user) => {
        TweetService.getUserFeed(user).then(tweets => this.setState({ tweets }));
    }

    onChange = event => this.setState({ currentPost: event.target.value })

    onPost = () => {

        const { usuarioLogado } = this.props;

        if (!usuarioLogado) {
            this.setState({ alertVisible: true })
            return;
        }

        const { currentPost } = this.state;

        this.setState({ currentPost: '', alertVisible: false }, () => {
            TweetService.newTweet(currentPost)
                .then(() => setTimeout(() => this.getUserFeed(usuarioLogado), 1000))
        })
    };

    render() {

        const { currentPost, alertVisible, users, tweets } = this.state;

        return (
            <Container style={{ marginTop: 30 }}>
                <ListaUser users={users} />
                <Alert variant="danger" defaultShow={alertVisible}>
                    Você deve estar logado para postar alguma coisa.
                </Alert>
                <Form>
                    <Row>
                        <span className="ml-auto">{currentPost.length} / 140</span>
                        <InputGroup>
                            <FormControl as="textarea" aria-label="With textarea" maxLength={140}
                                value={currentPost} onChange={this.onChange} />
                        </InputGroup>
                    </Row>
                    <Row style={{ justifyContent: 'flex-end', marginTop: 10 }}>
                        <Button variant="primary" onClick={this.onPost}>Postar</Button>
                    </Row>

                    <Row>
                        <ListaTweet tweets={tweets} />
                    </Row>
                </Form>
            </Container>
        )
    }
}

const mapStateToProps = state => {
    return { usuarioLogado: state.usuario.usuarioAtual }
}

export default connect(mapStateToProps)(Home);
