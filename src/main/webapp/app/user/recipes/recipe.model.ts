import {Ingredient} from "../ingredient/ingredient.model";

export interface Recipe {
    id: number
    title: string
    description: string
    imgUrl: string
    visible: boolean
    difficulty: string
    ingredients: Ingredient[]
}

export interface RecipePage {
    content: Recipe[]
    totalElements: number
    size: number
    number: number
    empty: boolean
}
