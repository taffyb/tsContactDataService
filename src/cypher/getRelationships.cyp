MATCH (e1:Entity)-[:FROM]->(from:Relationship)-[:TO]->(e2:Entity)
WITH collect(CASE 
	WHEN NOT (from IS NULL OR e1 IS NULL OR e2 IS NULL) 
		THEN {uuid:from.uuid,source:e1.uuid,target:e2.uuid,label:from.type,left:false,right:true} 
		ELSE NULL
	END) as links
RETURN links