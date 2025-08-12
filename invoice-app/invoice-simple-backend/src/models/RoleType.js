// require modules
const mongoose = require('mongoose')
const Schema = mongoose.Schema

// define schema for role model
const roleTypeSchema = new Schema({

    title: {
        type: String,
        required: true,
        maxlength: 50,
        unique: true,
    },
    status: {
        type: String,
        enum: ['locked', 'active', 'archived'],
        default: 'active',
        required: true,
    },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
})

roleTypeSchema.set('toJSON', { virtuals: true })
module.exports =
    mongoose.models.RoleType || mongoose.model('RoleType', roleTypeSchema, 'roleTypes')
