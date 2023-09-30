import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { ProductEntity } from './product.entity';

@Entity('category')
export class CategoryEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('varchar')
  title: string;

  /*
   * RELATIONS
   */

  @OneToMany(() => ProductEntity, (product) => product.category, {
    cascade: true,
  })
  products: ProductEntity[];
}
