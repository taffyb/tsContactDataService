// {guuid:,moves:[{from:,to:,card:,isDiscard}],lastTurnId:}

MATCH (g{uuid:$guuid})-[:NEXT_TURN*]->(t:Turn)
WITH t
WHERE t.id=$lastTurnId
WITH t as lastTurn
MERGE (lastTurn)-[:NEXT_TURN]->(t:Turn{id:$lastTurnId+1})
WITH t
UNWIND $moves as move
CREATE (m:Move{from:move.from,to:move.to,card:move.card,puuid:move.puuid})
WITH t,m,move
FOREACH (x IN CASE WHEN move.isDiscard THEN ["isDiscard"] ELSE [] END |
	SET m:Discard
)
WITH t,collect(m) as moves
WITH t,moves, moves[0] as firstMove
MERGE (t)-[:NEXT_MOVE]->(firstMove)
WITH t,moves
UNWIND apoc.coll.pairsMin(moves) as pair
WITH moves,pair[0] as m1,pair[1] as m2
MERGE (m1)-[:NEXT_MOVE]->(m2)
RETURN length(moves) as moveCount