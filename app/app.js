
'use strict'

/* --- Modules --- */

import CONFIG from './config.js';
import express from 'express';
import {join, dirname} from 'path';
import { fileURLToPath } from 'url';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
//routes

import pageRoutes from './routes/pages.js';
import apiRoutes  from './routes/api.js';

/* --- Middlewares --- */

const app = express();
const __dirname = dirname(fileURLToPath(import.meta.url));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended : true}));

//views

app.set('views',join(__dirname,'views'));
app.set('view engine','ejstrings');

// routes

app.use(pageRoutes);
app.use('/api',apiRoutes);


// public

app.use(express.static(join(__dirname,'public')));

/* --- Server & DataBase connection --- */

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/evolutionsimjs').then(() => {
    app.listen(CONFIG.port, () => {
        console.log('The server is listening on port', CONFIG.port);
    }); 
});