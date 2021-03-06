import mongoose, { Schema } from 'mongoose';
import argon from 'argon2';

import { IUser, UserDoc, UserRole, UserModel } from '../../types';
import { CreateError, logger } from '../../utils';

const userSchema = new mongoose.Schema<IUser>(
  {
    username: {
      type: String,
      required: [true, 'Please provide a valid username.'],
      lowercase: true,
      trim: true,
      unique: true,
      minLength: [6, 'Username must be at least 6 character.'],
      maxLength: [20, 'Username must be at most 20 character.'],
    },
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
    },
    passwordChangedAt: {
      type: Schema.Types.Mixed,
      default: null,
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
      transform(_: any, ret: any) {
        ret.id = ret._id;
        delete ret._id;
        delete ret.__v;
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

userSchema.methods.verifyPassword = async function (hashedPassword: string, plainPassword: string) {
  try {
    return await argon.verify(hashedPassword, plainPassword);
  } catch (err) {
    logger.error(`Error occured when validating password. ERROR: ${err}`);
    throw CreateError.InternalServerError('Something went wrong when validating the request.');
  }
};

const User = mongoose.model<UserDoc, UserModel>('User', userSchema);

export default User;
