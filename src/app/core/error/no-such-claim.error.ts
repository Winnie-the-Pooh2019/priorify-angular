import {ApplicationError} from './application.error';

export class NoSuchClaimError extends ApplicationError {
    constructor(message: string = 'Claim doen\'t exist') {
        super(message);
    }
}
