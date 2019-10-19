import * as express from 'express';
import {Neo4jSvc} from '../classes/Neo4jSvc';
import {BaseEntity} from '../classes/BaseEntity';

export const register = ( app: express.Application, prefix: string= '/api' ) => {
    const neo4jSvc = Neo4jSvc.getInstance();
    app.get( prefix + '/entities/:euuid', async ( req: any, res ) => {
        const euuid = req.params.euuid;
        const results = await neo4jSvc.executeCypher('getEntity.cyp', {euuid: euuid});
        const e = results[0].entity;
        res.send( e );
    });
    app.get( prefix + '/entities', async ( req: any, res ) => {
        const results = await neo4jSvc.executeCypher('getEntities.cyp', {});

        res.send( results[0] );
    });
    app.post( prefix + '/entities', async ( req: any, res ) => {
       /**
        * entity arives as map need to convert it to structure expected by the cypher
        */
        const e = req.body;
        const entity: BaseEntity = BaseEntity.fromMap(e);
//        entity.type = e.type;
//        entity.props = [];
//
//        let key: string;
//        for (key in e) {
//            if (!(key === 'uuid' || key === 'type') ) {
//                const value: string = e[key];
//                if (value.length > 0) {
//                    entity.props.push({key: key, value: value});
//                }
//            }
//        }


        console.log(`entity: ${JSON.stringify(entity)}`);
        const results = await neo4jSvc.executeCypher('addEntity.cyp', entity);

        res.send( results[0].entity.uuid );
    });
    app.put( prefix + '/entities/:euuid', async ( req: any, res ) => {
        const euuid = req.params.euuid;
        const e = req.body;
        const entity: BaseEntity = BaseEntity.fromMap(e);
//        console.log(`entity: ${JSON.stringify(entity)}`);
        const results = await neo4jSvc.executeCypher('updateEntity.cyp', entity);

        res.send( results[0] );
//        res.sendStatus(200);
    });
    app.delete( prefix + '/entities/:euuid', async ( req: any, res ) => {
        const euuid = req.params.euuid;
        const results = await neo4jSvc.executeCypher('deleteEntity.cyp', {euuid: euuid});

        res.send( results[0] );
    });
};

// function
