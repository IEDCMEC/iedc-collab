# Collab

Collab is a platform where students can collaborate on projects, share their work, and connect with other students. It is built using React and Firebase.

## Features

- **User Authentication**: Students can sign in to Collab using their Google accounts, providing a seamless and secure login experience.

- **Profile Creation**: Once logged in, students can create their profiles, add their information, and customize their profile picture.

- **Project Listing**: Students can showcase their projects in the Projects section. They can provide project details, such as the project name, description, technologies used, and links to project repositories or websites.

- **Collaboration**: Students can invite others to join their projects or accept invitations to collaborate on existing projects. This promotes teamwork and allows students to contribute to various projects within the Collab community.

- **E-mail based notifications**: Invites and updates can be recived via e-mail using nodemailer library.

## Tech Stack

- React: A JavaScript library for building user interfaces, used to create the frontend of Collab.

- Firebase: A comprehensive development platform provided by Google, used for backend services such as user authentication, database management, and storage.

- Material UI: UI framework based on Material Design

## Installation and Setup

To run Collab locally on your machine, follow these steps:

1. Fork and Clone the repository:

```bash
 git clone https://github.com/your-username/iedc-collab.git
```

2. Install the dependencies:

```bash
cd iedc-collab
npm install
```

3. Configure Firebase Credentials by adding to .env file values similar to:
```
REACT_APP_FB_API_KEY=XXXXxxxx
REACT_APP_AUTH_DOMAIN=xxxxXXXX.firebaseapp.com
REACT_APP_DATABASE_URL=https://xxxXXXX.firebaseio.com
REACT_APP_PROJECT_ID=xxxxXXXX
REACT_APP_STORAGE_BUCKET=xxxxXXXX.appspot.com
REACT_APP_MESSAGING_SENDER_ID=xxxxXXXX
```

4. Start the development server:
```bash
    npm start
```

5. Open your browser and navigate to http://localhost:3000

## Contributing

Contributions are welcome! If you have any ideas, suggestions, or bug reports, please feel free to open an issue or submit a pull request. Let's make Collab even better together✨.
License
