import { Controller } from '@nestjs/common';
import { Param } from '@nestjs/common';
import { Query } from '@nestjs/graphql';
import { User } from '@prisma/client';

@Controller('users')
export class UsersController {
  @Query(':id')
  async getUser(@Param('id') id: string): Promise<User> {
    return {
      id: id,
      firstName: 'John',
      lastName: 'Doe',
      email: 'Antoinepadovani@gmail.com',
      password: 'password',
      trigramme: 'APD',
    };
  }
}
