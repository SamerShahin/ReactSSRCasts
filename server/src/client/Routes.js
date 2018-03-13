import React from 'react';
import Rout from 'react-router-dom';
import Home from './components/Home';

export default () => {
    return (
        <div>
            <Rout exact path="/" component={Home}/>
        </div>
    );
};