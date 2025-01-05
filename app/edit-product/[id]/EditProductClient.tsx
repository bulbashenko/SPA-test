"use client";

import { useState } from "react";
import { Product, updateProduct } from "@/redux/slices/productsSlice";
import { useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const categories = [
  "electronics",
  "jewelery",
  "men's clothing",
  "women's clothing",
];

interface EditProductClientProps {
  product: Product;
}

export default function EditProductClient({ product }: EditProductClientProps) {
  const dispatch = useDispatch();
  const router = useRouter();

  const [title, setTitle] = useState(product.title);
  const [description, setDescription] = useState(product.description);
  const [image, setImage] = useState(product.image);
  const [category, setCategory] = useState(product.category);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    dispatch(
      updateProduct({
        ...product,
        title,
        description,
        image,
        category,
      })
    );
    router.push("/products");
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Редактировать продукт</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4 max-w-md">
        <div>
          <label className="block mb-1">Название</label>
          <Input value={title} onChange={(e) => setTitle(e.target.value)} />
        </div>
        <div>
          <label className="block mb-1">Описание</label>
          <Textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <div>
          <label className="block mb-1">Ссылка на изображение</label>
          <Input value={image} onChange={(e) => setImage(e.target.value)} />
        </div>
        <div>
          <label className="block mb-1">Категория</label>
          <Select value={category} onValueChange={(val) => setCategory(val)}>
            <SelectTrigger>
              <SelectValue placeholder="Выбрать категорию" />
            </SelectTrigger>
            <SelectContent>
              {categories.map((cat) => (
                <SelectItem key={cat} value={cat}>
                  {cat}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <Button type="submit">Сохранить</Button>
      </form>
    </div>
  );
}
