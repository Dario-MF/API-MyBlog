const app = require('./app');
require('dotenv').config();
require('colors')
require('./database/configDB');



// Server
(async () => {
    try {
        await app.listen(app.get('port'));
        console.log(`Server up in port:  ${app.get('port')}`.green);
    } catch (error) {
        console.log('Server down'.red, error);
    };
})();
