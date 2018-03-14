import React from 'react';
import {Route} from 'react-router-dom';
import Home from './components/Home';
import UsersList from './components/UsersList'

export default () => {
    return (
        <div>
            <Route exact path="/" component={Home}/>
            <Route exact path="/users" component={UsersList}/>
            <Route path="/is-alive" component={()=>'The app is Alive!!!'}/>
        </div>
    );
};