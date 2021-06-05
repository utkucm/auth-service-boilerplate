import mongoose, { Schema } from 'mongoose';
import argon from 'argon2';

enum UserRole {
  ADMIN = 'admin',
  USER = 'user',
}

interface IUser {
  username: string;
  email: string;
  password: string;
  emailConfirmed: boolean;
  role: UserRole;
  isDeleted: boolean;
  resetPasswordToken: string | null;
  resetPasswordTokenExpires: number | null;
}

interface UserModel extends mongoose.Model<UserDoc> {}

interface UserDoc extends mongoose.Document {
  username: string;
  email: string;
  password: string;
  emailConfirmed: boolean;
  role: UserRole;
  isDeleted: boolean;
  resetPasswordToken: string | null;
  resetPasswordTokenExpires: number | null;
}

const userSchema = new mongoose.Schema<IUser>(
  {
    email: {
      type: String,
      required: [true, 'Please provide a valid email address.'],
      unique: true,
      lowercase: true,
      trim: true,
      validate: {
        validator: function (val: string) {
          return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val);
        },
        message: () => {
          return 'Provided email is not an valid email address.';
        },
      },
    },
    password: {
      type: String,
      required: [true, 'Please provide a valid password.'],
      select: false,
    },
    emailConfirmed: {
      type: Boolean,
      default: false,
    },
    role: {
      type: String,
      default: UserRole.USER,
      enum: {
        values: [UserRole.ADMIN, UserRole.USER],
        message: '{VALUE} is not supported',
      },
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
    resetPasswordToken: {
      type: Schema.Types.Mixed,
      default: null,
    },
    resetPasswordTokenExpires: {
      type: Schema.Types.Mixed,
      default: null,
    },
  },
  {
    timestamps: true,
    toJSON: {
      transform(doc: any, ret: any) {
        ret.id = ret._id;
        delete ret._id;
        delete ret._v;
      },
    },
  }
);

userSchema.pre('save', async function (done) {
  if (this.isModified('password')) {
    const hashedPassword = await argon.hash(this.get('password'));
    this.set('password', hashedPassword);
  }
  done();
});

const User = mongoose.model<UserDoc, UserModel>('User', userSchema);

export default User;
