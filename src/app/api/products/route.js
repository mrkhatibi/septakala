import septaProducts from "@/models/Products";
import ConnectDB from "@/utils/ConnectDB";
import fs from "fs";
import path from "path";

export const config = {
  api: {
    bodyParser: false, // مهم برای فایل
  },
};

export async function POST(req) {
  await ConnectDB();

  // گرفتن FormData از request
  const formData = await req.formData();

  const name = formData.get("name");
  const price = Number(formData.get("price"));
  const quantity = Number(formData.get("quantity"));
  const description = formData.get("description");
  const category = formData.get("category");
  const features = formData.getAll("features");

  const images = formData.getAll("images"); // فایل‌ها به صورت Blob

  const imagePaths = [];

  for (const image of images) {
    const arrayBuffer = await image.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    const filename = Date.now() + "-" + image.name;
    const filepath = path.join("public/uploads", filename);

    // مطمئن شو پوشه وجود داره
    fs.mkdirSync(path.dirname(filepath), { recursive: true });
    fs.writeFileSync(filepath, buffer);
    imagePaths.push(`/uploads/${filename}`);
  }

  const newProduct = await septaProducts.create({
    name,
    price,
    quantity,
    description,
    category,
    features,
    images: imagePaths,
  });

  return new Response(JSON.stringify(newProduct), { status: 201 });
}
