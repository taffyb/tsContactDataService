//{source,target,uuid}
MATCH (source:Entity{uuid:$source}),(target:Entity{uuid:$target})
MATCH (source)-[link]->(target)
WITH source, target, link
WHERE link.uuid=$uuid
RETURN type(link) as label