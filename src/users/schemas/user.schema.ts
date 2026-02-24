import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type UserDocument = User & Document;

@Schema({ _id: false })
export class Order {
  @Prop({ required: true })
  product: string;

  @Prop({ required: true })
  amount: number;

  @Prop({ required: true })
  createdAt: Date;
}

export const OrderSchema = SchemaFactory.createForClass(Order);

@Schema({ timestamps: true })
export class User {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true, unique: true, index: true })
  email: string;

  @Prop({ type: [OrderSchema], default: [] })
  orders: Order[];
}

export const UserSchema = SchemaFactory.createForClass(User);