import mongoose from "mongoose";
import { User } from "../type/User.js";

const User = new mongoose.Schema<User>();

export default mongoose.model("User", User);