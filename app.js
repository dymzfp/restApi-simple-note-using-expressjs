const express   = require('express');
const app       = express();

const cors     = require('cors');
// import body-parser
const bodyParser = require('body-parser');
// import router
const routes = require('./router/routes');
// import config-env
const env = require('./config/config-env');

const configCors = {
    origin: true,
    methods: ["GET", "POST", "PATCH", "DELETE"]
};

app.use(cors(configCors));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

routes(app);

app.listen(env.PORT || 3000);
console.log(`server runnig at port ${env.PORT}`);
