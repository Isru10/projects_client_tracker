import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
export declare class AuthController {
    private authService;
    constructor(authService: AuthService);
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
}
