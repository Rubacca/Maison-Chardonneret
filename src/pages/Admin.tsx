import { useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import { AdminLogin } from "@/components/admin/AdminLogin";
import { AdminDashboard } from "@/components/admin/AdminDashboard";

const Admin = () => {
  const { session, isAdmin, loading, signIn, signOut } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <p className="text-muted-foreground">Laden...</p>
      </div>
    );
  }

  if (!session || !isAdmin) {
    return <AdminLogin signIn={signIn} isLoggedInButNotAdmin={!!session && !isAdmin} />;
  }

  return <AdminDashboard signOut={signOut} userEmail={session.user.email ?? ""} />;
};

export default Admin;
