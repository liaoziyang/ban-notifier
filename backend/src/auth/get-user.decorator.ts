import { createParamDecorator } from '@nestjs/common';
import User from 'src/user/user.entity';

/**
 * Custom decorator to get User from a request
 */
export const GetUser = createParamDecorator((data, req): User => {
    return req.user;
});
