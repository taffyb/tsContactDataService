import * as express from 'express';
import {Neo4jSvc} from '../classes/Neo4jSvc';

export const register = ( app: express.Application, prefix: string= '/api' ) => {
    const neo4jSvc = Neo4jSvc.getInstance();
    app.get( prefix + '/entities/:euuid', async ( req: any, res ) => {
        const euuid = req.params.euuid;
        const results = await neo4jSvc.executeCypher('getEntity.cyp', {euuid: euuid});
        const e = results[0].entity;
        const entity: any = {};
        entity.type = e.type;
        entity.uuid = e.uuid;
        entity.props = [];
        for (const prop in e.props) {
            if (prop !== 'uuid') {
                entity.props.push({name: prop, value: e.props[prop]});
            }
        }
        res.send( entity );
    });
    app.get( prefix + '/entities', async ( req: any, res ) => {
        const results = await neo4jSvc.executeCypher('getEntities.cyp', {});

        res.send( results[0] );
    });
    app.post( prefix + '/entities', async ( req: any, res ) => {
        const params = req.body;
        const results = await neo4jSvc.executeCypher('addEntity.cyp', params);

        res.send( results[0] );
    });
};
