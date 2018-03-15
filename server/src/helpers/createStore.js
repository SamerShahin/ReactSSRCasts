import {createStore, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import reducers from '../client/reducers/';
import axios from 'axios';


export default (req) => {
    //join the guild we have cookies ,
    //attach the cookies that we got from the browser to the react-ssr-api request for authentications purposes
    const axiosInstance = axios.create({
        baseURL: 'http://react-ssr-api.herokuapp.com',
        headers: {
            cookie: req.get('cookie') || ''
        }
    });

    const store = createStore(reducers, {}, applyMiddleware(thunk.withExtraArgument(axiosInstance)));
    return store;
};