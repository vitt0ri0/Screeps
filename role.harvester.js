// require(tools.js);

var roleHarvester = {

    /** @param {Creep} creep **/
    run: function (creep) {
        //comment
        // var source = creep.memory.source;

        if (!creep.memory.harvesting && creep.carry.energy == 0) {
            var energySource = creep.pos.findClosestByPath(FIND_SOURCES_ACTIVE);
            creep.memory.energySource = energySource.id;
            creep.say('harvest');
            creep.memory.harvesting = true;
        } else if (creep.memory.harvesting && creep.carry.energy == creep.carryCapacity) {
            creep.say('carry');
            creep.memory.harvesting = false;
        }

        if (creep.memory.harvesting) {
            //debug
            // creep.memory.energySource.moveTo;
            // source = creep.pos.findClosestByPath(FIND_SOURCES_ACTIVE);
            // creep.say("fuck")
            // creep.move(creep.memory.energySource.pos);
            try {
                var destination = Game.getObjectById(creep.memory.energySource);
            } catch (TypeError) {
                var energySource = creep.pos.findClosestByPath(FIND_SOURCES_ACTIVE);
                creep.memory.energySource = energySource.id;
                var destination = Game.getObjectById(creep.memory.energySource);
            }
            // creep.moveTo(destination);
            if (creep.harvest(destination) == ERR_NOT_IN_RANGE)
                creep.moveTo(destination);

        } else {
            // if (creep.carry.energy == creep.carryCapacity) {
            // }
            var supplyStructure = null;
            if (!spawnIsFull('Spawn1')) {
                supplyStructure = Game.spawns.Spawn1;
            }
            else {
                var extensions = Game.spawns.Spawn1.room.find(FIND_MY_STRUCTURES, {
                    filter: {structureType: STRUCTURE_EXTENSION},
                });
                for (var i in extensions) {
                    if (extensions[i].energy < extensions[i].energyCapacity) {
                        supplyStructure = extensions[i];
                    }
                }
            }

            if (supplyStructure == null) {
                var containers = Game.spawns.Spawn1.room.find(FIND_STRUCTURES, {
                    filter: {structureType: STRUCTURE_CONTAINER},
                });
                // console.log(containers.length)
                for (var i in containers) {
                    if (containers[i].store[RESOURCE_ENERGY] < containers[i].storeCapacity) {
                        supplyStructure = containers[i];
                    }
                }
            }
            // console.log(supplyStructure);
            //supply energy
            if (supplyStructure != null)
                if (creep.transfer(supplyStructure, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(supplyStructure);
                }

        }
    }


};

module.exports = roleHarvester;

function spawnIsFull(SpawnName) {
    return Game.spawns[SpawnName].energy == Game.spawns[SpawnName].energyCapacity;
}