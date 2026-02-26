import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, ManyToMany, JoinTable, OneToMany } from 'typeorm';
import { Recipe } from '../../recipe/entities/recipe.entity';

@Entity()
export class Cuisine {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ unique: true })
    title: string;

    @OneToMany(() => Recipe, (recipe) => recipe.cuisine)
    recipes: Recipe[];
}
