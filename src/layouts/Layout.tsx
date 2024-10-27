import { Outlet } from 'react-router-dom'
import Header from '../components/Header'
import MyModal from '../components/Modal'
import { useEffect } from 'react'
import { useAppStore } from '../stores/useAppStore'
import Notification from '../components/Notification'


const Layout = () => {


    const loadFromStorage = useAppStore((state)=> state.loadFromStorage)
    useEffect(()=>{
        loadFromStorage()
    },[])

    return (
        <>
            <Header />
            <main className='mx-auto py-16 bg-[#251a1a] min-h-screen'>
                <Outlet />
            </main>
            <MyModal/>
            <Notification />
        </>
    )
}

export default Layout