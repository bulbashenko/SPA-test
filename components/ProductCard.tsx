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
            className="object-cover"
          />
        </div>
        <p className="text-sm line-clamp-2 text-muted-foreground">
          {product.description}
        </p>
      </CardContent>
      <CardFooter className="flex justify-between items-center">
        <div className="flex gap-1">
          <Button variant="outline" size="sm" onClick={handleLikeClick}>
            {product.liked ? '♥' : '♡'}
          </Button>
          <Button variant="outline" size="sm" onClick={handleDeleteClick}>
            Удалить
          </Button>
        </div>
        <Button variant="default" size="sm" onClick={handleEditClick}>
          Редактировать
        </Button>
      </CardFooter>
    </Card>
  );
}
