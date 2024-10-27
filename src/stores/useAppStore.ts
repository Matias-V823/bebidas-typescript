import { create } from 'zustand' //Funcion que permite crear el state
import { createRecipesSlice, RecipesSliceType } from './recipeSlice'
import { devtools } from 'zustand/middleware'
import {favoriteSliceType, createFavoriteSlice } from './favoritesSlice'
import {NotificacionType, createNotificationSlice } from './notificationSlice'

export const useAppStore = create<RecipesSliceType & favoriteSliceType & NotificacionType>(devtools((...a) => ({
    ...createRecipesSlice(...a),
    ...createFavoriteSlice(...a),
    ...createNotificationSlice(...a)
})))