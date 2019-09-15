import { createParamDecorator } from '@nestjs/common';
import User from 'src/user/user.entity';

export const GetUser = createParamDecorator((data, req): User => {
    return req.user;
});
