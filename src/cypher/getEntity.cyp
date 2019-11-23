// {uuid:"4a746383-2b88-4614-97c0-08964e40b919"}

MATCH (e:Entity{uuid:$uuid})

WITH e,properties(e) as props,filter(l IN labels(e) WHERE l <> 'Entity') as type

RETURN {type:type[0],uuid:e.uuid,props:props} as entity