'use strict'

import mongoose from 'mongoose'

var Schema = mongoose.Schema;

var experimentSchema = Schema({
    name      : String,
    species   : Object,
    mutations : Object,
    foodweb   : Object
});

export default mongoose.model('Experiment',experimentSchema);