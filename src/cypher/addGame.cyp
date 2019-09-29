//params: {p1Uuid:,p2Uuid:}

CREATE (g:Game)
SET g.uuid=apoc.create.uuid()
WITH g
MATCH (p1:User{uuid:$p1Uuid})
MATCH (p2:User{uuid:$p2Uuid})
WITH g,p1,p2
MERGE (g)-[:PLAYED_BY{player:1}]->(p1)
MERGE(g)-[:PLAYED_BY{player:2}]->(p2)
RETURN g.uuid as uuid