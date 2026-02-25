import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateUserDto } from './dto/create-user.dto';
import { User, UserDocument } from './schemas/user.schema';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name)
    private userModel: Model<UserDocument>,
  ) {}

  async create(dto: CreateUserDto) {
    const orders = (dto.orders ?? []).map((o) => ({
      product: o.product,
      amount: o.amount,
      createdAt: new Date(o.createdAt),
    }));

    return this.userModel.create({
      name: dto.name,
      email: dto.email,
      orders,
    });
  }

  async findAll() {
    return this.userModel.find().exec();
  }

  async findById(id: string) {
    return this.userModel.findById(id).exec();
  }
}