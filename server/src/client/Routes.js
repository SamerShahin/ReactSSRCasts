import React from 'react';
import Home from './pages/HomePage';
import UsersListPage from './pages/UsersListPage'
import IsAlive from './components/IsAlive';
import App from './App'
import NotFoundPage from './pages/NotFoundPage';
import AdminsListPage from './pages/AdminsListPage';

export default [
    {
        ...App,
        routes: [
            {
                path: '/',
                component: Home,
                exact: true
            },
            {
                ...UsersListPage,
                path: '/users',
                exact: false
            }, {
                ...AdminsListPage,
                path: '/admins',
                exact: false
            },
            {
                ...NotFoundPage
            }
        ]
    },
    {
        path: '/is-alive',
        component: IsAlive,
        exact: true
    }
];