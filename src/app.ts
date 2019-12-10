import express from 'express';
import fileUpload from 'express-fileupload';
import logger from 'morgan';
import bodyParser from 'body-parser';
import {Neo4jSvc} from './classes/Neo4jSvc';
import * as entityDefRoutes from './routes/entityDefs';
import * as entityRoutes from './routes/entities';
import * as utilityRoutes from './routes/utilities';
import * as relationshipRoutes from './routes/relationships';
import dotenv from 'dotenv';
dotenv.config();
const app = express();

const port = process.env.SVR_PORT; // default port to listen

app.use(logger('dev'));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json({limit: '50mb', type: 'application/json'}));
app.use(fileUpload({
    limits: { fileSize: 50 * 1024 * 1024 }
  }));
app.disable('etag');

// define a route handler for the default home page
app.get( '/', ( req: any, res: any ) => {
    res.send( 'Hello world!.' );
} );
app.use((req, res, next) => {
    res.append('Access-Control-Allow-Origin', ['*']);
    res.append('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.append('Access-Control-Allow-Headers', 'Content-Type');
    next();
});
// REGISTER OUR ROUTES -------------------------------
entityDefRoutes.register(app);
entityRoutes.register(app);
utilityRoutes.register(app);
relationshipRoutes.register(app);

// start the Express server
app.listen( port, () => {
    console.log( `server started at http://localhost:${ port }` );
} );
