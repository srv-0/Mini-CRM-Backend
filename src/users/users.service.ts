import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
// We use the Role enum from your existing auth logic or Prisma
import { Role } from '@prisma/client'; 

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  // 1. Get All Users (Hide Passwords)
  async findAll() {
    const users = await this.prisma.user.findMany({
      orderBy: { createdAt: 'desc' },
    });
    // Remove passwords from the result
    return users.map((user) => {
      const { password, ...rest } = user;
      return rest;
    });
  }

  // 2. Get One User
  async findOne(id: number) {
    const user = await this.prisma.user.findUnique({ where: { id } });
    if (!user) throw new NotFoundException('User not found');
    const { password, ...rest } = user;
    return rest;
  }

  // 3. Update User Role
  async updateRole(id: number, role: Role) {
    return this.prisma.user.update({
      where: { id },
      data: { role },
    });
  }
}