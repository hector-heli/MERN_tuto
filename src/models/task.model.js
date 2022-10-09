const mongoose = require('mongoose');
const {Schema} = mongoose;

const TaskSchema = new Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        trim: true
    }, 
    done: {
        type: Boolean,
        default: false
    }
}, {
    versionKey: false,
    timestamps: true
});


module.exports = mongoose.model('Task', TaskSchema);
    
