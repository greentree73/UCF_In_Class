--insert records into realms table
Insert into realms(name, ruler, description) values ('Knights Realm', 'King Arthur', 'A land of brave knights and grand castles.');
Insert into realms(name, ruler, description) values ('Sapphire Coast', 'Queen Marina', 'A coastal realm known for its blue waters.');
Insert into realms(name, ruler, description) values ('Iron Peaks', 'Lord Ironhand', 'Mountainous region with rich mines.');
Insert into realms(name, ruler, description) values ('Mount Doom', 'Lord Voldemort', 'A dangerous realm where dark magic and fear lurk.');
Insert into realms(name, ruler, description) values ('Dragon Lair', 'Dragon King', 'A hidden realm where dragons roam.');
Insert into realms(name, ruler, description) values ('The Shire', 'Frodo Baggins', 'A magical realm with many magical creatures.');

--insert records into characters table
Insert into characters(name, role, realm_id) values ('Sir Lancelot', 'Knight', 1);
Insert into characters(name, role, realm_id) values ('Merlin', 'Mage', 1);
Insert into characters(name, role, realm_id) values ('Gwen', 'Rogue', 1);
Insert into characters(name, role, realm_id) values ('Mary', 'Priest', 2);
Insert into characters(name, role, realm_id) values ('Eleanor', 'Rogue', 2);
Insert into characters(name, role, realm_id) values ('Fin', 'Rogue', 2);
Insert into characters(name, role, realm_id) values ('Aragorn', 'Knight', 3);
Insert into characters(name, role, realm_id) values ('Bilbo', 'Hobbit', 3);
Insert into characters(name, role, realm_id) values ('Gandalf', 'Wizard', 3);
Insert into characters(name, role, realm_id) values ('Arwen', 'Mage', 4);
Insert into characters(name, role, realm_id) values ('Gollum', 'Goblin', 4);
Insert into characters(name, role, realm_id) values ('Samwise', 'Hobbit', 5);
Insert into characters(name, role, realm_id) values ('Pippin', 'Hobbit', 5);
Insert into characters(name, role, realm_id) values ('Frodo', 'Hobbit', 6);

--insert records into items table
Insert into items(name, type, power) values ('Sword of the Dragon', 'Weapon', 100);
Insert into items(name, type, power) values ('Shield of Unbreakable Will', 'Defense', 50);
Insert into items(name, type, power) values ('Dragon Heart', 'Power', 150);
Insert into items(name, type, power) values ('Robe of the Phoenix', 'Defense', 75);
Insert into items(name, type, power) values ('Gandalf''s One Ring', 'Power', 200);
Insert into items(name, type, power) values ('Hobbit-hole Key', 'Key', 1);
  
--insert records into quests table
Insert into quests(title, realm_id) values ('The One Ring', 1);
Insert into quests(title, realm_id) values ('The Fellowship of the Ring', 1);
Insert into quests(title, realm_id) values ('The Lost Ring', 2);
Insert into quests(title, realm_id) values ('The Hobbit', 3);
Insert into quests(title, realm_id) values ('The Return of the King', 4);
Insert into quests(title, realm_id) values ('The Fellowship of the Ring', 5);

--insert records into quest_assignments table
Insert into quest_assignments(quest_id, character_id, item_id) values (1, 1, 1);
Insert into quest_assignments(quest_id, character_id, item_id) values (2, 1, 2);
Insert into quest_assignments(quest_id, character_id, item_id) values (3, 2, 3);
Insert into quest_assignments(quest_id, character_id, item_id) values (4, 3, 4);
Insert into quest_assignments(quest_id, character_id, item_id) values (5, 4, 5);
Insert into quest_assignments(quest_id, character_id, item_id) values (6, 5, 6);           



