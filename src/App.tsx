import './index.scss'
import { RouterProvider } from 'atomic-router-react';
import { createHistoryRouter } from 'atomic-router';
import { mappedRoutes } from './shared/routes.ts';
import { Pages } from '@pages/index.ts';
import Layout from '@components/Layout/Layout.tsx';

const router = createHistoryRouter({routes: mappedRoutes});

function App() {
    return (
        <RouterProvider router={router}>
            <Layout>
                <Pages/>
            </Layout>
        </RouterProvider>
    );

}

export default App
