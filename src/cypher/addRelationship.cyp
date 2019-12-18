//{source,target,label}
MATCH (s:Entity{uuid:$source})
MATCH (t:Entity{uuid:$target})
CREATE (s)-[:FROM]->(r:Relationship)-[:TO]->(t)
SET r.type=$label,r.uuid=apoc.create.uuid()
RETURN {uuid:r.uuid,source:s.uuid,target:t.uuid,label:r.type,left:false,right:true} as relationship