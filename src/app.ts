import express from 'express';
import logger from 'morgan';
import bodyParser from 'body-parser';
import {Neo4jSvc} from './classes/Neo4jSvc';
import * as userRoutes from './routes/users';
import * as gameRoutes from './routes/games';
import * as moveRoutes from './routes/moves';
import dotenv from 'dotenv';
dotenv.config();
const app = express();

const port = process.env.SVR_PORT; // default port to listen

app.use(logger('dev'));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json({limit: '50mb', type: 'application/json'}));

// define a route handler for the default home page
app.get( '/', ( req: any, res: any ) => {
    res.send( 'Hello world!.' );
} );

// REGISTER OUR ROUTES -------------------------------
userRoutes.register(app);
gameRoutes.register(app);
moveRoutes.register(app);

// start the Express server
app.listen( port, () => {
    console.log( `server started at http://localhost:${ port }` );
} );
