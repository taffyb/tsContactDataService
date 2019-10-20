MATCH (ed:EntityDef)
call apoc.cypher.run("MATCH (:`"+ed.name+"`) RETURN count(*) as count",null) yield value
WITH ed,value.count as count
MATCH (ed)-[:HAS_A]->(p:Property)-[:OF]->(pt:PropertyType)  
WITH ed,count, apoc.map.merge(p,pt) as prop
ORDER BY prop.order
WITH ed,collect(prop) as props,count
ORDER BY count
RETURN collect({name:ed.name,uuid:ed.uuid,display:ed.display,props:props}) as entityDefs