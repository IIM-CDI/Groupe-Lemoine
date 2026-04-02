export type Detail = {
  id: number;
  title: string;
  description: string;
};

export type Product = {
  id: number;
  product_name: string;
  product_description: string;
  image: { url: string }[];
};

export type Category = {
  id: number;
  category: string;
  product_description: string;
  Details: Detail[];
  products: Product[];
};

export type Certification = {
  id: number;
  name: string;
  Image: { url: string };
};

export type Partenaire = {
  id: number;
  name: string;
  image: { url: string }[];
};

export type ExpertiseData = {
  title: string;
  description: string;
  certification: string;
  Category: Category[];
  Certifications: Certification[];
  Partenaires: Partenaire[];
};