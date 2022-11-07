'use strict'

import mongoose from 'mongoose'

var Schema = mongoose.Schema;

var ecosystemSchema = Schema({
    initialVariables : Object,
    populationGrowth : Object,
    averageAttributeChange : Object
});

export default mongoose.model('Ecosystem',ecosystemSchema);