import { Controller, Post, Body, ValidationPipe, Logger } from '@nestjs/common';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { AuthService } from './auth.service';

/**
 * Web controller for Authentication
 */
@Controller('auth')
export class AuthController {
    /**
     * Inject dependencies
     * @param authService 
     */
    constructor(private authService: AuthService) { }

    /**
     * Register a user
     * @param authCredentialsDto 
     */
    @Post('/signup')
    signUp(@Body(ValidationPipe) authCredentialsDto: AuthCredentialsDto): Promise<void> {
        return this.authService.signUp(authCredentialsDto);
    }

    /**
     * Log in a user
     * @param authCredentialsDto 
     */
    @Post('/signin')
    signIn(@Body(ValidationPipe) authCredentialsDto: AuthCredentialsDto): Promise<{ accessToken: string }> {
        return this.authService.signIn(authCredentialsDto);
    }
}
