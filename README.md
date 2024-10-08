# React Google Authenticator App

This is a simple React application that provides user registration and login functionality with integration to Google Authenticator. The app interacts with a backend API for registration and login, displaying QR codes for the Google Authenticator setup, and validating user login with a username and authenticator code.

## Features

- **User Registration:** Users can register by entering a username. If the username is already registered, the app notifies the user. Otherwise, a QR code is generated for the Google Authenticator setup.
- **User Login:** Registered users can log in by entering their username and the authenticator code generated by Google Authenticator.
- **Toast Notifications:** The app uses `react-hot-toast` to display success and error messages to the user during the registration and login processes.

## Tech Stack

- **Frontend:** React
- **Styling:** Tailwind CSS
- **Notifications:** react-hot-toast
- **Backend:** https://react-authentication-backend.vercel.app  OR https://github.com/EmrD/react-google-authenticator.git

## Setup and Installation

1. **Clone the repository:**
   ```bash
   git clone <URL>
   cd <PROJECT_PATH>
2.**Install:**
```sh
npm install
npm run dev
```
3.**Usage:**
- **Enter your username**
- **Scan your auth QR**
- **Switch the tab and enter the auth code**
