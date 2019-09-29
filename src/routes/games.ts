import express from 'express';
import {Neo4jSvc} from '../classes/Neo4jSvc';

export const register = ( app: express.Application, prefix: string= '/api' ) => {
    const neo4jSvc = Neo4jSvc.getInstance();
    app.get( prefix + '/games', async ( req: any, res ) => {
        const results = await neo4jSvc.executeCypher('getGames.cyp', {});
        res.send( results[0].games);
    } );
    app.post( prefix + '/games', async ( req: any, res ) => {
        const p1Uuid: string = req.body.p1Uuid;
        const p2Uuid: string = req.body.p2Uuid;
        try {
            const results = await neo4jSvc.executeCypher('addGame.cyp', {p1Uuid: p1Uuid, p2Uuid: p2Uuid});
            if (results.length > 0) {
                res.send( {uuid: results[0].uuid} );
            } else {
                res.send(500);
            }

        } catch (err) {
            res.send(500);
        }
    } );
};
