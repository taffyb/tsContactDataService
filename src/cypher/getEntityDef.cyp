//{eduuid:}

MATCH (ed:EntityDef{uuid:$eduuid})
MATCH (ed)-[:HAS_A]->(p:Property)-[:OF]->(pt:PropertyType)
WITH ed,p,pt
RETURN {name:ed.name,props:collect({name:p.name,type:pt})} as entityDef