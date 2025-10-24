import { Outlet } from 'react-router-dom';
import './App.css';
import Header from './features/layout/components/Header';

export default function App() {
    return (
        <>
            <div className='min-h-screen min-w-screen bg-gradient-to-br from-secondary-400 to-secondary-900 pb-10'>
                <Header />
                <Outlet />
            </div>
        </>
    )
}