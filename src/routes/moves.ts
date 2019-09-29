import express from 'express';
import {Neo4jSvc} from '../classes/Neo4jSvc';

export const register = ( app: express.Application, prefix: string= '/api' ) => {
    const neo4jSvc = Neo4jSvc.getInstance();
    app.get( prefix + '/moves', async ( req: any, res ) => {
        const results = await neo4jSvc.executeCypher('getGames.cyp', {});
        res.send( results[0].games);
    } );
    app.post( prefix + '/moves', async ( req: any, res ) => {
        const params: any = req.body;
        try {
            const turns = await neo4jSvc.executeCypher('lastTurn.cyp', {guuid: params.guuid});

            params.lastTurnId = turns[0].lastTurnId;

            const results = await neo4jSvc.executeCypher('addMoves.cyp', params, true);
            if (results.length > 0) {
                res.send( {count: results[0].moveCount} );
            } else {
                res.sendStatus(500);
            }
        } catch (err) {
            res.sendStatus(500);
        }
    } );
};
