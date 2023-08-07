const mongoose = require('mongoose');

const dayScheduleSchema = new mongoose.Schema({
  name: { type: String },
  schedule_detail: { type: String }
});

const provinceSchema= new mongoose.Schema({
  code: {type: String, require : true, unique : true},
  name: {type: String}
});

const tourSchema = new mongoose.Schema({
  name: { type: String, required: true },
  code: { type: String, required: true, unique: true },
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
  slots: {type: Number},
  remainSlots: { type: Number, default: 0 },
  numOfDdays: { type: Number},
  promoDiscount: { type: Number, default: 0 },
  kidDiscount: { type: Number, default: 0.5 },
  babyDiscount: { type: Number, default: 0.7 },
  teenDiscount: { type: Number, default: 0.1 },
  cardImgUrl: { type: String },
  imgUrls: [{ type: String }],
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
