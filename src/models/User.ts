import mongoose, { Document, Schema } from 'mongoose';
import ROLES from '../types/roles';
import USER_STATUS from '../types/userStatus';

interface User extends Document {
  // id_city: Schema.Types.ObjectId;
  // followers: Schema.Types.ObjectId[];
  // following: Schema.Types.ObjectId[];
  username: string;
  email: string;
  password: string;
  name: string;
  lastname: string;
  birthdate: Date;
  role: ROLES;
  creationDate?: Date;
  status?: USER_STATUS;
  profilePic?: string;
  bio?: string;
  joinDate?: Date;
  numFollowers: number;
  numFollowing: number;
}

const UserSchema = new Schema({
  // id_city: {
  //   type: Schema.Types.ObjectId,
  //   ref: 'City',
  //   required: true,
  // },
  // followers: [
  //   {
  //     type: Schema.Types.ObjectId,
  //     ref: 'User',
  //   },
  // ],
  // following: [
  //   {
  //     type: Schema.Types.ObjectId,
  //     ref: 'User',
  //   },
  // ],
  username: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  lastname: {
    type: String,
    required: true,
  },
  birthdate: {
    type: Date,
    required: true,
  },
  role: {
    type: String,
    enum: Object.values(ROLES),
    required: true,
  },
  creationDate: {
    type: Date,
    default: Date.now,
  },
  status: {
    type: String,
    enum: Object.values(USER_STATUS),
    default: USER_STATUS.ACTIVE,
  },
  profilePic: {
    type: String,
  },
  bio: {
    type: String,
  },
  joinDate: {
    type: Date,
  },
  numFollowers: {
    type: Number,
    default: 0,
  },
  numFollowing: {
    type: Number,
    default: 0,
  },
});

const userModel = mongoose.model<User>('User', UserSchema);
export default userModel;
