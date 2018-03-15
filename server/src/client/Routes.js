import React from 'react';
import Home from './components/Home';
import UsersListPage from './components/UsersList'
import IsAlive from './components/IsAlive';

export default [
    {
        path: '/',
        component: Home,
        exact: true
    },
    {
        ...UsersListPage,
        path: '/users',
        exact: true
    },
    {
        path: '/is-alive',
        component: IsAlive,
        exact: true
    }
];