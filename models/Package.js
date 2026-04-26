import mongoose from 'mongoose';

const CommentSchema = new mongoose.Schema({
  user: { type: String, required: true },
  text: { type: String, required: true },
  rating: { type: Number, required: true }
});

const MonthSchema = new mongoose.Schema({
  name: { type: String, required: true },
  dates: [{ type: String }]
});

const PackageSchema = new mongoose.Schema({
  id: { type: Number, required: true, unique: true },
  title: { type: String, required: true },
  location: { type: String, required: true },
  price: { type: Number, required: true },
  rating: { type: Number, required: true },
  image: { type: String, required: true },
  category: { type: String, required: true },
  details: {
    months: [MonthSchema],
    inclusions: [{ type: String }]
  },
  comments: [CommentSchema]
}, { timestamps: true });

export default mongoose.models.Package || mongoose.model('Package', PackageSchema);
