import { IsEmail, IsEnum, IsMongoId, IsOptional, IsString, MinLength } from 'class-validator';
import { UserRole } from '../schemas/user.schema';

export class CreateUserDto {
    @IsString()
    @MinLength(3)
    username: string;

    @IsString()
    @MinLength(6)
    password: string;

    @IsEmail()
    email: string;

    @IsEnum(UserRole)
    role: UserRole;

    @IsOptional()
    @IsMongoId()
    clientId?: string;
}
