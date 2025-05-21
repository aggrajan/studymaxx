import mongoose, { Schema, Document } from "mongoose";

export interface WishlistItem {
  product: mongoose.Types.ObjectId;
}

export interface WishlistInstance extends Document {
  user: mongoose.Types.ObjectId;
  items: WishlistItem[];
}

const WishlistItemSchema: Schema<WishlistItem> = new Schema<WishlistItem>(
  {
    product: {
      type: Schema.Types.ObjectId,
      ref: "Book",
      required: true
    }
  },
  { _id: false } // prevent automatic _id for subdocuments
);

const WishlistSchema: Schema<WishlistInstance> = new Schema<WishlistInstance>(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true
    },
    items: {
      type: [WishlistItemSchema],
      default: []
    }
  },
  { timestamps: true }
);

const WishlistModel = mongoose.models.Wishlist as mongoose.Model<WishlistInstance> || mongoose.model<WishlistInstance>("Wishlist", WishlistSchema);
export default WishlistModel;
