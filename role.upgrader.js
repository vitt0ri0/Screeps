var roleUpgrader = {

        run: function (creep) {
            if (creep.memory.upgrading && creep.carry.energy == 0) {
                creep.memory.upgrading = false;
            } else if (!creep.memory.upgrading && creep.carry.energy == creep.carryCapacity) {
                creep.memory.upgrading = true;
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
                var source = this.pos.findClosestByPath(FIND_SOURCES_ACTIVE);
                if (creep.harvest(source) == ERR_NOT_IN_RANGE)
                    creep.moveTo(source, {visualizePathStyle: {stroke: '#ffaa00'}});
            }
        }
    }
;

module.exports = roleUpgrader;