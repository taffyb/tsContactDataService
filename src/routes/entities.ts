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
              res.send( entities );
            }
        });

    });
    app.post( prefix + '/entities', async ( req: any, res ) => {

        const e = req.body;

        const results = await neo4jSvc.executeCypher('addEntity.cyp', e);

        res.send( results[0].entity.uuid );
    });
    app.put( prefix + '/entities/:euuid', async ( req: any, res ) => {
        const e = req.body;
        const results = await neo4jSvc.executeCypher('updateEntity.cyp', e);

        res.send( results[0].entity );
    });
    app.delete( prefix + '/entities/:uuid', async ( req: any, res ) => {
        const uuid = req.params.uuid;
        const results = await neo4jSvc.executeCypher('deleteEntity.cyp', {uuid: uuid});

        res.send( results[0] );
    });
};

