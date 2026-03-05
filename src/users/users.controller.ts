import { Body, Controller, DefaultValuePipe, Get, Param, ParseIntPipe, Post, Query, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { AddOrderDto } from './dto/add-order.dto';
import { ParseObjectIdPipe } from 'src/common/pipes/parse-objectid.pipe';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Role } from '../auth/enums/role.enum';

@Controller({ path: 'users', version: '1' })
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  create(@Body() body: CreateUserDto) {
    return this.usersService.create(body);
  }

  @Post(':id/orders')
  addOrder(@Param('id') id: string, @Body() body: AddOrderDto) {
    return this.usersService.addOrder(id, body);
  }

  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @Get(':id')
  findById(@Param('id') id: string) {
    return this.usersService.findById(id);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.Admin)
  @Get(':id/summary')
  getSummary(@Param('id', ParseObjectIdPipe) id: string) {
    return this.usersService.getSummary(id);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.Admin)
  @Get(':id/top-products')
  getTopProducts(
    @Param('id', ParseObjectIdPipe) id: string,
    @Query('limit', new DefaultValuePipe(5), ParseIntPipe) limit: number,
    @Query('from') from?: string,
    @Query('to') to?: string,
  ) {
    return this.usersService.getTopProducts(id, { limit, from, to });
  }


}
