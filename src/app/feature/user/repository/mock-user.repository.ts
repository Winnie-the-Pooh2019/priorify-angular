import {UserRepository} from './user.repository';
import {Injectable} from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class MockUserRepository extends UserRepository {
    async getMyInfo(): Promise<UserInfoResponse> {
        return {
            userId: 1,
            firstName: 'Иван',
            lastName: 'Иванов',
            avatarUrl: 'https://www.w3schools.com/howto/img_avatar.png'
        }
    }
}
