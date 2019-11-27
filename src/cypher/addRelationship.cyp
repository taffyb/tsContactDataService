//{euuid1,euuid2,type}
MATCH (e1:Entity{uuid:$euuid1})
MATCH (e2:Entity{uuid:$euuid2})
WITH e1,e2, apoc.create.uuid() as ruuid
CALL apoc.create.relationship(e1,$type,{uuid:ruuid}, e2) YIELD rel
RETURN ruuid as uuid