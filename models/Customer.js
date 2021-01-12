const mongoose = require('mongoose');
const Joi = require('joi');




const Customer = mongoose.model('Customer', mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlenght: 5,
        maxlenght: 20
    },
    phone: {
        type: String,
        required: true,
        // match:/^/
    },
    isGold: Boolean,
    default: false

}));

function validateCustomer(customer) {
    const schema = {
        name: Joi.string().min(5).required(),
        phone: Joi.string().min(5).required(),
        isGold: Joi.boolean(),
    }
    return Joi.validate(customer, schema);
}

exports.Customer = Customer;
exports.validateCustomer = validateCustomer;