import * as express from 'express';
import {Neo4jSvc} from '../classes/Neo4jSvc';
import {BaseLiteEntity} from '../classes/BaseLiteEntity';
import {BaseEntity} from '../classes/BaseEntity';
import {IEntity, IEntityDef} from '../classes/interfaces';
import {EntityDefSvc} from '../classes/EntityDefSvc';

export const register = ( app: express.Application, prefix: string= '/api' ) => {
    const neo4jSvc = Neo4jSvc.getInstance();
    app.get( prefix + '/entities/:uuid', async ( req: any, res ) => {
        const uuid = req.params.uuid;
        const results = await neo4jSvc.executeCypher('getEntity.cyp', {uuid: uuid});
        const entity = results[0].entity;
        entity.display = await EntityDefSvc.getDisplayString(entity.type, entity.props);


        let key: string;
        const props = entity.props;
        entity.props = [];
        for (key in props) {
          if (!(key === 'uuid' || key === 'type' || key === 'display') ) {
              const value: string = String(props[key]);
              if (value.length > 0) {
                  entity.props.push({key: key, value: value});
              }
          }
        }

      console.log(`GET /entities/${uuid}  ${JSON.stringify(entity)}`);
        res.send( entity );
    });
    app.get( prefix + '/entities', async ( req: any, res ) => {
        const results = await neo4jSvc.executeCypher('getEntities.cyp', {});
        const entities: BaseLiteEntity[] = [];
         /*
          * for each entity in the result add a display string
         */
            results[0].entities.forEach(async (e: any, i: any) => {
            const entity: BaseLiteEntity = new BaseLiteEntity();
            entity.type = e.type;
            entity.uuid = e.uuid;
            entity.display = await EntityDefSvc.getDisplayString(entity.type, e.props);

            entities.push(entity);
            if (i === results[0].entities.length - 1) {
              res.send( entities );
            }
        });

    });
    app.post( prefix + '/entities', async ( req: any, res ) => {
        const results = await neo4jSvc.executeCypher('addEntity.cyp', req.body, true);
        const e = results[0].entity;
        const entity: IEntity = new BaseEntity();
        entity.type = e.type;
        entity.uuid = e.uuid;
        entity.display = await EntityDefSvc.getDisplayString(e.type, e.props);
        entity.props = [];

        let key: string;
        for (key in e.props) {
          if (!(key === 'uuid' || key === 'type' || key === 'display') ) {
              const value: string = String(e.props[key]);
              if (value.length > 0) {
                  entity.props.push({key: key, value: value});
              }
          }
        }
        res.send( entity );
    });
    app.put( prefix + '/entities/:uuid', async ( req: any, res ) => {
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

