import React from 'react';
import PropTypes from 'prop-types';
import { ListGroup } from 'react-bootstrap';
import User from './User';

const ListaUser = props => {
    return (
        <ListGroup style={{ flexBasis: '100%', marginTop: 10, flexDirection: 'row', overflow: 'scroll' }} >
            {props.users.map(user => (
                <User key={user.id} user={user} />
            ))}
        </ListGroup>
    );
};

ListaUser.propTypes = {
    users: PropTypes.array
};

export default ListaUser;