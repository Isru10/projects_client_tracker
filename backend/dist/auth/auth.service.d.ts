import { JwtService } from '@nestjs/jwt';
import { LoginDto } from './dto/login.dto';
import { UsersService } from '../users/users.service';
export declare class AuthService {
    private jwtService;
    private usersService;
    constructor(jwtService: JwtService, usersService: UsersService);
    login(loginDto: LoginDto): Promise<{
        access_token: string;
        user: {
            id: import("mongoose").Types.ObjectId;
            username: string;
            email: string;
            role: import("../users/schemas/user.schema").UserRole;
            clientId: import("mongoose").Types.ObjectId | undefined;
        };
    }>;
    validateUser(userId: string): Promise<import("../users/schemas/user.schema").User>;
}
