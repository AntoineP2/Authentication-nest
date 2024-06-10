import * as jwt from 'jsonwebtoken';

export const createJwtToken = (user) => {
  console.log(user);
  const userRole = user.UserRoles.map((role) => role.role.roleName);
  const token = jwt.sign(
    {
      userLastName: user.lastName,
      userFirstName: user.firstName,
      userTrigramme: user.trigramme,
      userRole: userRole,
      userEmail: user.email,
    },
    'mdpSecret',
    { expiresIn: '24h' },
  );
  return token;
};
