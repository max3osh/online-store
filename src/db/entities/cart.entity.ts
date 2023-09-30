import {
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { UserEntity } from './user.entity';
import { ProductEntity } from './product.entity';

@Entity('cart')
export class CartEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('uuid', {
    name: 'user_id',
  })
  userId: string;

  /*
   * RELATIONS
   */

  @OneToOne(() => UserEntity, (user) => user.cart, { cascade: true })
  @JoinColumn({ name: 'user_id' })
  user: UserEntity;

  @ManyToMany(() => ProductEntity, (product) => product.carts)
  @JoinTable({
    name: 'carts_products',
    joinColumn: {
      name: 'cart_id',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'product_id',
      referencedColumnName: 'id',
    },
  })
  products: ProductEntity[];
}
