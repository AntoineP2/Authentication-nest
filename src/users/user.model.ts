import { Field, ObjectType } from '@nestjs/graphql';
import { UserRole } from './userRole.model';

@ObjectType()
export class User {
  @Field(() => String)
  id: string;

  @Field({ nullable: false })
  firstName: string;

  @Field({ nullable: false })
  lastName: string;

  @Field({ nullable: false })
  email: string;

  @Field({ nullable: false })
  password: string;

  @Field({ nullable: false })
  trigramme: string;

  @Field(() => [UserRole])
  UserRoles: UserRole[];
}
