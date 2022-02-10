import mongoose from 'mongoose';
import { UserDocument } from '../user/user.model';

// mongoose docs recommend not doing this!
// another way to integrate mongoose with typescript is typegoose
export interface SessionDocument extends mongoose.Document {
  user: UserDocument['_id'];
  valid: boolean;
  userAgent: string;
  createdAt: Date;
  updatedAt: Date;
}

const sessionSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    valid: { type: Boolean, default: true },
    userAgent: {type: String}
  },
  {
    timestamps: true,
  }
);

const SessionModel = mongoose.model<SessionDocument>('Session', sessionSchema);

export default SessionModel;
