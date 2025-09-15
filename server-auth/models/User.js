import mongoose from "mongoose";
import bcrypt from "bcrypt";

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: [true, "Please provide your first name."],
    trim: true,
  },
  lastName: {
    type: String,
    required: [true, "Please provide your last name."],
    trim: true,
  },
  email: {
    type: String,
    required: [true, "Please provide your email."],
    unique: true,
    lowercase: true,
  },
  password: {
    type: String,
    required: [true, "Please provide a password."],
    minlength: 8,
    select: false,
  },
  role: {
    type: String,
    enum: ["user", "admin"],
    default: "user",
  },
  passwordChangedAt: Date,
});

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 12);
});

userSchema.methods.correctPassword = async function (
  candidatePassword,
  hashedPassword
) {
  return await bcrypt.compare(candidatePassword, hashedPassword);
};

userSchema.methods.changedPasswordAfter = function (jwtIssuedAt) {
  if (!this.changedPasswordAfter) return false;

  const passwordChangedTimestamp = parseInt(
    this.passwordChangedAt?.getTime() / 1000,
    10
  );

  return jwtIssuedAt < passwordChangedTimestamp;
};

const User = mongoose.model("User", userSchema);

export default User;
