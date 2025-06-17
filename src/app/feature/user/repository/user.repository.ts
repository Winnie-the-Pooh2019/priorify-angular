export abstract class UserRepository {
    abstract getMyInfo(): Promise<UserInfoResponse>
}
