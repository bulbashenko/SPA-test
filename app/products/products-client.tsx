'use client';

import { useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
import { setProducts } from '@/redux/slices/productsSlice';
import ProductCard from '@/components/ProductCard';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Product } from '@/redux/slices/productsSlice';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

const categories = [
  'all',
  'electronics',
  'jewelery',
  "men's clothing",
  "women's clothing",
];

interface Props {
  serverProducts: Product[];
}

export default function ProductsClient({ serverProducts }: Props) {
  const dispatch = useDispatch();
  const products = useSelector((state: RootState) => state.products.data);

  // Состояния
  const [searchTerm, setSearchTerm] = useState('');
  const [showOnlyLiked, setShowOnlyLiked] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('all');

  // Пагинация
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 6;

  // Инициализация
  useEffect(() => {
    if (products.length === 0) {
      dispatch(setProducts(serverProducts));
    }
  }, [serverProducts, products, dispatch]);

  const likedFiltered = useMemo(() => {
    return showOnlyLiked ? products.filter((p) => p.liked) : products;
  }, [products, showOnlyLiked]);

  const searchFiltered = useMemo(() => {
    const lower = searchTerm.toLowerCase();
    return likedFiltered.filter(
      (p) =>
        p.title.toLowerCase().includes(lower) ||
        p.description.toLowerCase().includes(lower)
    );
  }, [likedFiltered, searchTerm]);

  const categoryFiltered = useMemo(() => {
    if (selectedCategory === 'all') return searchFiltered;
    return searchFiltered.filter((p) => p.category === selectedCategory);
  }, [searchFiltered, selectedCategory]);

  const finalProducts = categoryFiltered;

  const totalPages = Math.ceil(finalProducts.length / pageSize);
  const pagedProducts = useMemo(() => {
    const startIndex = (currentPage - 1) * pageSize;
    return finalProducts.slice(startIndex, startIndex + pageSize);
  }, [finalProducts, currentPage]);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1);
  };

  const handleCategoryChange = (val: string) => {
    setSelectedCategory(val);
    setCurrentPage(1);
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col md:flex-row items-start md:items-center gap-2 md:gap-4">
        <Button variant="outline" onClick={() => setShowOnlyLiked((p) => !p)}>
          {showOnlyLiked ? 'Показать все' : 'Показать избранное'}
        </Button>
        <Input
          placeholder="Поиск..."
          value={searchTerm}
          onChange={handleSearch}
          className="w-full max-w-xs"
        />
        <Select onValueChange={handleCategoryChange} value={selectedCategory}>
          <SelectTrigger className="w-[180px]">
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

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {pagedProducts.map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>

      {totalPages > 1 && (
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
            disabled={currentPage === 1}
          >
            Назад
          </Button>
          <span className="text-sm">
            {currentPage} / {totalPages}
          </span>
          <Button
            variant="outline"
            onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
            disabled={currentPage === totalPages}
          >
            Вперёд
          </Button>
        </div>
      )}
    </div>
  );
}
