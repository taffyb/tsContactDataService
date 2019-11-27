
MATCH (e1:Entity),(e2:Entity)
OPTIONAL MATCH (e1)-[from]->(e2)
WITH CASE 
	WHEN NOT (from IS NULL OR e1 IS NULL OR e2 IS NULL) 
		THEN {source:e1.uuid,target:e2.uuid,label:type(from),left:false,right:true} 
	END as from
WITH collect(from) as fromLinks
MATCH (e1:Entity),(e2:Entity)
OPTIONAL MATCH (e1)<-[to]-(e2)
WITH fromLinks, CASE 
	WHEN NOT (to IS NULL OR e1 IS NULL OR e2 IS NULL) 
		THEN {source:e1.uuid,target:e2.uuid,label:type(to),left:true,right:false} 
	END as to
WHERE NOT (to IS NULL OR e1 IS NULL OR e2 IS NULL)
WITH fromLinks,collect( to) as toLinks
WITH fromLinks+toLinks as links
RETURN links