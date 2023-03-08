import { createRoot } from 'react-dom/client'
import axios from 'axios'
import { Provider } from 'react-redux'

import App from './App'
import { store } from './store'
import { ThemeProvider } from './components/Header/ThemeProvider'

import './index.css'
import 'swiper/css/bundle'

axios.defaults.baseURL = import.meta.env.VITE_API ?? 'http://localhost:3003/'
window.sessionStorage.setItem('carrito', JSON.stringify([]))

createRoot(document.getElementById('root') as HTMLElement).render(
    <Provider store={store}>
        <ThemeProvider>
            <body className="bg-white dark:bg-gray-800 transition-all">
                <App />
            </body>
        </ThemeProvider>
    </Provider>
)
