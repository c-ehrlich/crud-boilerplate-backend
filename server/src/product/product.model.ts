import mongoose from 'mongoose';
import { customAlphabet } from 'nanoid';
import { UserDocument } from '../user/user.model';

const nanoid = customAlphabet('abcdefghiklmnopqrstuvwxyz0123456789', 10);

// mongoose docs recommend not doing this!
// another way to integrate mongoose with typescript is typegoose
export interface ProductDocument extends mongoose.Document {
  user: UserDocument['_id']; // user who created the product
  productId: string;
  title: string;
  description: string;
  price: number;
  image: string;
  createdAt: Date;
  updatedAt: Date;
}

const productSchema = new mongoose.Schema(
  {
    productId: {
      type: String,
      required: true,
      unique: true,
      default: () => `product_${nanoid()}`,
    },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    title: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    image: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

const ProductModel = mongoose.model<ProductDocument>('Product', productSchema);

export default ProductModel;
