//{sourceType:,targetType:}
MATCH (e1:Entity),(e2:Entity)
WHERE ($sourceType IN labels(e1) ) AND ($targetType IN labels(e2))
MATCH (e1)-[]-(r:Relationship)-[]-(e2)
RETURN collect(DISTINCT r.type) as types