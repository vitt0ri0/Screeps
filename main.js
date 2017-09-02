var roleHarvester = require('role.harvester');
var roleUpgrader = require('role.upgrader');

module.exports.loop = function () {
    //clear memory
    for (var name in Memory.creeps) {
        if (Game.creeps[name] == undefined) {
            delete Memory.creeps[name];
        }
    }

    // do some work
    for (var name in Game.creeps) {
        var creep = Game.creeps[name];
        if (creep.memory.role == 'harvester') {
            roleHarvester.run(creep);
        }
        if (creep.memory.role == 'upgrader') {
            roleUpgrader.run(creep);
        }
    }
    // var maxHarvesters = 8;
    // // var currentNumHarvesters = _.sum(Game.creeps, (c) = > c.memory.role == 'harvester');
    // var currentNumHarvesters = Game.creeps.length;
    // console.log(currentNumHarvesters);
    //
    // var name = undefined;
    // if (currentNumHarvesters < maxHarvesters) {
    //     name = Game.spawns.Spawn1.createCreep([WORK, WORK, CARRY, MOVE], undefined, {
    //         role: 'harvester',
    //         working: false
    //     });
    // }
    //
    // if (!(name < 0)) {
    //     console.log("! new creep: " + name);
    // }

};

