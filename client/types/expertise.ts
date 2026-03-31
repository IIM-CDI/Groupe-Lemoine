export type Product = {
  id: number
  name: string
  image: {
    url: string
  }
}

export type Category = {
  id: number
  name: string
  description: string
  products: Product[]
}
export type ProductItem = {
  id: number
  product_name: string
  product_description: string
  image: {
    url: string
  }
}

export type ProductsPage = {
  title: string
  description: string
  product: ProductItem[]
}