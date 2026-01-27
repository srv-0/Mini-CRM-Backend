import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from './prisma/prisma.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { CustomersModule } from './customers/customers.module';
import { TasksModule } from './tasks/tasks.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }), // Allows using .env variables everywhere
    PrismaModule, AuthModule, CustomersModule, TasksModule, UsersModule,                             // Connects to the Database
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}