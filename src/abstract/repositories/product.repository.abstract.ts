import { Product } from 'src/entities/product.entity';

export abstract class ProductRepository {
  abstract create(product: Product): Promise<Product>;
  abstract findById(id: string): Promise<Product | null>;
  abstract findAll(): Promise<Product[]>;
  abstract deleteById(id: string): Promise<void>;
  abstract updateById(
    id: string,
    data: Partial<Product>,
  ): Promise<Product | null>;
}

// export interface ProductRepository {
//   create(product: Product): Promise<Product>;
//   findAll(): Promise<Product[]>;
//   findById(id: string): Promise<Product | undefined>;
//   updateById(id: string, data: Partial<Product>): Promise<Product>;
//   deleteById(id: string): Promise<void>;
// }

// export class ProductRepository {
//   constructor() {}

//   private products: Product[] = [];

//   async create(product: Product): Promise<Product> {
//     const newProduct = { ...product, id: Math.random().toString() };
//     this.products.push(newProduct);
//     return newProduct;
//   }

//   async findById(id: string): Promise<Product | null> {
//     const product = this.products.find((p) => p.id === id);
//     return product ?? null;
//   }

//   async findAll(): Promise<Product[]> {
//     return this.products;
//   }

//   async deleteById(id: string): Promise<void> {
//     const index = this.products.findIndex((p) => p.id === id);
//     if (index >= 0) {
//       this.products.splice(index, 1);
//     }
//   }

//   async updateById(
//     id: string,
//     data: Partial<Product>,
//   ): Promise<Product | null> {
//     const index = this.products.findIndex((p) => p.id === id);
//     if (index >= 0) {
//       const updatedProduct = { ...this.products[index], ...data };
//       this.products[index] = updatedProduct;
//       return updatedProduct;
//     }
//     return null;
//   }
// }

// create(product: Product): Promise<Product>;
// findById(id: string): Promise<Product | null>;
// findAll(): Promise<Product[]>;
// deleteById(id: string): Promise<void>;
// updateById(id: string, data: Partial<Product>): Promise<Product | null>;
// }
