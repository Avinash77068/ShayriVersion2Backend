import User from "../../models/user/User.js";

// CREATE USER with validation
export const createUser = async (req, res) => {
  try {
    const { name, email, password, age, phoneNumber, role, status, gender } = req.body;

    // Basic validation before creating
    if (!name || !email || !password) {
      return res.status(400).json({ error: "Name, email, and password are required" });
    }
    if (password.length < 6) {
      return res.status(400).json({ error: "Password must be at least 6 characters" });
    }
    if (age && (age < 10 || age > 100)) {
      return res.status(400).json({ error: "Age must be between 10 and 100" });
    }
    const roleEnum = ['User', 'Editor', 'Admin', 'SuperAdmin'];
    if (role && !roleEnum.includes(role)) {
      return res.status(400).json({ error: `Role must be one of ${roleEnum.join(", ")}` });
    }
    const statusEnum = ['Active', 'Inactive', 'Banned'];
    if (status && !statusEnum.includes(status)) {
      return res.status(400).json({ error: `Status must be one of ${statusEnum.join(", ")}` });
    }
    const genderEnum = ['Male', 'Female', 'Other'];
    if (gender && !genderEnum.includes(gender)) {
      return res.status(400).json({ error: `Gender must be one of ${genderEnum.join(", ")}` });
    }
    // Phone number format regex
    if (phoneNumber && !/^\+?\d{10,15}$/.test(phoneNumber)) {
      return res.status(400).json({ error: "Invalid phone number format" });
    }

    const user = await User.create(req.body);
    console.log(user, "User created successfully");
    res.status(201).json({ message: "User created", user });
  } catch (err) {
    if (err.code === 11000) {
      const field = Object.keys(err.keyValue)[0];
      return res.status(400).json({
        error: `Duplicate value for '${field}': '${err.keyValue[field]}'`
      });
    }
    res.status(500).json({ error: err.message });
  }
};

// GET ALL USERS
export const getUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// UPDATE USER with validation and conditional fields
export const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = req.body;

    // Validate fields if present
    if (updateData.password && updateData.password.length < 6) {
      return res.status(400).json({ error: "Password must be at least 6 characters" });
    }
    if (updateData.age && (updateData.age < 10 || updateData.age > 100)) {
      return res.status(400).json({ error: "Age must be between 10 and 100" });
    }
    const roleEnum = ['User', 'Editor', 'Admin', 'SuperAdmin'];
    if (updateData.role && !roleEnum.includes(updateData.role)) {
      return res.status(400).json({ error: `Role must be one of ${roleEnum.join(", ")}` });
    }
    const statusEnum = ['Active', 'Inactive', 'Banned'];
    if (updateData.status && !statusEnum.includes(updateData.status)) {
      return res.status(400).json({ error: `Status must be one of ${statusEnum.join(", ")}` });
    }
    const genderEnum = ['Male', 'Female', 'Other'];
    if (updateData.gender && !genderEnum.includes(updateData.gender)) {
      return res.status(400).json({ error: `Gender must be one of ${genderEnum.join(", ")}` });
    }
    if (updateData.phoneNumber && !/^\+?\d{10,15}$/.test(updateData.phoneNumber)) {
      return res.status(400).json({ error: "Invalid phone number format" });
    }

    const updated = await User.findByIdAndUpdate(id, updateData, { new: true, runValidators: true });
    if (!updated) return res.status(404).json({ message: "User not found" });
    res.json({ message: "User updated", updated });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// DELETE USER by ID
export const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await User.findByIdAndDelete(id);
    if (!deleted) return res.status(404).json({ message: "User not found" });
    res.json({ message: "User deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// DELETE ALL USERS
export const deleteAllUsers = async (req, res) => {
  try {
    const result = await User.deleteMany({});
    res.status(200).json({ message: `Deleted ${result.deletedCount} users` });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
export const loginUser=async(req,res)=>{
  const {email,password}=req.body;
  try{
    const user=await User.findOne({email:email});
    if(!user){
      return res.status(404).json({ message: "User not found" });
    }
    if(user.password!==password){
      return res.status(404).json({message:"Invalid Password"});
    }

    res.json({ message: "Login Success", user: user,status:200 });
  }catch(err){
    res.json({message:"Error",err:err.message,st});
  }


}
