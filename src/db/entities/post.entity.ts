import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('posts')
export class PostEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column('text',{nullable:true})
  title: string = " ";
  
  @Column()
  content: string = " ";
}