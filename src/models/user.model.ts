import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import config from 'config';
import { isElement } from 'lodash';

// mongoose docs recommend not doing this!
// another way to integrate mongoose with typescript is typegoose
export interface UserDocument extends mongoose.Document {
  email: string;
  name: string;
  password: string;
  createdAt: Date;
  updatedAt: Date;
  comparePassword(candidatePassword: string): Promise<boolean>,
}

const userSchema = new mongoose.Schema(
  {
    email: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    password: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

userSchema.pre('save', async function (next) {
  let user = this as UserDocument; // don't have to reference this directly

  // password is not being modified
  if (!user.isModified('password')) {
    return next();
  }

  // password is being modified. hash it
  const salt = await bcrypt.genSalt(config.get<number>('saltWorkFactor'));
  const hash = await bcrypt.hashSync(user.password, salt);
  user.password = hash;
  return next();
});

// check if input password is correct
userSchema.methods.comparePassword = async function (
  candidatePassword: string
): Promise<boolean> {
  const user = this as UserDocument;
  return bcrypt.compare(candidatePassword, user.password).catch((e) => false);
};

const UserModel = mongoose.model('User', userSchema);

export default UserModel;
