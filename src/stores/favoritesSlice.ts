import { StateCreator } from "zustand"
import { InstructionDrink } from "../types"
import { createNotificationSlice, NotificacionType } from "./notificationSlice"



export type favoriteSliceType = {
    favorites: InstructionDrink[]
    handleClickFavorite: (recipe: InstructionDrink) => void
    favoriteExist: (id: InstructionDrink['idDrink']) => boolean
    loadFromStorage: any
}


export const createFavoriteSlice : StateCreator<favoriteSliceType & NotificacionType, [],[], favoriteSliceType> = (set,get) => ({
    favorites: [],

    handleClickFavorite: (recipe) => {
        if(get().favoriteExist(recipe.idDrink)){
            set(() => ({
                favorites: [...get().favorites.filter(favorite => favorite.idDrink != recipe.idDrink)]
            }))
            createNotificationSlice(set,get).showNotification({
                text: 'Se eliminó de favoritos',
                error: true
            })
        } else {
            console.log('no existe...')
            set({
                favorites: [...get().favorites, recipe]
            })
            createNotificationSlice(set,get).showNotification({
                text: 'Se agregó a favoritos',
                error: false
            })

        }
        localStorage.setItem('favorites', JSON.stringify(get().favorites))
    },
    favoriteExist: (id) => {
        return get().favorites.some(favorite => favorite.idDrink === id)
    },
    loadFromStorage: () => {
        const storedFavorites = localStorage.getItem('favoritos')
        if(storedFavorites){
            set({
                favorites: JSON.parse(storedFavorites)
            })
        }
    }
})