import { MinLength, IsString, MaxLength, Matches } from 'class-validator';

/**
 * DTO for auth credentials
 */
export class AuthCredentialsDto {
    /**
     * Username the user registered with
     */
    @IsString()
    @MinLength(4)
    @MaxLength(20)
    username: string;

    /**
     * Plain text password
     */
    @IsString()
    @MinLength(8)
    @MaxLength(20)
    @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, { message: 'Password too weak' })
    password: string;
}
