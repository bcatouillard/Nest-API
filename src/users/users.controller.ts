import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
  Req,
} from '@nestjs/common';
import { ApiHeader, ApiTags } from '@nestjs/swagger';
import { Request } from 'express';
import { AuthService } from 'src/auth/auth.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { LocalAuthGuard } from 'src/auth/local-auth.guard';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UsersService } from './users.service';

@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(
    private readonly userService: UsersService,
    private readonly authService: AuthService,
  ) {}

  @UseGuards(LocalAuthGuard)
  @Post('auth/login')
  async login(@Req() request: Request) {
    return this.authService.login(request.user);
  }

  @UseGuards(JwtAuthGuard)
  @ApiHeader({
    name: 'Authorization',
    description: 'JWT Authorization header',
  })
  @Get()
  findAll() {
    return this.userService.findAll();
  }

  @Get(':username')
  findOne(@Param('username') username: string) {
    return this.userService.findOne(username);
  }

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @UseGuards(JwtAuthGuard)
  @ApiHeader({
    name: 'Authorization',
    description: 'JWT Authorization header',
  })
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(id, updateUserDto);
  }

  @UseGuards(JwtAuthGuard)
  @ApiHeader({
    name: 'Authorization',
    description: 'JWT Authorization header',
  })
  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.userService.delete(id);
  }
}
