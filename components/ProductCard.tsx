'use client';

import {
  Card,
  CardHeader,
  CardContent,
  CardFooter,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import { useDispatch } from 'react-redux';
import {
  deleteProduct,
  toggleLike,
  Product,
} from '@/redux/slices/productsSlice';
import Image from 'next/image';

// Импортируем иконки из react-icons
import { FaHeart, FaRegHeart } from 'react-icons/fa';
import { FiEdit, FiTrash2 } from 'react-icons/fi'; // Дополнительные иконки для кнопок редактирования и удаления

interface Props {
  product: Product;
}

export default function ProductCard({ product }: Props) {
  const router = useRouter();
  const dispatch = useDispatch();

  const handleCardClick = () => {
    router.push(`/products/${product.id}`);
  };

  const handleLikeClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    dispatch(toggleLike(product.id));
  };

  const handleDeleteClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    dispatch(deleteProduct(product.id));
  };

  const handleEditClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    router.push(`/edit-product/${product.id}`);
  };

  return (
    <Card
      className="cursor-pointer hover:shadow transition"
      onClick={handleCardClick}
    >
      <CardHeader>
        <h3 className="font-semibold text-lg">{product.title}</h3>
      </CardHeader>
      <CardContent>
        <div className="relative w-full h-48 mb-2 rounded overflow-hidden">
          <Image
            src={product.image}
            alt={product.title}
            fill
            className="object-contain"
          />
        </div>
        <p className="text-sm line-clamp-2 text-muted-foreground">
          {product.description}
        </p>
      </CardContent>
      <CardFooter className="flex justify-between items-center">
        <div className="flex gap-1">
          <Button
            variant="outline"
            size="sm"
            onClick={handleLikeClick}
            aria-label={
              product.liked ? 'Удалить из избранного' : 'Добавить в избранное'
            }
          >
            {product.liked ? (
              <FaHeart className="text-red-500" />
            ) : (
              <FaRegHeart />
            )}
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={handleDeleteClick}
            aria-label="Удалить продукт"
          >
            <FiTrash2 />
          </Button>
        </div>
        <Button
          variant="default"
          size="sm"
          onClick={handleEditClick}
          aria-label="Редактировать продукт"
        >
          <FiEdit />
        </Button>
      </CardFooter>
    </Card>
  );
}
