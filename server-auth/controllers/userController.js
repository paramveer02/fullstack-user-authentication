import { StatusCodes } from "http-status-codes";
import User from "../models/User.js";
import { asyncWrapper } from "../utils/asyncWrapper.js";
import cloudinary from "cloudinary";
import { BadRequestError } from "../errors/customErrors.js";

// helper: promisified upload stream
const uploadBuffer = (buffer) =>
  new Promise((resolve, reject) => {
    const stream = cloudinary.v2.uploader.upload_stream(
      { folder: "user-auth/avatars" },
      (err, result) => (err ? reject(err) : resolve(result))
    );
    stream.end(buffer);
  });

export const updateMe = asyncWrapper(async (req, res) => {
  const forbidden = ["email", "password", "role"];
  for (const field of forbidden) {
    if (req.body[field] !== undefined) {
      throw new BadRequestError(`You cannot update ${field} via this route`);
    }
  }

  const allowed = ["firstName", "lastName", "email"];
  const newUser = {};
  for (const key of allowed) {
    if (req.body[key] !== undefined) newUser[key] = req.body[key];
  }

  let oldPublicAvatarId;

  if (req.file) {
    // fetch existing public avatar id to delete later
    const currentUser = await User.findById(req.user.id).select(
      "publicAvatarId"
    );
    oldPublicAvatarId = currentUser.publicAvatarId;

    // upload in memory buffer to cloudinary
    const result = await uploadBuffer(req.file.buffer);
    newUser.avatar = result.secure_url;
    newUser.publicAvatarId = result.public_id;
  }

  const updateUser = await User.findByIdAndUpdate(req.user.id, newUser, {
    new: true,
    runValidators: true,
  });

  // Delete old avatar if a new one was uploaded and there was an old avatar previously
  if (req.file && oldPublicAvatarId) {
    await cloudinary.v2.uploader.destroy(oldPublicAvatarId);
  }

  res.status(StatusCodes.OK).json({ updateUser });
});
