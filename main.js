var roleHarvester = require('role.harvester');
var roleUpgrader = require('role.upgrader');
var roleBuilder = require('role.builder');

var maxHarversters = 5;
var maxUpgraders = 2;
var maxBuilders = 5;
var createHarvester = false;
var createUpgrader = false;
var createBuilder = false;

module.exports.loop = function () {
    //clear memory
    for (var name in Memory.creeps) {
        if (Game.creeps[name] == undefined) {
            delete Memory.creeps[name];
        }
    }

    // do some work
    var numHarvesters = 0;
    var numBuilders = 0;
    var numUpgraders = 0;


    // constructionObjectsAvailable
    var constructionObjectsAvailable = false;
    for (var item in Game.constructionSites) {
        var constrObj = Game.constructionSites[item];
        if (constrObj.progress < constrObj.progressTotal)
            constructionObjectsAvailable = true;
    }

    // total energy storage
    var energyStorageFull = (Game.spawns['Spawn1'].energy == Game.spawns['Spawn1'].energyCapacity);

    for (var name in Game.creeps) {
        var creep = Game.creeps[name];

        if (creep.memory.role == 'harvester') {
            numHarvesters += 1;
            if (!energyStorageFull) {
                roleHarvester.run(creep);
            }
            else if (constructionObjectsAvailable) {
                roleBuilder.run(creep);
            } else {
                roleUpgrader.run(creep);
            }

        }
        if (creep.memory.role == 'upgrader') {
            numUpgraders += 1;
            roleUpgrader.run(creep);
        }
        if (creep.memory.role == 'builder') {
            numBuilders += 1;
            if (constructionObjectsAvailable) {
                roleBuilder.run(creep);
            } else {
                roleUpgrader.run(creep);
            }
        }
    }

    // spawn new creeps
    if (numHarvesters < maxHarversters) {
        createHarvester = true;
    } else if (numUpgraders < maxUpgraders) {
        createUpgrader = true;
    } else if (numBuilders < maxBuilders) {
        createBuilder = true;
    }

    // spawn creep
    if (createHarvester) {
        Game.spawns.Spawn1.createCreep([WORK, WORK, CARRY, CARRY, MOVE], undefined,
            {role: 'harvester', harvesting: false});
        createHarvester = false;
    }
    if (createUpgrader) {
        Game.spawns.Spawn1.createCreep([WORK, WORK, CARRY, CARRY, MOVE, MOVE], undefined,
            {role: 'upgrader', upgrading: false});
        createUpgrader = false;
    }
    if (createBuilder) {
        Game.spawns.Spawn1.createCreep([WORK, WORK, CARRY, CARRY, MOVE, MOVE], undefined,
            {role: 'builder', building: false});
        createBuilder = false;
    }


    // if (numBuilders < maxBuilders) {
    //     Game.spawns.Spawn1.createCreep([WORK, WORK, CARRY, MOVE], undefined, {role: 'builder', building: false});
    // }


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

