import React, { Component } from 'react';
import { Button, Container, Row } from 'react-bootstrap';
import ListaTweet from '../components/ListaTweet';
import UserService from '../services/UserService';
import TweetService from '../services/TweetService';
import { connect } from 'react-redux'

class Perfil extends Component {

    state = {
        user: {}
    }

    componentDidMount() {

        const { id } = this.props.match.params;

        UserService.getUserData(id)
            .then(user => {
                this.setState({ user: user })
                return user;
            })
            .then(user => TweetService.getUserTweets(user))
            .then(tweets => this.setState({ tweets: tweets }))
    }

    onFollow = () => {
        const { user } = this.state

        UserService.followUser(user).then(result => console.log(result))
    }

    render() {
        const { user, tweets } = this.state;
        const { usuarioLogado } = this.props;

        return (
            <Container>
                <Row className="profile-section">
                    <img src={user.photoURL} alt="foto do perfil do usuário"
                        className="profile-photo" />
                    <div className="profile-data">
                        <span>{user.displayName}</span>
                        <span>{`@${user.userName}`}</span>
                    </div>
                    {usuarioLogado && user && usuarioLogado.uid !== user.uid ?
                        <div className="ml-auto">
                            <Button onClick={this.onFollow}>Seguir</Button>
                        </div>
                        : null}
                </Row>
                <Row>
                    <ListaTweet tweets={tweets} />
                </Row>
            </Container>
        );
    }
}

const mapStateToProps = state => {
    return { usuarioLogado: state.usuario.usuarioAtual }
}

export default connect(mapStateToProps)(Perfil);
