import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm'
import { ObjectType, Field, ID } from 'type-graphql'

@Entity()
@ObjectType()
export class Post {
    @Field(typo => ID)
    @PrimaryGeneratedColumn()
    readonly id: string

    @Field()
    @Column()
    title: string

    @Field()
    @Column()
    comment: string
}