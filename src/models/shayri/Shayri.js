import mongoose from "mongoose";

const shayariSchema = new mongoose.Schema({
  text: { type: String, required: true },
    title:{type: String, required: true },
    href: { type: String, required: true},
    picture: { type: String, default: "default-profile.png" },
  createdAt: { type: Date, default: Date.now }
});

export default shayariSchema; 
// यहाँ हम model नहीं बना रहे, सिर्फ schema export कर रहे हैं
