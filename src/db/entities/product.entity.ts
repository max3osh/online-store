import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  ManyToMany,
} from 'typeorm';
import { CategoryEntity } from './category.entity';
import { CartEntity } from './cart.entity';

@Entity('product')
export class ProductEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('varchar')
  title: string;

  @Column('varchar')
  description: string;

  @Column('int')
  price: number;

  @Column('int', {
    name: 'cart_id',
  })
  cartId: number;

  @Column('int', {
    name: 'category_id',
  })
  categoryId: number;

  /*
   * RELATIONS
   */

  @ManyToOne(() => CategoryEntity, (category) => category.products)
  @JoinColumn({ name: 'category_id' })
  category: CategoryEntity;

  @ManyToMany(() => CartEntity, (cart) => cart.products)
  carts: CartEntity[];
}
