import Neo4j from 'neo4j-driver';
import { Neo4jSvc } from './Neo4jSvc';
import { expect } from 'chai';
import 'mocha';

describe('Neo4jSvc', () => {
  const neo4jSvc = Neo4jSvc.getInstance();
  it('should be initialised', () => {
    const exists: boolean = neo4jSvc ? true : false;
    expect(exists).to.eq(true);
  });
  it('Connect to Neo4j and return 1 message', async () => {
     const results: any = await neo4jSvc.executeCypher('MATCH (t:Test) WITH t ORDER by t.id LIMIT 1 RETURN  t.message as message', {});
     expect(results[0].message).to.equal('Hello World');
  });
  it('Connect to Neo4j and return multiple messages', async () => {
      const results: any = await neo4jSvc.executeCypher('MATCH (t:Test) WITH t RETURN  t.message as message', {});
      expect(results.length).to.gt(1);
   });

});
