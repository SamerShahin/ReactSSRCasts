import 'babel-polyfill';
import express from 'express';
import React from 'react';
import renderer from './helpers/renderer';
const app = express();
import createStore from './helpers/createStore';


app.use(express.static('public'));
app.get('*', (req, res) => {
    const store = createStore();

    //TODO: Get the initial data and load it into the store

    res.send(renderer(req,store));
});

app.listen(3000, () => {
    console.log('Listening on port 3000');
});
