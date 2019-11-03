//{eduuid:}

MATCH (ed:EntityDef{uuid:$eduuid})
MATCH (ed)-[:HAS_A]->(g:Group)-[:HAS_A]->(p:Property)-[:OF]->(pt:PropertyType)  
WITH ed,g,apoc.map.merge(p,pt) as prop
ORDER BY g.order, prop.order
WITH ed,g, collect(prop) as props
WITH ed,collect({name:g.name,order:g.order,props:props}) as groups
RETURN {name:ed.name,uuid:ed.uuid,display:ed.display,groups:groups} as entityDef