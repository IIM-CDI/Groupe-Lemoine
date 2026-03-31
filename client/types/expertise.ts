export type ProductItem = {
  id: number
  product_name: string
  product_description: string
  image: {
    url: string
  }[]
}

export type ProductGroup = {
  id: number
  category: string
  product_description: string
  products: ProductItem[]
}

export type ProductsPage = {
  title: string
  description: string
  Category: ProductGroup[]
}