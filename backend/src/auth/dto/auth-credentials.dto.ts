import { MinLength, IsString, MaxLength, Matches } from 'class-validator';

export class AuthCredentialsDto {
    @IsString()
    @MinLength(4)
    @MaxLength(20)
    @Matches(/[A-Za-z0-9_-]/)
    username: string;

    @IsString()
    @MinLength(8)
    @MaxLength(20)
    @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, { message: 'Password too weak' })
    password: string;
}
