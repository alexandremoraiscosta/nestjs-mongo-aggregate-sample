import { Body, Controller, DefaultValuePipe, Get, Param, ParseIntPipe, Post, Query } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { AddOrderDto } from './dto/add-order.dto';
import { ParseObjectIdPipe } from 'src/common/pipes/parse-objectid.pipe';

@Controller('users')
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

  @Get(':id/summary')
  getSummary(@Param('id', ParseObjectIdPipe) id: string) {
    return this.usersService.getSummary(id);
  }

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
