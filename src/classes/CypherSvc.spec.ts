import { CypherSvc } from './CypherSvc';
import { expect } from 'chai';
import 'mocha';

describe('CypherSvc.readCypherFromFile', () => {

  it('should return player.cyp', () => {
    const cyp = CypherSvc.readCypherFromFile('test');
    expect(cyp).to.equal('MATCH (p:Player) RETURN p as player');
  });

});
