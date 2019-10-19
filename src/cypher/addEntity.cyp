//{"type":"","props":[{"key":,"value":}]}

CREATE (e:Entity)
SET e.uuid=apoc.create.uuid()
WITH e
CALL apoc.create.addLabels([e],[$type]) YIELD node
WITH e
UNWIND $props as p
CALL apoc.create.setProperty([e],p.key,p.value) YIELD node
RETURN e as entity