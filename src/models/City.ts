import mongoose, { Document, Schema } from 'mongoose';
import LANGUAGES from '../types/languages';

interface City extends Document {
  name: string;
  region: string;
  country: boolean;
  language: LANGUAGES;
}

const CitySchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  region: {
    type: String,
    required: true,
  },
  country: {
    type: Boolean,
    required: true,
  },
  language: {
    type: String,
    enum: Object.values(LANGUAGES),
    required: true,
  },
});

const cityModel = mongoose.model<City>('City', CitySchema);
export default cityModel;
