// Importing necessary modules and functions
import { v4 as uuidv4 } from 'uuid';
import { StableBTreeMap, ic, Record, nat64, Canister, update, text, Result, Ok, Err, query, Vec } from 'azle';

// Defining the User and Post record structures
const User = Record({
    id: text, // User ID
    username: text, // User's username
    password: text, // User's password
    createdAt: nat64
});

const Post = Record({
    id: text, // Post ID
    userId: text, // User ID of the post creator
    title: text, // Post title
    content: text, // Post content
    createdAt: nat64 // Timestamp of post creation
});

// Initializing storage for users, posts, and login data
const usersStorage = StableBTreeMap(0, text, User); // Storage for user data
const postsStorage = StableBTreeMap(1, text, Post); // Storage for post data
const loginData = StableBTreeMap(2, text, User); // Storage for login data

// Exporting the Canister with various functions
export default Canister({

    // Function to register a new user
    register: update([text, text], Result(text, text), (username, password) => {
        if (!username || !password) {
            return Err("Username and Password are required");
        }

        if (password.length < 8) {
            return Err("Password must be at least 8 characters long");
        }

        if (!/[!@#$%^&*()_+[\]{};':"\\|,.<>/?]/.test(password)) {
            return Err("Password must contain at least one symbol");
        }

        if (Object.values(usersStorage.values()).some(u => u.username === username)) {
            console.log(usersStorage.values());
            return Err("Username already exists");
        }

        const register = {
            id: uuidv4(),
            username,
            password,
            createdAt: ic.time()
        };
        usersStorage.insert(register.id, register);
        return Ok(`UserID: "${register.id}" created successfully.`);
    }),

    // Function to login a user
    login: update([text, text], Result(text, text), (username, password) => {
        if (!username || !password) {
            return Err("Username and Password are required");
        }

        const user = Object.values(usersStorage.values()).find(u => u.username === username && u.password === password);

        if (user) {
            loginData.insert(user.id, user);
            return Ok(`Username: "${user.username}" Login successful`);
        }
        else {
            return Err("User does not exist");
        }
    }),

    // Function to create a new post
    createPost: update([text, text, text], Result(text, text), (title, content, username) => {
        const user = Object.values(loginData.values()).find(u => u.username === username);

        if (loginData.values().length === 0) {
            return Err("Login first to post");
        }

        if (!user) {
            return Err("Use your logged-in username");
        }

        const createPost = {
            id: uuidv4(),
            userId: user.id,
            title,
            content,
            createdAt: ic.time()
        };
        postsStorage.insert(createPost.id, createPost);
        return Ok(`${createPost.title} post has been created`);
    }),

    // Function to retrieve all posts
    getPosts: query([], Result(Vec(Post), text), () => {
        const posts = postsStorage.values();
        return Ok(posts);
    }),

    // Function to retrieve posts by ID
    getPostsById: query([text], Result(Post, text), (postId) => {
        const posts = postsStorage.get(postId);
        if ('None' in posts) {
            return Err('Posts not found');
        }
        return Ok(posts.Some);
    }),

    // Function to retrieve posts by UserID
    getPostsByUserId: query([text], Result(Vec(Post), text), (userId) => {
        const posts = postsStorage.values().filter(p => p.userId === userId);
        if(posts.length === 0){
            return Err("Posts not found");
        }
        return Ok(posts);
    }),

    // Function to delete a post by its ID
    deletePostById: update([text], Result(text, text), (postId) => {
        const post = postsStorage.get(postId);
        if ('None' in post) {
            return Err('Post not found');
        }
        postsStorage.remove(postId);
        return Ok(`Post Removed Successfully`);
    }),

    // Function to logout a user
    logout: update([text], Result(text, text) , (userId) => {
        const user = loginData.get(userId);
        if ("None" in user) {
            return Err("User not logged in");
        }
        loginData.remove(userId);
        return Ok(`Logged out Successfully`);
    })

});