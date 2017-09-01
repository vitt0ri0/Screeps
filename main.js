var roleHarvester = require('role.harvester');

module.exports.loop = function () {
    // Your code goes here
    for (var name in Game.creeps) {
        var creep = Game.creeps[name];
        if (creep.memory.role == 'harvester') {
            roleHarvester.run(creep);
        }
    }

}