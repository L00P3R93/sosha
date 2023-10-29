import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    mode: "light",
    user: null,
    token: null,
    posts: [],
};

export const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        /**
         * Toggles the mode of the state between "light" and "dark".
         *
         * @param {object} state - The current state object.
         */
        setMode: (state) => {
            state.mode = state.mode === "light" ? "dark" : "light";
        },
        /**
         * Sets the login state with the provided user and token.
         *
         * @param {object} state - The current state object.
         * @param {object} action - The action object containing the payload.
         * @param {object} action.payload - The payload object containing the user and token.
         * @param {object} action.payload.user - The user object.
         * @param {string} action.payload.token - The token string.
         */
        setLogin: (state, action) => {
            state.user = action.payload.user;
            state.token = action.payload.token;
        },
        /**
         * Sets the user and token to null, effectively logging the user out.
         *
         * @param {object} state - The state object.
         */
        setLogout: (state) => {
            state.user = null;
            state.token = null;
        },
        /**
         * Sets the friends of the user in the state.
         *
         * @param {object} state - The current state.
         * @param {object} action - The action object.
         */
        setFriends: (state, action) => {
            if (state.user) {
                state.user.friends = action.payload.friends;
            } else {
                console.error("user friends non-existent :(");
            }
        },
        /**
         * Sets the posts in the state.
         *
         * @param {object} state - The current state.
         * @param {object} action - The action object.
         * @param {array} action.payload.posts - The posts to be set in the state.
         */
        setPosts: (state, action) => {
            state.posts = action.payload.posts;
        },
        setPost: (state, action) => {
            const updatedPosts = state.posts.map((post) => {
                if(post._id === action.payload.post._id) return action.payload.post;
                return post;
            });
            state.posts = updatedPosts
        }
    }
})

export const { setMode, setLogin, setLogout, setFriends, setPosts, setPost } = authSlice.actions;

export default authSlice.reducer;