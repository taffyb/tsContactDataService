// {euuid:}

MATCH (e:Entity{uuid:$euuid})
WITH e,properties(e) as props

RETURN props as entity