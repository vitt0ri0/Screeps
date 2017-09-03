var roleHarvester = require('role.harvester');
var roleUpgrader = require('role.upgrader');

var maxHarversters = 2;
var maxUpgraders = 6;

module.exports.loop = function () {
    //clear memory
    for (var name in Memory.creeps) {
        if (Game.creeps[name] == undefined) {
            delete Memory.creeps[name];
        }
    }

    // do some work
    var numHarvesters = 0;
    var numUpgraders = 0;
    for (var name in Game.creeps) {
        var creep = Game.creeps[name];
        if (creep.memory.role == 'harvester') {
            roleHarvester.run(creep);
            numHarvesters += 1;
        }
        if (creep.memory.role == 'upgrader') {
            roleUpgrader.run(creep);
            numUpgraders += 1;
        }
    }

    // spawn new creeps
    if (numHarvesters < numUpgraders) {
        if (numHarvesters < maxHarversters)
            createHarvester = true;
        else if (numUpgraders < maxUpgraders)
            createUpgrader = true;
    } else {
        if (numUpgraders < maxUpgraders)
            createUpgrader = true;
        else if (numHarvesters < maxHarversters)
            createHarvester = true;
    }
    // spawn creep
    if (createHarvester) {
        Game.spawns.Spawn1.createCreep([WORK, WORK, CARRY, MOVE], undefined, {role: 'harvester', harvesting: false});
        createHarvester = false;
    }
    if (createUpgrader) {
        Game.spawns.Spawn1.createCreep([WORK, CARRY, MOVE, MOVE], undefined, {role: 'upgrader', upgrading: false});
        createUpgrader = false;
    }


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

