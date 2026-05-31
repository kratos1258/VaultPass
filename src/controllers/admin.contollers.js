const User = require("../models/user.models");




const deleteUser = async (req, res) => {
    const { id } = req.params;
    try {
        await User.findByIdAndDelete(id);
        return res.status(200).json({ message: "user deleted successfully"});
    } catch (error) {
        console.error("Error deleting user", error);
        return res.status(500).json({ message: "Internal server error"})
        
    }
};

/* const getUsers = async (req, res) => {
    try {
        const users = await User.find().select("-password");
        return res.status(200).json({ users });
        
    } catch (error) {
        console.log(error);
        return res.status(500).json({message: "Internal server error"});
        
        
    }
}; */

module.exports = {
    deleteUser,
    getUsers
}