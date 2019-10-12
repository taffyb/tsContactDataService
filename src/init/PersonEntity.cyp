CREATE (p:Entity{uuid:apoc.create.uuid()})
SET p:Person,p.Firstname="John",p.Surname="Smith",p.Notes="this is some \n multi\nlined\ntext",p.wemail="amith.john@domain.co.uk"