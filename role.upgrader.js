var roleUpgrader = {

        run: function (creep) {
            if (creep.carry.energy < creep.carryCapacity) {
                // if (creep.carry.energy == 0) {
                //     creep.say('gonna harvest');
                // }
                var sources = creep.room.find(FIND_SOURCES);
                if (creep.harvest(sources[0]) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(sources[0]);
                }
            } else {
                // if (creep.carry.energy == creep.carryCapacity) {
                //     creep.say('gonna upgrade');
                // }
                if (creep.upgradeController(creep.room.controller) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(creep.room.controller);
                }
            }
        }
    }
;

module.exports = roleUpgrader;