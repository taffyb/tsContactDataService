CREATE CONSTRAINT ON (e:EntityDef)
       ASSERT e.uuid IS UNIQUE
CREATE CONSTRAINT ON (e2:EntityDef)
       ASSERT e2.name IS UNIQUE

CREATE CONSTRAINT ON (pt:PropertyType)
       ASSERT p2.name IS UNIQUE

CREATE (:Test{message:"Hello World"})
CREATE (:Test{message:"New World"})

CREATE INDEX ON :Entity(uuid)


//Setup the Entity Types
MERGE (ed1:EntityDef{name:"Person"})
ON CREATE SET ed1.uuid=apoc.create.uuid() 
SET ed1.display="Firstname, Surname"
MERGE (ed2:EntityDef{name:"Organisation"})
ON CREATE SET ed2.uuid=apoc.create.uuid()
SET ed2.display="Name"
MERGE (ed3:EntityDef{name:"Event"})
ON CREATE SET ed3.uuid=apoc.create.uuid()
SET ed3.display="Name"

//Setup the Property Types
MERGE (string:PropertyType{type:"string"})
MERGE (date:PropertyType{type:"date"})
MERGE (memo:PropertyType{type:"memo"})
MERGE (truefalse:PropertyType{type:"true-false"})
MERGE (list:PropertyType{type:"list"})
MERGE (email:PropertyType{type:"email"})

//Add properties to the Person Entity Type
//Add the default Details Group
MERGE (ed1)-[:HAS_A]->(g1a:Group{name:"Details"})
SET g1a.order=toInteger(1)
MERGE (g1a)-[:HAS_A]->(p1a:Property{name:"Firstname"})-[:OF]->(string)
SET p1a.order=toInteger(1),p1a.label="First Name",p1a.required=true
MERGE (g1a)-[:HAS_A]->(p1b:Property{name:"Surname"})-[:OF]->(string)
SET p1b.order=toInteger(2)
MERGE (g1a)-[:HAS_A]->(p1c:Property{name:"DOB"})-[:OF]->(date)
SET p1c.order=toInteger(3), p1c.label="Date of Birth"
MERGE (g1a)-[:HAS_A]->(p1e:Property{name:"wemail"})-[:OF]->(email)
SET p1e.order=toInteger(4),p1e.label="Work Email"
MERGE (g1a)-[:HAS_A]->(p1f:Property{name:"pemail"})-[:OF]->(email)
SET p1f.order=toInteger(5),p1f.label="Personal Email"
//Add the Notes Group
MERGE (ed1)-[:HAS_A]->(g1b:Group{name:"Notes"})
SET g1b.order=toInteger(2)
MERGE (g1b)-[:HAS_A]->(p1d:Property{name:"Notes"})-[:OF]->(memo)
SET p1d.order=toInteger(1)

//Add properties to the Organisation Entity Type
//Add the default Details Group
MERGE (ed2)-[:HAS_A]->(g2a:Group{name:"Details"})
SET g2a.order=toInteger(1)
MERGE (g2a)-[:HAS_A]->(p2a:Property{name:"Name"})-[:OF]->(string)
SET p2a.order=toInteger(1),p2a.required=true
MERGE (g2a)-[:HAS_A]->(p2b:Property{name:"Address"})-[:OF]->(memo)
SET p2b.order=toInteger(2)
//Add the Notes Group
MERGE (ed2)-[:HAS_A]->(g2b:Group{name:"Notes"})
SET g2b.order=toInteger(2)
MERGE (g2b)-[:HAS_A]->(p2c:Property{name:"Notes"})-[:OF]->(memo)
SET p2c.order=toInteger(1)

//Add properties to the Event Entity Type
//Add the default Details Group
MERGE (ed3)-[:HAS_A]->(g3a:Group{name:"Details"})
SET g3a.order=toInteger(1)
MERGE (g3a)-[:HAS_A]->(p3a:Property{name:"Name"})-[:OF]->(string)
SET p3a.order=toInteger(1),p3a.required=true
MERGE (g3a)-[:HAS_A]->(p3b:Property{name:"sdate"})-[:OF]->(date)
SET p3b.order=toInteger(2),p3b.label="Start Date"
MERGE (g3a)-[:HAS_A]->(p3c:Property{name:"edate"})-[:OF]->(date)
SET p3c.order=toInteger(3),p3c.label="End Date"
MERGE (g3a)-[:HAS_A]->(p3d:Property{name:"Description"})-[:OF]->(memo)
SET p3c.order=toInteger(4)

RETURN *