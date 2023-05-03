const db = require('./models');

db.sequelize.sync({ force: false, alter: true })
  .then(() => {
    console.log('Models synced successfully');
  })
  .catch((error) => {
    console.error('Unable to sync models:', error);
  });
