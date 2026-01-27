import { Controller, Get, Body, Patch, Param, UseGuards, ParseIntPipe } from '@nestjs/common';
import { UsersService } from './users.service';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiTags, ApiOperation, ApiBody } from '@nestjs/swagger';
// You might need to create a simple DTO for role update or use an inline class
import { Role } from '../auth/dto/auth.dto'; 

@ApiTags('Users (Admin Only)')
@ApiBearerAuth()
@UseGuards(AuthGuard('jwt'))
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  @ApiOperation({ summary: 'Get all users' })
  // Add a custom guard here if you have one, or check role manually
  findAll() {
    return this.usersService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get user by ID' })
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.usersService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update user role' })
  @ApiBody({ schema: { example: { role: 'ADMIN' } } })
  updateRole(@Param('id', ParseIntPipe) id: number, @Body('role') role: Role) {
    return this.usersService.updateRole(id, role);
  }
}