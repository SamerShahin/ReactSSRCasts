import React from 'react';
import {renderToString} from 'react-dom/server';
import {StaticRouter} from 'react-router-dom';
import Routes from '../client/Routes';

export default (req) => {
    const content = renderToString(
        //static router must always get a context props.
        //pass in the request path (url) to the static router.
        <StaticRouter location={req.path} context={{}} >
            <Routes/>
        </StaticRouter>
    );
   return  `
    <html>
        <head></head>
        <body>
            <div id="root">${content}</div>
            <script src="bundle.js"></script>
        </body>
    </html>`;

};