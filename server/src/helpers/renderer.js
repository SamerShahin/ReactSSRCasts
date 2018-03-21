import React from 'react';
import {renderToString} from 'react-dom/server';
import {StaticRouter} from 'react-router-dom';
import {Provider} from 'react-redux';
import {renderRoutes} from 'react-router-config';
import Routes from '../client/Routes';
//serialize-javascript takes a strings and escapes any string that contain a script tags , similar to strip tags but instead of removing the tag it converts it to unicode
import serialize from 'serialize-javascript';
import {Helmet} from 'react-helmet';

export default (req, store, context) => {
    const content = renderToString(
        <Provider store={store}>
            {/*//static router must always get a context props.*/}
            {/*//pass in the request path (url) to the static router.*/}
            <StaticRouter location={req.path} context={context}>
                <div>{renderRoutes(Routes)}</div>
            </StaticRouter>
        </Provider>
    );

    //Helmet renderStatic stores all the meta tags that were defined in the components
    const helmet = Helmet.renderStatic();
    return {
        helmet ,
        content,
        INITIAL_STATE : serialize(store.getState())
    };
 /*   `
    <html>
        <head>
            ${helmet.title.toString()}
            ${helmet.meta.toString()}
        </head>
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/materialize/0.100.2/css/materialize.min.css">
        <body>
            <script>
                 window.INITIAL_STATE = ${serialize(store.getState())}
            </script>
            <div id="root">${content}</div>
            <script src="bundle.js"></script>
        </body>
    </html>`;*/

};