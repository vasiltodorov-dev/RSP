import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Recipe } from '../../recipe/entities/recipe.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string; // Remember to hash this!

  @OneToMany(() => Recipe, (recipe) => recipe.author)
  recipes: Recipe[];
}
