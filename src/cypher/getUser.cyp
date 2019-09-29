//params: {uuid:}

MATCH (u:User{uuid:$uuid}) 
RETURN u as user