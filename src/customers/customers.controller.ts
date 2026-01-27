import { Controller, Get, Post, Body, UseGuards, Query } from '@nestjs/common';
import { CustomersService } from './customers.service';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiTags, ApiQuery, ApiOperation } from '@nestjs/swagger';

@ApiTags('Customers')
@ApiBearerAuth() // Shows the Lock icon in Swagger
@UseGuards(AuthGuard('jwt')) // Protects all endpoints below
@Controller('customers')
export class CustomersController {
  constructor(private readonly customersService: CustomersService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new customer' })
  create(@Body() dto: CreateCustomerDto) {
    return this.customersService.create(dto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all customers (with optional search)' })
  @ApiQuery({ name: 'search', required: false, description: 'Search by name or email' })
  findAll(@Query('search') search?: string) {
    return this.customersService.findAll(search);
  }
}