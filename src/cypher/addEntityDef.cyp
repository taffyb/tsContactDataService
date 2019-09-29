//{name:}

CREATE (ed:EntityDef{name:$name})
ed.uuid=apoc.create.uuid()
RETURN ed.uuid as uuid
