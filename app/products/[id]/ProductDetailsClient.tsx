"use client";

import { Product } from "@/redux/slices/productsSlice";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

type Props = {
  product: Product;
};

export default function ProductDetailsClient({ product }: Props) {
  const router = useRouter();

  const handleBackClick = () => {
    router.push("/products");
  };

  return (
    <div className="p-4 flex flex-col md:flex-row gap-4">
      <div className="relative w-full md:w-1/3 h-64">
        <img
          src={product.image}
          alt={product.title}
          className="object-cover w-full h-full rounded"
        />
      </div>

      <div className="flex-1">
        <h1 className="text-2xl font-bold mb-2">{product.title}</h1>
        <p className="text-sm text-muted-foreground mb-2">{product.category}</p>
        <p className="mb-4">{product.description}</p>

        <Button variant="outline" onClick={handleBackClick}>
          Назад
        </Button>
      </div>
    </div>
  );
}
