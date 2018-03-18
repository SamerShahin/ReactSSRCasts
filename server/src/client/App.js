import React from 'react';
import {renderRoutes} from 'react-router-config';
import Header from './components/Header';
import {fetchCurrentUser} from "./actions/index";

const app = ({route}) => {
    return <div>
            <Header/>
            {renderRoutes(route.routes  )}
        </div>
};


export default {
    component: app,
    loadData: ({ dispatch }) => dispatch(fetchCurrentUser())
};