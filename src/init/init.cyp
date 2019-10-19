CREATE CONSTRAINT ON (e:EntityDef)
       ASSERT e.uuid IS UNIQUE
CREATE CONSTRAINT ON (e2:EntityDef)
       ASSERT e2.name IS UNIQUE

CREATE CONSTRAINT ON (pt:PropertyType)
       ASSERT p2.name IS UNIQUE

CREATE (:Test{message:"Hello World"})
CREATE (:Test{message:"New World"})

CREATE INDEX ON :Entity(uuid)

MERGE (ed1:EntityDef{name:"Person"})
ON CREATE SET ed1.uuid=apoc.create.uuid()
MERGE (ed2:EntityDef{name:"Organisation"})
ON CREATE SET ed2.uuid=apoc.create.uuid()
MERGE (ed3:EntityDef{name:"Event"})
ON CREATE SET ed3.uuid=apoc.create.uuid()
MERGE (string:PropertyType{type:"string"})
MERGE (date:PropertyType{type:"date"})
MERGE (memo:PropertyType{type:"memo"})
MERGE (truefalse:PropertyType{type:"true-false"})
MERGE (list:PropertyType{type:"list"})
MERGE (email:PropertyType{type:"email"})
MERGE (ed1)-[:HAS_A]->(p1a:Property{name:"Firstname"})-[:OF]->(string)
SET p1a.order=toInteger(1),p1a.label="First Name",p1a.required=true
MERGE (ed1)-[:HAS_A]->(p1b:Property{name:"Surname"})-[:OF]->(string)
SET p1b.order=toInteger(2)
MERGE (ed1)-[:HAS_A]->(p1c:Property{name:"DOB"})-[:OF]->(date)
SET p1c.order=toInteger(3), p1c.label="Date of Birth"
MERGE (ed1)-[:HAS_A]->(p1d:Property{name:"Notes"})-[:OF]->(memo)
SET p1d.order=toInteger(4)
MERGE (ed1)-[:HAS_A]->(p1e:Property{name:"wemail"})-[:OF]->(email)
SET p1e.order=toInteger(5),p1e.label="Work Email"
MERGE (ed1)-[:HAS_A]->(p1f:Property{name:"pemail"})-[:OF]->(email)
SET p1f.order=toInteger(6),p1f.label="Personal Email"
MERGE (ed2)-[:HAS_A]->(p2a:Property{name:"Name"})-[:OF]->(string)
SET p2a.order=toInteger(1),p2a.required=true
MERGE (ed2)-[:HAS_A]->(p2b:Property{name:"Address"})-[:OF]->(memo)
SET p2b.order=toInteger(2)
MERGE (ed2)-[:HAS_A]->(p2c:Property{name:"Notes"})-[:OF]->(memo)
SET p2c.order=toInteger(3)
MERGE (ed3)-[:HAS_A]->(p3a:Property{name:"Name"})-[:OF]->(string)
SET p3a.order=toInteger(1),p3a.required=true
MERGE (ed3)-[:HAS_A]->(p3b:Property{name:"sdate"})-[:OF]->(date)
SET p3b.order=toInteger(2),p3b.label="Start Date"
MERGE (ed3)-[:HAS_A]->(p3c:Property{name:"edate"})-[:OF]->(date)
SET p3c.order=toInteger(3),p3c.label="End Date"
MERGE (ed3)-[:HAS_A]->(p3d:Property{name:"Description"})-[:OF]->(memo)
SET p3c.order=toInteger(4)
