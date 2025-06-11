import {ApplicationError} from '../../../core/error/application.error';

export class PasswordNotEqualError extends ApplicationError {
    constructor(message: string = 'Password is not correct') {
        super(message);
    }
}
