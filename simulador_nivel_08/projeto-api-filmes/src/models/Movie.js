import mongoose from 'mongoose';

const MovieSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },
  year: { type: Number },
  genres: [String],
  image: { type: String },
  video: { type: String }
});

export default mongoose.model('Movie', MovieSchema);