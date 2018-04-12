use dungeon252_data;
#create weapons
#INSERT INTO weapons VALUE(NULL, "name", "attribute", weight, strength);
INSERT INTO weapons VALUE(NULL, "Fists", "Flesh", 0, 3);
INSERT INTO weapons VALUE(NULL, "Stick", "Wood", 1, 5);
INSERT INTO weapons VALUE(NULL, "Sword", "Metal,Sharp", 2, 10);
INSERT INTO weapons VALUE(NULL, "Warhammer", "Long,Metal", 3, 15);
INSERT INTO weapons VALUE(NULL, "Whip", "Long,Bounce", 1, 7);
INSERT INTO weapons VALUE(NULL, "Staff", "Long,Wood", 2, 7);
#create magiks
#INSERT INTO magiks VALUE(NULL, "name", "attribute", "goodagainst");
INSERT INTO magiks VALUE(NULL, "Familiar", "+7 Strength", "Dark,Light");
INSERT INTO magiks VALUE(NULL, "Fire", "+8 Strength", "Nature,Water,Dark");
INSERT INTO magiks VALUE(NULL, "Water", "+9 Strength", "Air,Fire");
INSERT INTO magiks VALUE(NULL, "Nature", "+8 Strength", "Air,Water,Light");
INSERT INTO magiks VALUE(NULL, "Air", "+9 Strength", "Nature,Fire");
INSERT INTO magiks VALUE(NULL, "Light", "+10 Strength", "Dark");
INSERT INTO magiks VALUE(NULL, "Dark", "+10 Strength", "Light");
INSERT INTO magiks VALUE(NULL, "Explosion", "+15 Strength", "None");
#create items
#INSERT INTO items VALUE(NULL, "name", "attribute", weight);
INSERT INTO items VALUE(NULL, "Chain mail", "Take 2/3 damage (rounded up)", 2);
INSERT INTO items VALUE(NULL, "Sandwhich", "Food (heal 10 hp)", 0);
INSERT INTO items VALUE(NULL, "Smoke machine", "always able to run", 3);
INSERT INTO items VALUE(NULL, "Stress ball", "Healing (+2 hp per room)", 1);
INSERT INTO items VALUE(NULL, "Dog tooth", "+3 Strength", 1);

#create rooms
#INSERT INTO rooms VALUE(NULL, "image", "event");
#create options
#INSERT INTO options VALUE(NULL, "option", rooms_room_id);
#create outcomes
#INSERT INTO outcomes VALUE("outcome", options_option_id, options_rooms_room_id);