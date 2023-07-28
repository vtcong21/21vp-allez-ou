const mongoose = require('mongoose');

const dayScheduleSchema = new mongoose.Schema({
  name: { type: String },
  schedule_detail: { type: String }
});

const tourSchema = new mongoose.Schema({
  name: { type: String, required: true },
  code: { type: String, required: true, unique: true },
  start_place_code: { type: String, required: true },
  end_place_codes: {
    type: [{
      type: String,
      required: true
    }],
    required: true
  },
  price: { type: Number, default: 0 },
  date: { type: Date },
  time: { type: String },
  slots: {type: Number, default: 0},// số slot ban đầu
  remain_slots: { type: Number, default: 0 }, //số slot còn lại
  num_of_days: { type: Number },
  promo_discount: { type: Number, default: 0 },
  kid_discount: { type: Number, default: 0.5 },
  baby_discount: { type: Number, default: 0.7 },
  teen_discount: { type: Number, default: 0.1 },
  card_img_url: { type: String },
  img_url: [{ type: String }],
  transport: { type: String },
  food: { type: String },
  hotel: { type: String },
  schedules: {
    type: [dayScheduleSchema],
    validate: {
      validator: function (value) {
        return value.length === this.num_of_days;
      },
      message: 'Schedule length must be equal to num_of_days',
    }
  },
  isHidden: { type: Boolean, default: false }
},
{
  collection: 'tours'
});

const Tour = mongoose.model('Tour', tourSchema);
module.exports = Tour;
