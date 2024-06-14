import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.scss'

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <App/>
    </React.StrictMode>,
)

// const router: Array<RouteRecordRaw> = [
//     {
//         path: '/',
//         name: 'home',
//         component: () => import('App.tsx')
//     }
// ]

// export const createApp = ViteSSG(App, {routes: router})
