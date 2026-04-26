import mongoose from 'mongoose';

const StaySchema = new mongoose.Schema({
  id: { type: Number, required: true, unique: true },
  title: { type: String, required: true },
  location: { type: String, required: true },
  price: { type: Number, required: true },
  rating: { type: Number, required: true },
  image: { type: String, required: true },
  category: { type: String, required: true },
  description: { type: String, required: true }
}, { timestamps: true });

export default mongoose.models.Stay || mongoose.model('Stay', StaySchema);
