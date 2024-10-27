import { StateCreator } from "zustand";
import { favoriteSliceType } from "./favoritesSlice";

type Notification = {
    text: string;
    error: boolean; //tipo de notificacion
    show: boolean;
};

export type NotificacionType = {
    notification: Notification;
    showNotification: (payload: Pick<Notification, 'text' | 'error'>) => void
    hideNotification: () => void
};

export const createNotificationSlice: StateCreator<NotificacionType & favoriteSliceType, [],[], NotificacionType> = (set,get) => ({
    notification: {
        text: "Texto Notificacion", 
        error: false,
        show: false
    },
    showNotification: (payload) =>{
        set({
            notification:{
                text: payload.text,
                error: payload.error,
                show: true
            }
        })
        setTimeout(() => {
            get().hideNotification()
        }, 3000);
    },
    hideNotification: () =>{
        set({
            notification:{
                text:'',
                error: false,
                show:false
            }
        })
    }
});
