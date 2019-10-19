//{"uuid":"","props":[{"key":,"value":}]}

MATCH (e:Entity{uuid:$uuid})
WITH e
UNWIND $props as p
CALL apoc.create.setProperty([e],p.key,p.value) YIELD node
RETURN e as entity