# User and Post Management Canister

## Description
The User and Post Management Canister module provides essential functionality for managing users, posts, and login data within your application. It includes a comprehensive set of functions for user registration, login, post creation, retrieval, and deletion, as well as user logout, enabling seamless management of user-related activities.

## Installation
To integrate this Canister module into your project, follow these steps:

1. Clone the repository:
   ```bash
   git clone https://github.com/kerneloverload/ICP-azle-ts-SocialMedia

2. Install dependencies:
    ```bash
   npm install
     ```
3. Install DFX:
   - For Mac:
     - Install Homebrew:
       ```bash
       /bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
       xcode-select --install
       ```
     - Install Podman:
       ```bash
       brew install podman
       ```
   - For Linux:
     - Install DFX:
       ```bash
       DFX_VERSION=0.16.1 sh -ci "$(curl -fsSL https://sdk.dfinity.org/install.sh)"
       echo 'export PATH="$PATH:$HOME/bin"' >> "$HOME/.bashrc"
       dfx --version
       ```
     - Install Podman:
       ```bash
       sudo apt-get install podman
       ```
4. Starting the Local Internet Computer:
     ```bash
     dfx start --host 127.0.0.1:8000
     ```
5. Deploying the Canister on Localhost:
   ```bash
   dfx deploy
     ```
## Usage
### User Registration
To register a new user, call the `register` function with the username and password as arguments.

### User Login
To log in a user, call the `login` function with the username and password as arguments.

### Post Creation
To create a new post, call the `createPost` function with the title, content, and username of the post creator as arguments.

### Post Retrieval
- To retrieve all posts, call the `getPosts` function.
- To retrieve a post by its ID, call the `getPostsById` function with the post ID as an argument.
- To retrieve posts by a specific user ID, call the `getPostsByUserId` function with the user ID as an argument.

### Post Deletion
To delete a post by its ID, call the `deletePostById` function with the post ID as an argument.

### User Logout
To logout a user, call the `logout` function with the user ID as an argument.

## Contributing
If you would like to contribute to this Canister module, please open an issue or submit a pull request.
