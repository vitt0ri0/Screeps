var roleHarvester = require('role.harvester');

module.exports.loop = function () {
    // Your code goes here
    for (var name in Game.creeps) {
        var creep = Game.creeps[name];
        if (creep.memory.role == 'harvester') {
            roleHarvester.run(creep);
        }
    }
    var maxHarvesters = 8;
    // var currentNumHarvesters = _.sum(Game.creeps, (c) = > c.memory.role == 'harvester');
    var currentNumHarvesters = Game.creeps.length;
    console.log(currentNumHarvesters);

    var name = undefined;
    if (currentNumHarvesters < maxHarvesters) {
        name = Game.spawns.Spawn1.createCreep([WORK, WORK, CARRY, MOVE], undefined, {
            role: 'harvester',
            working: false
        });
    }

    if (!(name < 0)) {
        console.log("! new creep: " + name);
    }

};

