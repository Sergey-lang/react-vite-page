import './index.scss'
import { RouterProvider } from 'atomic-router-react';
import { RoutesView } from '@pages/index.ts';
import Layout from '@components/Layout/Layout.tsx';
import { router } from '@shared/routing.ts';

function App() {
    return (
        <RouterProvider router={router}>
            <Layout>
                <RoutesView/>
            </Layout>
        </RouterProvider>
    );
}

export default App
