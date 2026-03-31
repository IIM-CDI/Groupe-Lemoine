import type { Schema, Struct } from '@strapi/strapi';

export interface CertificationsCertifications extends Struct.ComponentSchema {
  collectionName: 'components_certifications_certifications';
  info: {
    displayName: 'Certifications';
  };
  attributes: {
    Image: Schema.Attribute.Media<'images' | 'files' | 'videos' | 'audios'>;
    name: Schema.Attribute.String;
  };
}

export interface PartenairesPartenaires extends Struct.ComponentSchema {
  collectionName: 'components_partenaires_partenaires';
  info: {
    displayName: 'Partenaires';
  };
  attributes: {
    image: Schema.Attribute.Media<
      'images' | 'files' | 'videos' | 'audios',
      true
    >;
    name: Schema.Attribute.String;
  };
}

export interface ProductsProductGroup extends Struct.ComponentSchema {
  collectionName: 'components_products_product_groups';
  info: {
    displayName: 'Product Group';
  };
  attributes: {
    category: Schema.Attribute.String;
    product_description: Schema.Attribute.Text;
    products: Schema.Attribute.Component<'products.product-item', true>;
  };
}

export interface ProductsProductItem extends Struct.ComponentSchema {
  collectionName: 'components_products_product_items';
  info: {
    displayName: 'Product Item';
  };
  attributes: {
    image: Schema.Attribute.Media<
      'images' | 'files' | 'videos' | 'audios',
      true
    >;
    product_description: Schema.Attribute.Text;
    product_name: Schema.Attribute.String;
  };
}

declare module '@strapi/strapi' {
  export module Public {
    export interface ComponentSchemas {
      'certifications.certifications': CertificationsCertifications;
      'partenaires.partenaires': PartenairesPartenaires;
      'products.product-group': ProductsProductGroup;
      'products.product-item': ProductsProductItem;
    }
  }
}
