import React, { useContext, useState, useEffect } from "react";
import {
  AuthenticationDetails,
  CognitoUser,
  CognitoUserPool,
  CognitoUserSession,
  CognitoIdToken,
} from "amazon-cognito-identity-js";
import { redirect } from "next/navigation";
import { OPEN_CMS_ROUTES, ROUTES } from "@/app/consts";

type AuthContextValue = {
  currentUser: null | CognitoIdToken["payload"];
  login: any;
  logout: any;
};

// where to authenticate users from
const adminUserPool = new CognitoUserPool({
  ClientId: "7dv8g7lsl2ht3uv29q9npt0a84",
  UserPoolId: "us-east-1_1GuGm8wMs",
});

const AuthContext = React.createContext({
  currentUser: null,
  login: () => {},
} as AuthContextValue);

export function useAuth() {
  return useContext(AuthContext);
}

export default function AuthProvider({ children }: React.PropsWithChildren) {
  const [currentUserSession, setCurrentUserSession] = useState(
    null as AuthContextValue["currentUser"]
  );
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const currentUser = adminUserPool.getCurrentUser();

    if (!currentUser) return setLoading(false);

    currentUser.getSession(
      (error: Error | null, session: CognitoUserSession | null) => {
        error && console.log("Error in getting user session:", error);
        session && setCurrentUserSession(session.getIdToken().payload);
        setLoading(false);
      }
    );
  }, []);

  useEffect(() => {
    if (loading) return; // we don't know if user is logged in or not

    const currentRoute = window.location.pathname;

    if (!currentUserSession && !OPEN_CMS_ROUTES.includes(currentRoute))
      redirect(OPEN_CMS_ROUTES[0]);

    if (currentUserSession && OPEN_CMS_ROUTES.includes(currentRoute))
      redirect(ROUTES.REDIRECT_AFTER_LOGIN);
  }, [currentUserSession, loading]);

  // returns the error if there is one
  // if login successful, returns void but sets the current user
  async function login(email: string, password: string) {
    const user = new CognitoUser({
      Username: email,
      Pool: adminUserPool,
    });

    const authDetails = new AuthenticationDetails({
      Username: email,
      Password: password,
    });

    try {
      const result: CognitoUserSession = await new Promise(
        (resolve, reject) => {
          user.authenticateUser(authDetails, {
            onSuccess: resolve,
            onFailure: reject,
          });
        }
      );

      setCurrentUserSession(result.getIdToken().payload);
    } catch (error: any) {
      console.error("Login failed:", { error });
      return error.message;
    }
  }

  function logout() {
    adminUserPool.getCurrentUser()?.signOut();
    setCurrentUserSession(null);
  }

  // expose useful auth methods/values
  const authDetails = {
    currentUser: currentUserSession,
    login,
    logout,
  };

  return (
    <AuthContext.Provider value={authDetails}>
      {!loading && children}
    </AuthContext.Provider>
  );
}
