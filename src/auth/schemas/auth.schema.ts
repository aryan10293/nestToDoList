import * as mongoose from 'mongoose'
import * as bcrypt from 'bcrypt'

export interface UserDocument extends mongoose.Document{
    id: String, 
    email: String, 
    name: String,
    password: String,
    age:Number
}

const AuthUserSchema = new mongoose.Schema<UserDocument>({
    id: { type: String, required: false }, 
    email: { type: String, required: true }, 
    name: { type: String, required: true},
    password: {type: String, required: true},
    age:{type: Number, required: false}
});

AuthUserSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();

  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password.toString(), salt);
    next();
  } catch (err) {
    next(err);
  }
});

// Instance method for password comparison
AuthUserSchema.methods.comparePassword = async function (candidatePassword: string) {
  return bcrypt.compare(candidatePassword, this.password);
};
export default AuthUserSchema
