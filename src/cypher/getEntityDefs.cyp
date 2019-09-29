MATCH (ed:EntityDef)
MATCH (ed)-[:HAS_A]->(p:Property)-[:OF]->(pt:PropertyType)
WITH ed,collect({name:p.name,type:pt}) as props
RETURN collect({name:ed.name,props:props}) as entityDefs