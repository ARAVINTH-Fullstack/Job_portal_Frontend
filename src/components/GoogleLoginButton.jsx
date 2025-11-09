import React from "react";
import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";
import {jwtDecode} from "jwt-decode";
import axios from 'axios'
import {useNavigate} from 'react-router-dom'

const clientId = import.meta.env.VITE_GOOGLE_CLIENT_ID; // set in .env

export default function GoogleLoginButton() {

  const navigate = useNavigate()

  const handleSuccess = async (credentialResponse) => {
    // credentialResponse.credential is the ID token (JWT)
    const idToken = credentialResponse.credential;
    // Optional: decode to show name/picture locally
    const payload = jwtDecode(idToken); // {name, email, picture, sub, ...}

    // Send to backend for verification / user creation:
    const res = await axios.post("https://talentbridge-w9yv.onrender.com/api/auth/", {
        name:payload.name,
        email:payload.email,
        picture:payload.picture
      }, {
          headers: {
            "Content-Type": "application/json"
          },
        },);

    if (res.status === 200 && res.data.access) {

      // data might include your session cookie, JWT or user info
      localStorage.setItem("user", JSON.stringify(res.data.user));
      localStorage.setItem("candidate_access_token", res.data.access);
      localStorage.setItem("candidate_refresh_token", res.data.refresh);

      localStorage.setItem("current_user_type", "candidate");

      navigate('/home')
    }

  };

  const handleError = () => {
    console.error("Google Sign In failed");
  };

  return (
    <GoogleOAuthProvider clientId={clientId}>
      <GoogleLogin
        onSuccess={handleSuccess}
        onError={handleError}
        useOneTap // optional: enable One Tap
      />
    </GoogleOAuthProvider>
  );
}
