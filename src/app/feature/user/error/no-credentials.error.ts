import {ApplicationError} from '../../../core/error/application.error';

export class NoCredentialsError extends ApplicationError {
    constructor(message: string = 'There are no credentials in storage') {
        super(message);
    }
}
