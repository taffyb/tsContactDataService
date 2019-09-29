//{"type":"","properties":[{"name":,"value":{"ptuuid":,"value":}}]}

CREATE (e:Entity)
SET e.uuid=apoc.create.uuid()
WITH e
CALL apoc.create.addLabels([e],[$type]) YIELD node
WITH e
UNWIND $properties as p
CALL apoc.create.setProperty([e],p.name,p.value) YIELD node
RETURN e as entity