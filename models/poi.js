import mongoose from "mongoose";

const poiSchema = new mongoose.Schema({
    id: Number,
    name: {
      type: String,
      required: [true, 'Name required'],
    },
    latlng: {
      type: [Number],
      required: [true, 'Coordinates required'],
    },
    description: {
      type: String,
      required: [true, "Description required"]
    },
    link: {
      type: String,
      required: [true, "Link required"]
    }
  });
  
const Poi = mongoose.model('Poi', poiSchema);

export default Poi