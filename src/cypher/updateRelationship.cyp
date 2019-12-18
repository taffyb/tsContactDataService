//{uuid,source,target,label}
MATCH (r:Relationship{uuid:$uuid})
SET r.type=$label
RETURN {uuid:r.uuid,source:$source,target:$target,label:r.type} as relationship