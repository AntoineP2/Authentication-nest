import { Resolver, Query, Args, Mutation } from '@nestjs/graphql';
import { PrismaService } from '../prisma/prisma.service';
import { User } from './user.model';
import { CreateUserInput } from './dto/create-user.input';
import { comparePassword } from 'src/utils/comparePassword';
import { createJwtToken } from 'src/utils/tokenAuth';

@Resolver(() => User)
export class UsersResolver {
  constructor(private prisma: PrismaService) {}

  // @Query(() => [User], { name: 'users' })
  // async getUsers(): Promise<User[]> {
  //   return this.prisma.user.findMany();
  // }

  @Query(() => String, { name: 'userExists' })
  async getUser(
    @Args('email') email: string,
    @Args('password') password: string,
  ): Promise<string> {
    const user = await this.prisma.user.findUnique({
      where: { email },
      include: {
        UserRoles: {
          include: {
            role: true,
          },
        },
      },
    });

    if (!(await comparePassword(password, user.password))) {
      return 'Wrong password';
    }

    const token = createJwtToken(user);

    return user ? token : 'User not found';
  }

  @Mutation(() => String)
  async createUser(@Args('createUserInput') createUserInput: CreateUserInput) {
    await this.prisma.user.create({
      data: { ...createUserInput },
    });
    return 'User created';
  }
}
