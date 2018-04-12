use dungeon252;
#create weapons
INSERT INTO weapons VALUE(NULL, "name", "attribute", weight, strenght);
#create magiks
INSERT INTO magiks VALUE(NULL, "name", "attribute");
#create items
INSERT INTO items VALUE(NULL, "name", "attribute", weight);

#create rooms
INSERT INTO rooms VALUE(NULL, "image", "event");
#create options
INSERT INTO options VALUE(NULL, "option", rooms_room_id);
#create outcomes
INSERT INTO outcomes VALUE("outcome", options_option_id, options_rooms_room_id);