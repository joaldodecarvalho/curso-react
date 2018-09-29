import * as Types from '../types/UsuarioTypes';
import UserService from '../../services/UserService.js';

const usuarioLogin = usuario => {
    return UserService.getUserData(usuario.uid).then(usuario => {
        return {
            type: Types.USUARIO_LOGIN,
            payload: usuario
        }
    })
};

const usuarioLogout = () => {
    return {
        type: Types.USUARIO_LOGOUT
    }
};

const usuarioUpdate = usuarioAtualizado => {
    return UserService.updateUserData(usuarioAtualizado).then(() => {
        return {
            type: Types.USUARIO_UPDATE,
            payload: usuarioAtualizado
        }
    })
};

export {
    usuarioLogin,
    usuarioLogout,
    usuarioUpdate
}