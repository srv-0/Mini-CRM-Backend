import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateCustomerDto } from './dto/create-customer.dto';

@Injectable()
export class CustomersService {
  constructor(private prisma: PrismaService) {}

  // CREATE Customer
  async create(dto: CreateCustomerDto) {
    return this.prisma.customer.create({
      data: dto,
    });
  }

  // GET All Customers (With Pagination & Search)
  async findAll(page: number = 1, limit: number = 10, search?: string) {
    const skip = (page - 1) * limit;

    const whereCondition = search ? {
      OR: [
        { name: { contains: search, mode: 'insensitive' as const } },
        { email: { contains: search, mode: 'insensitive' as const } },
      ],
    } : {};

    // 1. Get Total Count
    const totalRecords = await this.prisma.customer.count({ where: whereCondition });

    // 2. Get Data
    const data = await this.prisma.customer.findMany({
      where: whereCondition,
      skip,
      take: Number(limit),
      orderBy: { createdAt: 'desc' },
    });

    // 3. Return Formatted Response
    return {
      page: Number(page),
      limit: Number(limit),
      totalRecords,
      totalPages: Math.ceil(totalRecords / limit),
      data,
    };
  }

  // UPDATE Customer (Added this)
  async update(id: number, dto: CreateCustomerDto) {
    return this.prisma.customer.update({
      where: { id },
      data: dto,
    });
  }

  // DELETE Customer (Added this)
  async remove(id: number) {
    return this.prisma.customer.delete({
      where: { id },
    });
  }
}