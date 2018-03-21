import 'babel-polyfill';
import express from 'express';
import React from 'react';
import {matchRoutes} from 'react-router-config';
import Routes from './client/Routes';
import renderer from './helpers/renderer';
import createStore from './helpers/createStore';
import proxy from 'express-http-proxy';

const app = express();

app.engine('.ejs',require('ejs').renderFile);
app.set('view engine', 'ejs');
app.set('appPath', 'src');

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
    }).map(promise => {
        //Wrap each promise with a promise that always resolves , so the promise.all doesn't fail
        if(promise){
          return new Promise(function (resolve, reject) {
             promise.then(resolve).catch(resolve);
          });
        }
    });

    //render the app only after all the promises to fetch data is finished
    Promise.all(promises).then(function (data) {
        const context = {};
        const appData = renderer(req, store,context);

        if(context.url){
         return res.redirect(301,context.url);
        }
        //context.notFound is set in the NotFoundPage
        if(context.notFound){
            res.status(404)
        }

        res.render('index',{appData});
        // res.send(content);
    }).catch(function (err) {

    });
});

app.listen(3000, () => {
    console.log('Listening on port 3000');
});
