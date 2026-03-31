import type { Schema, Struct } from '@strapi/strapi';

export interface ProductsProductGroup extends Struct.ComponentSchema {
  collectionName: 'components_products_product_groups';
  info: {
    displayName: 'Product Group';
  };
  attributes: {
    category: Schema.Attribute.String;
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
      'products.product-group': ProductsProductGroup;
      'products.product-item': ProductsProductItem;
    }
  }
}
