import * as express from 'express';
import {Neo4jSvc} from '../classes/Neo4jSvc';
import {BaseEntity} from '../classes/BaseEntity';
import {IEntity} from '../classes/IEntity';
import {IEntityDef} from '../classes/IEntityDef';
import {EntityDefSvc} from '../classes/EntityDefSvc';

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
        const entities: BaseEntity[] = [];



         /*
          * for each entity in the result determin add a display string
         */
            results[0].entities.forEach(async (e: any, i: any) => {
            const entity: BaseEntity = new BaseEntity();
            entity.type = e.type;
            entity.uuid = e.uuid;
            entity.display = await EntityDefSvc.getDisplayString(entity.type, e.props);
            entity.props = [];

            let key: string;

            for (key in e.props) {
                if (!(key === 'uuid' || key === 'type' || key === 'display') ) {
                    const value: string = e.props[key];
                    if (value.length > 0) {
                        entity.props.push({key: key, value: value});
                    }
                }
            }
            entities.push(entity);
            if (i === results[0].entities.length - 1) {
//              console.log(`entities: ${JSON.stringify(entities)}`);
              res.send( entities );
            }
        });

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
