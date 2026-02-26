import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { CreateUserDto } from './dto/create-user.dto';
import { User, UserDocument } from './schemas/user.schema';
import { AddOrderDto } from './dto/add-order.dto';

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

  async addOrder(userId: string, dto: AddOrderDto) {
    const order = {
      product: dto.product,
      amount: dto.amount,
      createdAt: new Date(dto.createdAt),
    };

    return this.userModel
      .findByIdAndUpdate(userId, { $push: { orders: order } }, { new: true })
      .exec();
  }

  async getSummary(userId: string) {
    const _id = new Types.ObjectId(userId);

    const result = await this.userModel
      .aggregate([
        { $match: { _id } },
        { $unwind: { path: '$orders', preserveNullAndEmptyArrays: true } },

        {
          $group: {
            _id: '$_id',
            ordersCount: {
              $sum: {
                $cond: [{ $ifNull: ['$orders', false] }, 1, 0],
              },
            },
            totalSpent: {
              $sum: { $ifNull: ['$orders.amount', 0] },
            },
            firstOrderAt: { $min: '$orders.createdAt' },
            lastOrderAt: { $max: '$orders.createdAt' },
          },
        },

        {
          $project: {
            _id: 0,
            userId: '$_id',
            ordersCount: 1,
            totalSpent: 1,
            avgTicket: {
              $cond: [
                { $gt: ['$ordersCount', 0] },
                { $divide: ['$totalSpent', '$ordersCount'] },
                0,
              ],
            },
            firstOrderAt: 1,
            lastOrderAt: 1,
          },
        },
      ])
      .exec();

    return result[0] ?? {
      userId,
      ordersCount: 0,
      totalSpent: 0,
      avgTicket: 0,
      firstOrderAt: null,
      lastOrderAt: null,
    };
  }

  async getTopProducts(
    userId: string,
    opts: { limit?: number; from?: string; to?: string } = {},
  ) {
    const _id = new Types.ObjectId(userId);
    const limit = opts.limit ?? 5;

    const fromDate = opts.from ? new Date(opts.from) : undefined;
    const toDate = opts.to ? new Date(opts.to) : undefined;

    const dateMatch: any = {};
    if (fromDate) dateMatch.$gte = fromDate;
    if (toDate) dateMatch.$lte = toDate;

    const pipeline: any[] = [
      { $match: { _id } },
      { $unwind: '$orders' },
    ];

    if (fromDate || toDate) {
      pipeline.push({
        $match: { 'orders.createdAt': dateMatch },
      });
    }

    pipeline.push(
      {
        $group: {
          _id: '$orders.product',
          ordersCount: { $sum: 1 },
          totalSpent: { $sum: '$orders.amount' },
        },
      },
      { $sort: { totalSpent: -1 } },
      { $limit: limit },
      {
        $project: {
          _id: 0,
          product: '$_id',
          ordersCount: 1,
          totalSpent: 1,
        },
      },
    );

    return this.userModel.aggregate(pipeline).exec();
  }

  async findAll() {
    return this.userModel.find().exec();
  }

  async findById(id: string) {
    return this.userModel.findById(id).exec();
  }
}