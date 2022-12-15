'use strict'

import mongoose from 'mongoose'

var Schema = mongoose.Schema;

var resultSchema = Schema({
    experimentID : String,
    results      : Object,
    date         : Date    
});

export default mongoose.model('Result',resultSchema);