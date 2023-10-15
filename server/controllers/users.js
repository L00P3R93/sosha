import User from "../models/user.js";

/**READ */
const getUser = async (req, res) => {
    try {
        const {id} = req.params;
        const user = User.findById(id);
        if(!user) return res.status(404).json({ message: "User not found" });
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const getUserFriends = async (req, res) => {
    try {
        const {id} = req.params;
        const user = await User.findById(id);
        if(!user) return res.status(404).json({ message: "User not found" });
        
        const friends = await Promise.all(
            user.friends.map((id) => User.findById(id))
        )

        const formattedFriends = friends.map(
            ({ _id, firstName, lastName, occupation, location, picturePath }) => {
                return { _id, firstName, lastName, occupation, location, picturePath };
            }
        );

        return res.status(200).json(formattedFriends);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

/**UPDATE */
const addRemoveFriend = async (req, res) => {
    try {
        const { id, friendId } = req.params;
        const user = await User.findById(id);
        if(!user) return res.status(404).json({ message: "User not found" });
        const friend = await User.findById(friendId);

        if(user.friends.includes(friendId)) {
            user.friends = user.friends.filter((id) => id !== friendId);
            friend.friends = friend.friends.filter((id) => id !== id);
        }else{
            user.friends.push(friendId);
            friend.friends.push(id);
        }

        await user.save();
        await friend.save();

        const friends = await Promise.all(
            user.friends.map((id) => User.findById(id))
        )

        const formattedFriends = friends.map(
            ({ _id, firstName, lastName, occupation, location, picturePath }) => {
                return { _id, firstName, lastName, occupation, location, picturePath };
            }
        );

        res.status(200).json(formattedFriends);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

export { getUser, getUserFriends, addRemoveFriend };