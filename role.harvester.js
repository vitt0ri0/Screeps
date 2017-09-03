var roleHarvester = {

    /** @param {Creep} creep **/
    run: function (creep) {
        if (creep.carry.energy < creep.carryCapacity) {
            // if (creep.carry.energy == 0) {
            //     creep.say('gonna harvest');
            // }
            var source = creep.pos.findClosestByPath(FIND_SOURCES_ACTIVE);
            if (creep.harvest(source) == ERR_NOT_IN_RANGE)
                creep.moveTo(source, {visualizePathStyle: {stroke: '#ffaa00'}});
        } else {
            // if (creep.carry.energy == creep.carryCapacity) {
            //     creep.say('carry energy');
            // }
            if (Game.spawns['Spawn1'].energy < Game.spawns['Spawn1'].energyCapacity) {
                if (creep.transfer(Game.spawns['Spawn1'], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(Game.spawns['Spawn1'], {visualizePathStyle: {stroke: '#ffaa00'}});
                }
            }
        }
    }
};

module.exports = roleHarvester;