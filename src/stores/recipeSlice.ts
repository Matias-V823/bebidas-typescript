import { Drink, Drinks, InstructionDrink, SearchFilter } from './../types/index';
import { StateCreator } from "zustand"
import { getCategories, getRecipes, getRecipesDrinks } from "../services/RecipeService"
import { Categories } from "../types"


export type RecipesSliceType = {
    categories: Categories
    drinks: Drinks
    fetchCategories: () => Promise<void>
    modal: boolean
    searchRecipes: (SearchFilter:SearchFilter) => Promise<void>
    selectRecipe: (id : Drink['idDrink']) => Promise<void>
    selectedRecipe: InstructionDrink
    closeModal: () => void
}

export const createRecipesSlice : StateCreator<RecipesSliceType> = (set) => ({
    categories: {
        drinks: []
    },
    drinks: {
        drinks: []
    },
    selectedRecipe: {}  as InstructionDrink, 
    modal:false,
    fetchCategories: async () => {
        const categories = await getCategories()
        set({
            categories
        })
    },
    searchRecipes: async (filters) => {
        const drinks = await getRecipes(filters)
        set({
            drinks
        })
    },
    selectRecipe: async (id) => {
        const instruction = await getRecipesDrinks(id)
        set({
            selectedRecipe: instruction,
            modal: true
        })
    },
    closeModal: () =>{
        set({
            modal:false,
            selectedRecipe: {} as InstructionDrink
        })
    }
})