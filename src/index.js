require('dotenv').config();
require('colors');

// App init.
const app = require('./app');
// DB init.
require('./database/configDB');
// Roles init.
require('./libs/initRoles');
// Server init
(async () => {
    try {
        await app.listen(app.get('port'));
        console.log(`Server up in port:  ${app.get('port')}`.green);
    } catch (error) {
        console.log('Server down'.red, error);
    };
})();