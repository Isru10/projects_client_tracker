import { UserRole } from '../schemas/user.schema';
export declare class CreateUserDto {
    username: string;
    password: string;
    email: string;
    role: UserRole;
    clientId?: string;
}
