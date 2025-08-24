import User from "../../models/user/User.js";

// GET latest 10 shayaris from all users
export const getUserShayari = async (req, res) => {
  try {
    const users = await User.find();

    // सभी users की सारी shayaris collect
    let allShayaris = [];
    users.forEach(user => {
      if (Array.isArray(user.shayaris)) {
        user.shayaris.forEach(shayari => {
          if (shayari.title && shayari.text && shayari.href) {
            allShayaris.push({
              title: shayari.title,
              text: shayari.text,
              href: shayari.href,
              picture: shayari.picture,   // <-- added here
              createdAt: shayari.createdAt,
              user: {
                name: user.name,
                email: user.email
              }
            });
          }
        });
      }
    });

    // latest 10 shayaris by createdAt
    allShayaris = allShayaris.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)).slice(0, 10);

    res.status(200).json(allShayaris);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// ADD a new shayari or create user if not exists
export const addShayari = async (req, res) => {
  try {
    const { name, email, shayari } = req.body;

    // Destructure required fields from shayari
    const { title, text, href, picture } = shayari || {};

    // Validate all required fields
    if (!name || !email || !title || !text || !href) {
      return res.status(400).json({ error: "Name, email, title, text, and href are required" });
    }

    let user = await User.findOne({ email });

    if (!user) {
      // Create new user with first shayari
      user = await User.create({
        name,
        email,
        shayaris: [{ title, text, href, picture }]
      });
      return res.status(201).json({ message: "User and shayari created", user });
    }

    // *** Check if the shayari with same title and text already exists ***
    const duplicate = user.shayaris.some(s => s.title === title && s.text === text);
    if (duplicate) {
      return res.status(400).json({ error: "Duplicate shayari title and text not allowed" });
    }

    // Append new shayari to existing user
    user.shayaris.push({ title, text, href, picture });
    await user.save();

    res.status(200).json({ message: "Shayari added to existing user", user });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// DELETE a shayari by email and shayariId
export const deleteShayari = async (req, res) => {
  try {
    const { email, shayariId } = req.params;

    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ error: "User not found" });

    user.shayaris = user.shayaris.filter(s => s._id.toString() !== shayariId);

    await user.save();
    res.status(200).json({ message: "Shayari deleted", user });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// DELETE ALL shayaris from all users
export const deleteAllShayaris = async (req, res) => {
  try {
    await User.updateMany({}, { $set: { shayaris: [] } });
    res.status(200).json({ message: "All shayaris deleted from all users" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// GET all shayaris of a specific user by email
export const getUserShayaris = async (req, res) => {
  try {
    const { email } = req.params;
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ error: "User not found" });

    res.status(200).json(user.shayaris);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
