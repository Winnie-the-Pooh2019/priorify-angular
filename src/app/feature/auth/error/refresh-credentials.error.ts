import {ApplicationError} from '../../../core/error/application.error';

export class RefreshCredentialsError extends ApplicationError {
    constructor(message: string = 'Cannot refresh accessToken') {
        super(message);
    }
}
