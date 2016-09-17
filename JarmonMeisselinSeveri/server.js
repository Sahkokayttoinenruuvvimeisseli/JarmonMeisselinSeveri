import express from 'express';
import webpack from 'webpack';
import WebpackDevServer from 'webpack-dev-server';
import path from 'path';
import graphQLHTTP from 'express-graphql';
import {schema} from './data/schema';
var multer = require('multer')
var fileUpload = require('express-fileupload');

var storage = multer.diskStorage({
    destination: function (req, file, callback) {
        callback(null, './uploads');
    },
    filename: function (req, file, callback) {
        callback(null, file.fieldname + '-' + Date.now());
    }
});

var upload = multer({ storage: storage }).single('userPhoto');

const APP_PORT = 3000;
const GRAPHQL_PORT = 8080;

const graphQLServer = express();
graphQLServer.use('/api', graphQLHTTP({ schema, graphiql: true, pretty: true }));
//graphQLServer.listen(APP_PORT, () => console.log(
//    `GraphQL Server is now running on http://localhost:${APP_PORT}`
//));


const compiler = webpack({
    entry: path.resolve(__dirname, 'js', 'app.js'),
    module: {
        loaders: [
            {
                exclude: /node_modules/,
                loader: 'babel',
                test: /\.js$/,
            },
        ],
    },
    output: { filename: 'app.js', path: '/' },
    proxy: {
        '/upload/*': 'http://localhost:3001'
    }
});

const app = express();

app.use(fileUpload());

app.post("/", function (req, res, next) {
    var sampleFile;

    if (!req.files) {
        res.send('No files were uploaded.');
        return;
    }
    console.log(req.files);
    var userPhoto = req.files.userPhoto;
    userPhoto.mv("./uploads/" + userPhoto.name , function () {

    });

    res.send("file uploaded");
});

//app.get("/", function (req, res, next) {
//    res.send("Hello");
//});

app.listen(3001);

const webPackApp = new WebpackDevServer(compiler, {
    contentBase: '/public/',
    publicPath: '/js/'
});

webPackApp.use('/', express.static(path.resolve(__dirname, 'public')));

webPackApp.use("/api", graphQLHTTP({
    schema, graphiql: true, pretty: true
}));

webPackApp.use("/upload", app);




webPackApp.listen(APP_PORT, () => {
    console.log("server running");
});