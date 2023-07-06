const mongoose = require('mongoose');

const tourCardSchema = new mongoose.Schema({
    name: { type: String },
    code: { type: String },
    start_place_code: { type: String },
    end_place_code: [{ type: String }],
    price: { type: Number },
    promo_discount: { type: Number },
    date: { type: Date },
    time: { type: String },
    remain_slots: { type: Number },
    num_of_days: { type: Number },
    card_img_url: { type: String }
},
{
    collection: 'tours'
}
);

const TourCard = mongoose.model('TourCard', tourCardSchema);
module.exports = TourCard;