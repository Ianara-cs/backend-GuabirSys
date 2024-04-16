import { Field, ObjectType, registerEnumType } from '@nestjs/graphql'
import { Item } from './item.entity'

@ObjectType()
export class Menu {
  @Field()
  id: string

  @Field()
  name: string

  @Field(() => Category)
  category: Category

  @Field(() => [Item])
  items?: Item[]
}

const Category: {
  KITCHEN: 'KITCHEN'
  BAR: 'BAR'
} = {
  KITCHEN: 'KITCHEN',
  BAR: 'BAR',
}

export type Category = (typeof Category)[keyof typeof Category]

registerEnumType(Category, {
  name: 'Category',
})
