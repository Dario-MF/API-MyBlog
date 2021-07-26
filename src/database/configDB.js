const mongoose = require('mongoose');


(async () => {
    try {
        const db = await mongoose.connect(process.env.MONGO_LOCAL, {
            useNewUrlParser: true,
            useCreateIndex: true,
            useUnifiedTopology: true,
            useFindAndModify: false
        });
        console.log(`DB connected to: ${db.connection.name}`.green);
    } catch (error) {
        console.log(`Error en DB: ${error}`.red);
    };
})();