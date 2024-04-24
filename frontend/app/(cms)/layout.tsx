"use client";

import React from "react";
import AuthProvider from "@/app/cms-authentication/AuthContext";

export default function CMSLayout({ children }: { children: React.ReactNode }) {
  return (
    <AuthProvider>
      <div>{children}</div>
    </AuthProvider>
  );
}
