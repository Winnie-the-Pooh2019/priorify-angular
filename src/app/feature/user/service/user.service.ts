import {inject} from '@angular/core';
import {UserRepository} from '../repository/user.repository';
import {StorageService} from '../../../core/data/storage/storage.service';
import {UserCredentials} from '../../../core/domain/model/user-credentials';
import {NoCredentialsError} from '../error/no-credentials.error';

export class UserService {
    private userRepository = inject(UserRepository);
    private storageService = inject(StorageService);

    async getUserInfo() {
        const credentials = this.storageService.getItem<UserCredentials>('credentials');
        console.log(`credentials in user service: ${JSON.stringify(credentials)}`);

        if (!credentials) {
            throw new NoCredentialsError();
        }

        const userInfo = await this.userRepository.getMyInfo();
        console.log(`userInfo in user service: ${JSON.stringify(userInfo)}`);

        return this.setUser(userInfo);
    }

    private setUser(
        userInfo: UserInfoResponse
    ) {
        const user: User = {
            id: userInfo.userId,
            firstName: userInfo.firstName,
            lastName: userInfo.lastName,
            avatarUrl: userInfo.avatarUrl
        }

        this.storageService.setItem('user', user);

        return user;
    }
}
