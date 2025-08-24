import mongoose from 'mongoose';
import shayariSchema from '../shayri/Shayri.js'
const userSchema = new mongoose.Schema({
    name: { type: String, required: true, trim: true },
  email: { 
    type: String, 
    required: true, 
    unique: true, 
    lowercase: true,
    trim: true,
    match: [/\S+@\S+\.\S+/, 'Invalid email format']
  },
  password: { type: String, required: true, minlength: 6 },
  bio: { type: String, maxlength: 250, default: "" },
  picture: { type: String, default: "default-profile.png" },
  age: { type: Number, min: 10, max: 100, default: 18 },
  phoneNumber: {
    type: String,
    match: [/^\+?\d{10,15}$/, 'Invalid phone number']
  },
  role: {
    type: String,
    enum: ['User', 'Editor', 'Admin', 'SuperAdmin'],
    default: 'User'
  },
  status: {
    type: String,
    enum: ['Active', 'Inactive', 'Banned'],
    default: 'Active'
  },
  gender: {
    type: String,
    enum: ['Male', 'Female', 'Other'],
    default: 'Other'
  },

  shayaris: [shayariSchema]
}, { timestamps: true });

export default mongoose.model("User", userSchema);
