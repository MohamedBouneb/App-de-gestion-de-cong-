const mongoose = require('mongoose');

const congeSchema = new mongoose.Schema({
    startDate: { type: String, required: true },
    endDate: { type: String, required: true },
    type: { type: String, required: true },
    status: { type: String, required: true, enum: ['En attente', 'Approuvé', 'Refusé'] },
    desc: { type: String }, 
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
});

const Conge = mongoose.model('Conge', congeSchema);

module.exports = Conge;
