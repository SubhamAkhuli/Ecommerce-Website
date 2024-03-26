import mongoose from "mongoose";

const typeSchema = mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },
    type: {
        type: String,
        required: true,
        },
  },
  { timestamps: true }
);

export default mongoose.model("Type", typeSchema);
