const mongoose = require('mongoose');

const provinceSchema = new mongoose.Schema({
    code: { type: String, require: true},
    name: { type: String }
});

const tourCardSchema = new mongoose.Schema({
    name: { type: String, require: true },
    code: { type: String, require: true, unique: true },
    startPlace: { type: provinceSchema, required: true },
    endPlaces: {
        type: [{
            type: provinceSchema,
            required: true
        }],
        required: true
    },
    price: { type: Number, default: 0 },
    date: { type: Date },
    time: { type: String },
    remainSlots: { type: Number, default: 0 },
    numOfDays: { type: Number },
    promoDiscount: { type: Number, default: 0 },
    cardImgUrl: { type: String }
},
    {
        collection: 'tours'
    }
);

const TourCard = mongoose.model('TourCard', tourCardSchema);
module.exports = TourCard;