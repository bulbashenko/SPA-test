import ProductsClient from './products-client';
import { Product } from '@/redux/slices/productsSlice';

async function getData() {
  const res = await fetch('https://fakestoreapi.com/products');
  const data: FakeStoreProduct[] = await res.json();

  interface FakeStoreProduct {
    id: number;
    title: string;
    description: string;
    image: string;
    category: string;
  }

  const mapped: Product[] = data.map((item) => ({
    id: String(item.id),
    title: item.title,
    description: item.description,
    image: item.image,
    category: item.category,
    liked: false,
  }));

  return mapped;
}

export default async function ProductsPage() {
  const products = await getData();

  return (
    <>
      <h1 className="text-2xl font-bold mb-4">Список продуктов</h1>
      <ProductsClient serverProducts={products} />
    </>
  );
}
