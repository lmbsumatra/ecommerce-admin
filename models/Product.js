import mongoose from "mongoose";
import { Schema, model } from "mongoose";

const ProductSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  price: {
    type: Number,
    required: true,
  },
  images: [{ type: String }],
});

// Check if the model already exists before defining it
export const Product =
  mongoose.models.Product || mongoose.model("Product", ProductSchema);
