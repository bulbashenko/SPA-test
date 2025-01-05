import ProductDetailsClient from "./ProductDetailsClient"
import { Product } from "@/redux/slices/productsSlice"

export async function generateStaticParams() {
  const res = await fetch("https://fakestoreapi.com/products")
  const data = (await res.json()) as Array<{ id: number }>

  return data.map(item => ({
    id: String(item.id),
  }))
}

async function getProduct(id: string): Promise<Product | null> {
  const res = await fetch(`https://fakestoreapi.com/products/${id}`)
  if (!res.ok) {
    return null
  }
  const data = await res.json()

  const product: Product = {
    id: String(data.id),
    title: data.title,
    description: data.description,
    image: data.image,
    category: data.category,
    liked: false,
  }
  return product
}


export default async function ProductPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  const product = await getProduct(id)
  if (!product) {
    return (
      <div className="p-4">
        <h1 className="text-2xl font-bold">Продукт не найден</h1>
      </div>
    )
  }

  return <ProductDetailsClient product={product} />
}
