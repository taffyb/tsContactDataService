//{source,target,uuid}
MATCH (link:Relationship{uuid:$uuid})
RETURN link.type as label