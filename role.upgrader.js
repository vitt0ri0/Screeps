var roleUpgrader = {

        run: function (creep) {
            if(creep.carry.energy < creep.carryCapacity) {
                var sources = creep.room.find(FIND_SOURCES);
                if (creep.harvest(sources[0]) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(sources[0]);
                    creep.say(creep.role + ' harvest');
                }
            }
            else if (creep.upgradeController(creep.room.controller) == ERR_NOT_IN_RANGE) {
                creep.moveTo(creep.room.controller);
                creep.say(creep.role + ' upgrade controller');
            }
        }
    }
;

module.exports = roleUpgrader;