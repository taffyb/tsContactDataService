MATCH (ed:EntityDef)-[:HAS_A]->(p:Property)-[:OF]->(pt:PropertyType)  
WITH ed, apoc.map.merge(p,pt) as prop
ORDER BY prop.order
WITH ed,collect(prop) as props
RETURN collect({name:ed.name,uuid:ed.uuid,props:props}) as entityDefs