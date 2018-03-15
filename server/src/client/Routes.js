import React from 'react';
import Home from './components/Home';
import UsersListPage from './components/UsersList'
import IsAlive from './components/IsAlive';
import App from './App'

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
            }
        ]
    },
    {
        path: '/is-alive',
        component: IsAlive,
        exact: true
    }
];