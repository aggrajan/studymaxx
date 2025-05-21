import mongoose, { Schema, Document } from "mongoose";

export interface CartItem {
  product: mongoose.Types.ObjectId;
  quantity: number;
}

export interface CartInstance extends Document {
  user: mongoose.Types.ObjectId;
  items: CartItem[];
}

export const CartItemSchema: Schema<CartItem> = new Schema<CartItem>(
  {
    product: {
      type: Schema.Types.ObjectId,
      ref: "Book",
      required: true
    },
    quantity: {
      type: Number,
      required: true,
      default: 1
    }
  },
  { _id: false } // prevent automatic _id for subdocuments
);

const CartSchema: Schema<CartInstance> = new Schema<CartInstance>(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true
    },
    items: {
      type: [CartItemSchema],
      default: []
    }
  },
  { timestamps: true }
);

const CartModel = mongoose.models.Cart as mongoose.Model<CartInstance>  ||  mongoose.model<CartInstance>("Cart", CartSchema);
export default CartModel;
