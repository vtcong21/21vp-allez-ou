const mongoose = require('mongoose');

const tourCardSchema = new mongoose.Schema({
    name: {type: String, require: true},
    code: { type: String, require: true, unique: true },
    start_place_code: { type: String , require: true},
    end_place_code: {
        type: [{
          type: String,
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
    card_img_url: { type: String }
},
{
    collection: 'tours'
}
);

const TourCard = mongoose.model('TourCard', tourCardSchema);
module.exports = TourCard;