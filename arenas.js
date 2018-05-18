const tileTypes = require("./tileTypes");

const Arenas = [
{
	name:"On an open field",
	description:"A wide-open field",
	rows:12,
	cols:12,
	points:100,
	tileSize:32,
	tiles: [
		[tileTypes[0],tileTypes[1],tileTypes[1],tileTypes[1],tileTypes[1],tileTypes[1],tileTypes[1],tileTypes[1],tileTypes[1],tileTypes[1],tileTypes[1],tileTypes[2]],
		[tileTypes[3],tileTypes[4],tileTypes[4],tileTypes[4],tileTypes[4],tileTypes[4],tileTypes[4],tileTypes[4],tileTypes[4],tileTypes[4],tileTypes[4],tileTypes[5]],
		[tileTypes[3],tileTypes[4],tileTypes[4],tileTypes[4],tileTypes[4],tileTypes[4],tileTypes[4],tileTypes[4],tileTypes[4],tileTypes[4],tileTypes[4],tileTypes[5]],
		[tileTypes[3],tileTypes[4],tileTypes[4],tileTypes[4],tileTypes[4],tileTypes[4],tileTypes[4],tileTypes[4],tileTypes[4],tileTypes[4],tileTypes[4],tileTypes[5]],
		[tileTypes[3],tileTypes[4],tileTypes[4],tileTypes[4],tileTypes[4],tileTypes[4],tileTypes[4],tileTypes[4],tileTypes[4],tileTypes[4],tileTypes[4],tileTypes[5]],
		[tileTypes[3],tileTypes[4],tileTypes[4],tileTypes[4],tileTypes[4],tileTypes[4],tileTypes[4],tileTypes[4],tileTypes[4],tileTypes[4],tileTypes[4],tileTypes[5]],
		[tileTypes[3],tileTypes[4],tileTypes[4],tileTypes[4],tileTypes[4],tileTypes[4],tileTypes[4],tileTypes[4],tileTypes[4],tileTypes[4],tileTypes[4],tileTypes[5]],
		[tileTypes[3],tileTypes[4],tileTypes[4],tileTypes[4],tileTypes[4],tileTypes[4],tileTypes[4],tileTypes[4],tileTypes[4],tileTypes[4],tileTypes[4],tileTypes[5]],
		[tileTypes[3],tileTypes[4],tileTypes[4],tileTypes[4],tileTypes[4],tileTypes[4],tileTypes[4],tileTypes[4],tileTypes[4],tileTypes[4],tileTypes[4],tileTypes[5]],
		[tileTypes[3],tileTypes[4],tileTypes[4],tileTypes[4],tileTypes[4],tileTypes[4],tileTypes[4],tileTypes[4],tileTypes[4],tileTypes[4],tileTypes[4],tileTypes[5]],
		[tileTypes[3],tileTypes[4],tileTypes[4],tileTypes[4],tileTypes[4],tileTypes[4],tileTypes[4],tileTypes[4],tileTypes[4],tileTypes[4],tileTypes[4],tileTypes[5]],
		[tileTypes[6],tileTypes[7],tileTypes[7],tileTypes[7],tileTypes[7],tileTypes[7],tileTypes[7],tileTypes[7],tileTypes[7],tileTypes[7],tileTypes[7],tileTypes[8]]
	]
}
];

module.exports = Arenas;