const express = require('express');
const app = express();
const cors = require('cors');
const logger = require('./utils/logger');
const config = require('./utils/config');
const blogsRouter = require('./controllers/blogs');

app.use(cors());
app.use(express.json()); //for the body property of the object

app.use('/api', blogsRouter)

app.listen(config.PORT, () => {
  logger.info(`Server running on port ${config.PORT}`);
});
