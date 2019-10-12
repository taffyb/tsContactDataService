//{eduuid:}

MATCH (ed:EntityDef{uuid:$eduuid})-[:HAS_A]->(p:Property)-[:OF]->(pt:PropertyType)  
WITH ed, apoc.map.merge(p,pt) as prop
ORDER BY prop.order
WITH ed,collect(prop) as props
RETURN {name:ed.name,uuid:ed.uuid,props:props} as entityDef