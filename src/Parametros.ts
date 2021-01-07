require("dotenv").config();

const PROFESSION = process.env.PROFESSION;
const LEVEL_MIN = process.env.LEVEL_MIN;
const LEVEL_MAX = process.env.LEVEL_MAX;
const WORLD = process.env.WORLD;

enum Professions {
	ALL_VOCATIONS = 0,
	NONE = 1,
	DRUID = 2,
	KNIGHT = 3,
	PALADIN = 4,
	SORCERER = 5,
}

// console.log(WORLD);

export default {
	PROFESSION: Professions[PROFESSION],
	LEVEL_MIN: LEVEL_MIN,
	LEVEL_MAX: LEVEL_MAX,
	WORLD: WORLD,
};
