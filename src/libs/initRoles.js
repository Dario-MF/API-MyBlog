const Role = require('../models/Role');

// Inicialización de los roles si no existen en DB.
(async () => {
    try {
        const count = await Role.estimatedDocumentCount();
        if (count > 0) {
            return;
        }
        const roles = await Promise.all([
            new Role({ name: 'ADMIN_ROLE' }).save(),
            new Role({ name: 'MODERATOR_ROLE' }).save(),
            new Role({ name: 'USER_ROLE' }).save()
        ]);
        console.log(`Initial roles created: ${roles}`.green);
    } catch (error) {
        console.log('Error:'.red, error);
    };
})();