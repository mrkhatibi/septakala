import mongoose from "mongoose";

const { Schema, model, models } = mongoose;



const SeptaUsersSchema = new Schema(
  {
    name: {
      type: String,
    },
    lastName: {
      type: String,
    },
    email: {
      type: String,
    },
    password: {
      type: String,
      required: true,
    },
    number: {
      type: Number,
      required: true,
    },

    address: {
      type: String,
    },
    productsCart: {
      type: [[{}]],
      default: [],
    },
    role: {
      type: String,
      required: true,
      default: "USER",
    },
  },
  { timestamps: true }
);

const SeptaUsers = models.SeptaUsers || model("SeptaUsers", SeptaUsersSchema);

export default SeptaUsers;
