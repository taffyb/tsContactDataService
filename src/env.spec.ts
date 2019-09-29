import dotenv from 'dotenv';
import { expect } from 'chai';
import fs from 'fs';
import 'mocha';

dotenv.config();

describe('dotenv', () => {

  it('an environment file should exist', () => {
    const path = './.env';
    let exists = false;
    if (fs.existsSync(path)) {
        exists = true;
    }
    expect(exists).to.equal(true);
  });
  it('NEO4J_USERNAME defined', () => {
      const envVar: string = process.env.NEO4J_USERNAME;
      const exists: boolean = (envVar ? true : false);
      expect(exists).to.eq(true);
  });
  it('NEO4J_PASSWORD defined', () => {
      const envVar: string = process.env.NEO4J_PASSWORD;
      const exists: boolean = (envVar ? true : false);
      expect(exists).to.eq(true);
  });
  it('NEO4J_PROTOCOL defined', () => {
      const envVar: string = process.env.NEO4J_PROTOCOL;
      const exists: boolean = (envVar ? true : false);
      expect(exists).to.eq(true);
  });
  it('NEO4J_HOST defined', () => {
      const envVar: string = process.env.NEO4J_HOST;
      const exists: boolean = (envVar ? true : false);
      expect(exists).to.eq(true);
  });
  it('NEO4J_PORT defined', () => {
      const envVar: string = process.env.NEO4J_PORT;
      const exists: boolean = (envVar ? true : false);
      expect(exists).to.eq(true);
  });
  it('SVR_PORT defined', () => {
      const envVar: string = process.env.SVR_PORT;
      const exists: boolean = (envVar ? true : false);
      expect(exists).to.eq(true);
  });
});
