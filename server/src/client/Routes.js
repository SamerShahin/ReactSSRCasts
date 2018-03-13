import React from 'react';
import {Route} from 'react-router-dom';
import Home from './components/Home';

export default () => {
    return (
        <div>
            <Route exact path="/" component={Home}/>
            <Route path="/is-alive" component={()=>'The app is Alive!!!'}/>
        </div>
    );
};