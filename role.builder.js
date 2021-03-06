var roleBuilder = {
    run: function (creep) {
        if (creep.memory.building && creep.carry.energy == 0) {
            var constructionSite = creep.pos.findClosestByPath(FIND_CONSTRUCTION_SITES);
            creep.memory.destinationId = constructionSite.id;
            creep.memory.building = false;
        } else if (!creep.memory.building && creep.carry.energy == creep.carryCapacity) {
            creep.memory.building = true;
        }

        if (creep.memory.building) {
            var constructionSite = Game.getObjectById(creep.memory.destinationId);

            if (constructionSite != undefined) {
                if (creep.build(constructionSite) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(constructionSite, {visualizePathStyle: {stroke: '#ffaa00'}});
                }
            }
        } else {
            // var sources = creep.room.find(FIND_SOURCES);
            var source = creep.pos.findClosestByPath(FIND_SOURCES_ACTIVE);
            if (creep.harvest(source) == ERR_NOT_IN_RANGE)
                creep.moveTo(source, {visualizePathStyle: {stroke: '#ffaa00'}});
        }
    }

};
module.exports = roleBuilder;