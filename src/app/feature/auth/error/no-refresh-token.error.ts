import {ApplicationError} from '../../../core/error/application.error';

export class NoRefreshTokenError extends ApplicationError {
    constructor(message: string = 'Refresh token doesn\'t exist') {
        super(message);
    }
}
