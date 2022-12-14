'use strict'

import mongoose from 'mongoose'

var Schema = mongoose.Schema;

var experimentSchema = Schema({
    species   : Object,
    mutations : Object,
    foodweb   : Object
});

export default mongoose.model('Ecosystem',experimentSchema);