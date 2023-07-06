const mongoose = require('mongoose');

const tourSchema = new mongoose.Schema({
    name: {type: String, require: true},
    code: { type: String, require: true, unique: true },
    start_place_code: { type: Number , require: true},
    end_place_code: {
        type: [{
          type: Number,
          required: true
        }],
        required: true
    },
    price: { type: Number, default: 0 },
    date: { type: Date },
    time: { type: String },
    remain_slots: { type: Number, default: 0 },
    num_of_days: { type: Number},
    promo_discount: {type: Number, default: 0 },
    kid_discount: { type: Number, default: 0.5 },
    baby_discount: { type: Number, default: 0.7 },
    teen_discount: { type: Number, default: 0.1 },
    card_img_url: { type: String },
    img_url: [{ type: String }],
    transport: { type: String },
    food: { type: String },
    hotel: { type: String },
    schedule: {
        type: [String],
        validate: {
            validator: function (value) {
                return value.length === this.num_of_days;
            },// bao nhiêu ngày đi (num_of_days) thì mảng có bấy nhiêu phần tử
            message: 'Schedule length must be equal to num_of_days',
        }
    },
    schedule_detail: {
        type: [String],
        validate: {
            validator: function (value) {
                return value.length === this.num_of_days;
            },// bao nhiêu ngày đi (num_of_days) thì mảng có bấy nhiêu phần tử
            message: 'Schedule length must be equal to num_of_days',
        }
    },  
    description: { type: String }
},
{
    collection: 'tours'
});
const Tour = mongoose.model('Tour', tourSchema);
module.exports = Tour;