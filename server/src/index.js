import 'babel-polyfill';
import express from 'express';
import React from 'react';
import {matchRoutes} from 'react-router-config';
import Routes from './client/Routes';
import renderer from './helpers/renderer';
import createStore from './helpers/createStore';
import proxy from 'express-http-proxy';


const app = express();

//the second proxy paramaret is optional and is specifically written for our api
app.use('/api', proxy('http://react-ssr-api.herokuapp.com', {
        proxyReqOptDecorator(opts) {
            opts.headers['x-forwarded-host'] = 'localhost:3000';
            return opts;
        }
    })
);

app.use(express.static('public'));
app.get('*', (req, res) => {
    const store = createStore(req);
    const promises = matchRoutes(Routes, req.path).map(({route}) => {
        return route.loadData ? route.loadData(store) : null;
    });

    //render the app only after all the promises to fetch data is finished
    Promise.all(promises).then(function (data) {
        res.send(renderer(req, store));
    }).catch(function (err) {

    });
});

app.listen(3000, () => {
    console.log('Listening on port 3000');
});
