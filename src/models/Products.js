import { model, models, Schema } from "mongoose";

const septaProductsSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    category: {
      type: String,
      enum: [
        "الکترونیک",
        "پوشاک",
        "کفش",
        "زیورآلات و اکسسوری",
        "سلامت و زیبایی",
        "خانه و آشپزخانه",
        "کتاب و لوازم تحریر",
        "ورزش و سرگرمی",
        "مواد غذایی و نوشیدنی",
        "ابزار و خودرو",
                "متفرقه"

      ],
      required : true
    },
    features: {
      type: [String],
      default: [],
    },
    price: {
      type: Number,
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
    },
    description: {
      type: String,
      required: true,
      trim: true,
    },
    images: {
      type: [String], 
      default: [],
    },
  },
  { timestamps: true }
);

const septaProducts =
  models.septaProducts || model("septaProducts", septaProductsSchema);
export default septaProducts;
