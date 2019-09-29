//{guuid:}

MATCH p=(:Game{uuid:$guuid})-[:NEXT_TURN*]->(t:Turn)
WITH COLLECT(p) AS paths, MAX(length(p)) AS maxLength 
WITH FILTER(path IN paths WHERE length(path)= maxLength) AS longestPaths,paths
WITH last(nodes(last(longestPaths))) as lastTurn
RETURN lastTurn.id as lastTurnId