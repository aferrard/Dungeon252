use dungeon252_data;
#create weapons
#INSERT INTO weapons VALUE(NULL, "name", "attribute", weight, strength);
INSERT INTO weapons VALUE(NULL, "Fists", "Flesh", 0, 3);
INSERT INTO weapons VALUE(NULL, "Stick", "Wood", 1, 5);
INSERT INTO weapons VALUE(NULL, "Sword", "Metal,Sharp", 2, 10);
INSERT INTO weapons VALUE(NULL, "Warhammer", "Long,Metal", 3, 15);
INSERT INTO weapons VALUE(NULL, "Whip", "Long,Bounce", 1, 7);
INSERT INTO weapons VALUE(NULL, "??? Staff", "Long,Wood", 2, 7);
INSERT INTO weapons VALUE(NULL, "Fish", "Slippery,Food", 1, 1);
INSERT INTO weapons VALUE(NULL, "Basic staff", "Long,Wood",1,7);
INSERT INTO weapons VALUE(NULL, "Fire sword", "Metal",1,12);
#create magiks
#INSERT INTO magiks VALUE(NULL, "name", "attribute", "goodagainst");
INSERT INTO magiks VALUE(NULL, "Familiar", 7, "Dark,Light");
INSERT INTO magiks VALUE(NULL, "Fire", 8, "Nature,Water,Dark");
INSERT INTO magiks VALUE(NULL, "Water", 9, "Air,Fire");
INSERT INTO magiks VALUE(NULL, "Nature", 8, "Air,Water,Light");
INSERT INTO magiks VALUE(NULL, "Air", 9, "Nature,Fire");
INSERT INTO magiks VALUE(NULL, "Light", 10, "Dark");
INSERT INTO magiks VALUE(NULL, "Dark", 10, "Light");
INSERT INTO magiks VALUE(NULL, "Explosion", 15, "None");
#create items
#INSERT INTO items VALUE(NULL, "name", "attribute", weight);
INSERT INTO items VALUE(NULL, "Chain mail", "Take 2/3 damage (rounded up)", 2);
INSERT INTO items VALUE(NULL, "Sandwhich", "Food (heal 10 hp)", 0);
INSERT INTO items VALUE(NULL, "Smoke machine", "always able to run", 3);
INSERT INTO items VALUE(NULL, "Stress ball", "Healing (+2 hp per room)", 1);
INSERT INTO items VALUE(NULL, "Dog tooth", "+3 Strength", 1);
INSERT INTO items VALUE(NULL, "Shell", "room10", 2);
INSERT INTO items VALUE(NULL, "Grief Orb", "room10", 2);
INSERT INTO items VALUE(NULL, "Eternal Flame", "room10", 2);
INSERT INTO items VALUE(NULL, "Atomic Bomb", "room10", 3);
INSERT INTO items VALUE(NULL, "Frenzy Seed", "room10", 2);
INSERT INTO items VALUE(NULL, "Fluffy Cloud", "room10", 2);
INSERT INTO items VALUE(NULL, "Pure Orb", "room10", 2);

#create rooms
#INSERT INTO rooms VALUE(NULL, "image", "event");
INSERT INTO rooms VALUE(NULL, "GNOME", "gnome.jpg", "A gnome (10 HP) walks up to you and asks you a riddle");
INSERT INTO rooms VALUE(NULL, "DOG", "dog.jpg", "You meet a dog (7 HP). The dog barks loudly at you, and looks like he is going to attack.");
INSERT INTO rooms VALUE(NULL, "HOLE", "hole.jpg", "You encounter a room with a large hole in the middle.");
INSERT INTO rooms VALUE(NULL, "CHEST", "chest.jpg", "You discover a chest in the center of the room, illuminated by a pillar of light.");
INSERT INTO rooms VALUE(NULL, "POTIONS", "potions.jpg", "You encounter a room filled with 3 statues, each of which appear to be holding a glass container with a potion-like liquid inside.");
INSERT INTO rooms VALUE(NULL, "DARKWIZARD", "darkwizard.jpg", "You encounter a Dark Wizard! He sees you as you enter the room and immediately moves toward you.");
INSERT INTO rooms VALUE(NULL, "SEASHELL", "seashell.jpg", "You find yourself looking at a giant seashell. You don’t know why, but it ominously blocks the door.");
INSERT INTO rooms VALUE(NULL, "CAMPFIRE", "campfire.jpg", "A campfire is lit in the center of the room. You don’t know how long it’s been burning, but the logs are all almost ash.");
INSERT INTO rooms VALUE(NULL, "HELICOPTER", "helicopter.jpg", "You stare ahead as a helicopter hovers. You don’t know how it even got in here. It’s too large to fit through the doors, and the floors and ceiling are solid stone. It only has enough space to hover a few inches off the ground before it would hit the ceiling with its enormous rotor blades. It slowly begins floating towards you.");
INSERT INTO rooms VALUE(NULL, "SALESMAN", "salesman.jpg", "You encounter a strange looking man who introduces himself as an underground salesman. He offers you weapon that appears to be a warhammer in exchange for 30 gold. What do you do?");
INSERT INTO rooms VALUE(NULL, "DRYAD", "dryad.jpg", "A Dryad sits in the center of the room, swaying and taking in light from a small hole in the ceiling. She shakily opens her arms wide and offers you some fruit, telling you to take one.");
INSERT INTO rooms VALUE(NULL, "FEAST", "feast.jpg", "You enter a room where there is a long table set up with what appears to be a feast. There are many chairs around the table but they are all empty. What do you do?");
INSERT INTO rooms VALUE(NULL, "CHOOSEAROOM", "choosearoom.jpg", "You encounter a weirdly empty room with four doors. The first door appears to be very bright because of the flickering light underneath it, the second door appears to have a riddle on it, the third door appears be a dark room, and the fourth door you can hear mysterious hissing sound. Which door do you open?");
INSERT INTO rooms VALUE(NULL, "LADDERS", "ladders.jpg","You enter a room that looks relatively empty except for 2 large ladders that both look to lead to raised platforms. What do you do?");
INSERT INTO rooms VALUE(NULL, "ROOM10", "room10.jpg", "Ten rooms have gone by quicker than you could have possibly realized, and you find yourself before a massive golden throne. A being sits upon the throne that you don’t recognize, seemingly wreathed in shadows. However, at their feet lies the corpses of many, many heroes. \“I was once like you,\” They echo, voice booming throughout the dungeon. \“A hero, someone to look up to. Not so much now. I rule this place, just like the others before me. So do it, hero. Take my place if you dare.\”");
#create choices
#INSERT INTO choices VALUE(NULL, "choice", rooms_room_id);
#create outcomes
#INSERT INTO outcomes VALUE("outcome", choices_choice_id);