import {ApplicationError} from '../../../core/error/application.error';

export class NoAccessTokenError extends ApplicationError {
    constructor(message: string = 'Access token doesn\'t exist') {
        super(message);
    }
}
