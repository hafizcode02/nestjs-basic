import { z } from 'zod';

export class LoginUserRequest {
  username: string;
  password: string;
}

export const LoginUserRequestValidation = z.object({
  username: z.string().min(3).max(50),
  password: z.string().min(8).max(50),
});
