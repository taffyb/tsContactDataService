CREATE CONSTRAINT ON (e:EntityDef)
       ASSERT e.uuid IS UNIQUE
CREATE CONSTRAINT ON (e2:EntityDef)
       ASSERT e2.uuid IS EXISTS

CREATE (:Test{message:"Hello World"})
CREATE (:Test{message:"New World"})