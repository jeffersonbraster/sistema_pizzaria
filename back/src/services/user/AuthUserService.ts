import prismaClient from "../../prisma";
import { compare } from "bcryptjs";

interface AuthProps {
  email: string;
  password: string;
}

class AuthUserService {
  async execute({ email, password }: AuthProps) {
    const user = await prismaClient.user.findFirst({
      where: { email },
    });

    if (!user) {
      throw new Error("User/Password not found");
    }

    const isPasswordValid = await compare(password, user.password);

    if (!isPasswordValid) {
      throw new Error("User/Password not found");
    }

    return {
      user,
    };
  }
}

export { AuthUserService };
