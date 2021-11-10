const AccessControl = require('accesscontrol');

let roleObj = {
    admin: {
        profile: {
            'create:any': ['*'],
            'read:any': ['*'],
            'update:any': ['*'],
            'delete:any': ['*']
        }
    },
    user: {
        profile: {
            'read:own': ['*','!password','!_id','!updatedAt','!createdAt'],
            'update:own': ['*']
        }
    }
}

const roles = new AccessControl(roleObj);

module.exports = { roles }

