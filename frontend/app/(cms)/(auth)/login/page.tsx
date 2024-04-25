"use client";

import { useAuth } from "@/app/cms-authentication/AuthContext";
import React, { useState } from "react";

export default function Login() {
  const { login } = useAuth();
  const [emailInput, setEmailInput] = useState("");
  const [passwordInput, setPasswordInput] = useState("");
  const [errorMessage, setErrorMessage] = useState(null);

  return (
    <form className="flex flex-col items-start gap-4">
      <label>
        <span className="form-label">Email</span>
        <input
          className="form-input"
          value={emailInput}
          onChange={(e) => setEmailInput(e.target.value)}
          type="text"
        />
      </label>

      <label>
        <span className="form-label">Password</span>
        <input
          className="form-input"
          value={passwordInput}
          onChange={(e) => setPasswordInput(e.target.value)}
          type="password"
        />
      </label>

      <button
        className="button"
        onClick={(e) => {
          e.preventDefault();

          setErrorMessage(login(emailInput, passwordInput)); // login returns undefined or error message
        }}
      >
        Login
      </button>
      {errorMessage && <p className="form-error">{errorMessage}</p>}
    </form>
  );
}
