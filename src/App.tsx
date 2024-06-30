import './index.scss'
import { RouterProvider } from 'atomic-router-react';
import { createHistoryRouter } from 'atomic-router';
import { mappedRoutes } from './shared/routes.ts';
import { Pages } from '@pages/index.ts';

const router = createHistoryRouter({ routes: mappedRoutes });

function App() {

    return (
        <RouterProvider router={router}>
            <Pages />
        </RouterProvider>
    );

}

export default App
