import { Injectable, ForbiddenException, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateTaskDto, UpdateTaskStatusDto } from './dto/task.dto';

@Injectable()
export class TasksService {
  constructor(private prisma: PrismaService) {}

  // CREATE
  async create(dto: CreateTaskDto) {
    return this.prisma.task.create({
      data: dto,
    });
  }

  // GET TASKS (Role Based)
  async findAll(user: any) {
    if (user.role === 'ADMIN') {
      // Admin sees ALL tasks
      return this.prisma.task.findMany({
        include: { assignedTo: true, customer: true },
      });
    } else {
      // Employee sees ONLY their assigned tasks
      return this.prisma.task.findMany({
        where: { assignedToId: user.userId },
        include: { assignedTo: true, customer: true },
      });
    }
  }

  // UPDATE STATUS
  async updateStatus(id: number, dto: UpdateTaskStatusDto, user: any) {
    // 1. Find the task
    const task = await this.prisma.task.findUnique({ where: { id } });
    if (!task) throw new NotFoundException('Task not found');

    // 2. Check Permissions
    if (user.role !== 'ADMIN' && task.assignedToId !== user.userId) {
      throw new ForbiddenException('You can only update your own tasks');
    }

    // 3. Update
    return this.prisma.task.update({
      where: { id },
      data: { status: dto.status },
    });
  }
}