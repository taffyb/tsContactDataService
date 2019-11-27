//{uuid:}
MATCH (n1:Entity)-[r]->(n2:Entity)
WITH r
WHERE r.uuid=$uuid
DELETE r