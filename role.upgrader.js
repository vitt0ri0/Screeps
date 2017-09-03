var roleUpgrader = {

        run: function (creep) {
            if (creep.memory.upgrading == undefined) {
                creep.memory.upgrading = false;
            }
            if (creep.memory.upgrading && creep.carry.energy == 0) {
                creep.memory.upgrading = true;
            } else if (!creep.memory.upgrading && creep.carry.energy == creep.carryCapacity) {
                creep.memory.upgrading = false;
            }
                // if (creep.carry.energy == 0) {
                //     creep.say('gonna harvest');
                // }
            if (creep.memory.upgrading) {
                if (creep.upgradeController(creep.room.controller) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(creep.room.controller, {visualizePathStyle: {stroke: '#ffaa00'}});
                }
            } else {
                // if (creep.carry.energy == creep.carryCapacity) {
                //     creep.say('gonna upgrade');
                // }
                var sources = creep.room.find(FIND_SOURCES);
                if (creep.harvest(sources[0]) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(sources[0], {visualizePathStyle: {stroke: '#ffaa00'}});
                }
            }
        }
    }
;

module.exports = roleUpgrader;