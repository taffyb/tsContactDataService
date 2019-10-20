MATCH (e:Entity)
WITH e,properties(e) as props,filter(l IN labels(e) WHERE l <> 'Entity') as type
RETURN collect({type:type[0],uuid:e.uuid,props:props}) as entities