export abstract class JwtService {
    abstract getClaim<T>(token: string, key: string): T;
}
