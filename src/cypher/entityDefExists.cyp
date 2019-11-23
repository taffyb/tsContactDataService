// {uuid:"", entityDefType:""}

OPTIONAL MATCH (ed:EntityDef{uuid:$uuid})
WITH CASE WHEN (ed IS NULL) THEN false
 ELSE
 	CASE WHEN ($entityDefType = ed.name) THEN true ELSE false END
 END AS exists
RETURN exists
 