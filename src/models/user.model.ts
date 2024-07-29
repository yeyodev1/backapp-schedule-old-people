import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    cellphone: {
      type: String,
      required: true, 
      unique: true,
    },
    name: {
      type: String,
      required: false,
      default: '',
    },
  }
)

export default mongoose.model('user', userSchema)