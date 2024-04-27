import React, {lazy, Suspense} from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import {Cart} from "./pages/Cart/Cart";
import {createBrowserRouter, RouterProvider, defer} from "react-router-dom";
import {Layout} from "./layout/Menu/Layout";
import Product from "./pages/Product/Product";
import axios from "axios";
import {PREFIX} from "./helpers/API";
import {ErrorPage} from "./pages/Error/Error";
import AuthLayout from "./layout/Auth/AuthLayout";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import {RequireAuth} from "./helpers/RequireAuth";
import {Provider} from "react-redux";
import {store} from "./store/store";

const Menu = lazy(() => import('./pages/Menu/Menu'));

const router = createBrowserRouter([
    {
        path: '/',
        element: <RequireAuth>
            <Layout/></RequireAuth>,
        children: [
            {
                path: '/',
                element: <Suspense fallback={<>Загрузка...</>}><Menu/></Suspense>
            },
            {
                path: '/cart',
                element: <Cart/>
            },
            {
                path: '/product/:id',
                element: <Product/>,
                errorElement: <>Ошибка</>,
                loader: async ({params}) => {
                    return defer({
                        data: new Promise((resolve, reject) => {
                            setTimeout(() => {
                                axios.get(`${PREFIX}/products/${params.id}`)
                                    .then(data => resolve(data))
                                    .catch(e => reject(e))
                            }, 2000)
                        })
                    });
                }
            }
        ]
    },
    {
        path: "/auth",
        element: <AuthLayout/>,
        children: [
            {
                path: 'login',
                element: <Login/>
            },
            {
                path: 'register',
                element: <Register/>
            }
        ]
    },

    {
        path: "*",
        element: <ErrorPage/>
    }
]);


ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <Provider store={store}>
            <RouterProvider router={router}/>
        </Provider>
    </React.StrictMode>,
)
