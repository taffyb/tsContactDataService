//{sourceType:,targetType:}
MATCH (e1:Entity),(e2:Entity)
WHERE ($sourceType IN labels(e1) OR $targetType IN labels(e1)) AND ($sourceType IN labels(e2) OR $targetType IN labels(e2))
OPTIONAL MATCH (e1)-[from]->(e2)
WITH CASE 
	WHEN NOT (from IS NULL OR e1 IS NULL OR e2 IS NULL) 
		THEN type(from) 
	END as from
WITH collect(from) as fromTypes
MATCH (e1:Entity),(e2:Entity)
WHERE ($sourceType IN labels(e1) OR $targetType IN labels(e1)) AND ($sourceType IN labels(e2) OR $targetType IN labels(e2))
OPTIONAL MATCH (e1)<-[to]-(e2)
WITH fromTypes, CASE 
	WHEN NOT (to IS NULL OR e1 IS NULL OR e2 IS NULL) 
		THEN type(to)
	END as to
WITH fromTypes,collect( to) as toTypes
WITH fromTypes+toTypes as types
UNWIND types as type
RETURN collect(DISTINCT type) as types