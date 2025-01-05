'use client';

import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addProduct } from '@/redux/slices/productsSlice';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from '@/components/ui/select';

const categories = [
  'electronics',
  'jewelery',
  "men's clothing",
  "women's clothing",
];

export default function CreateProductPage() {
  const dispatch = useDispatch();
  const router = useRouter();

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState('');
  const [category, setCategory] = useState('electronics');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !description.trim() || !image.trim()) {
      alert('Заполните все поля');
      return;
    }

    dispatch(
      addProduct({
        id: Math.random().toString(36).slice(2, 9),
        title,
        description,
        image,
        category,
        liked: false,
      })
    );
    router.push('/products');
  };

  return (
    <>
      <h1 className="text-2xl font-bold mb-4">Создать продукт</h1>
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
              <SelectValue placeholder="Категория" />
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
    </>
  );
}
