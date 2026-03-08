import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

interface AdminLoginProps {
  signIn: (email: string, password: string) => Promise<any>;
  isLoggedInButNotAdmin: boolean;
}

export const AdminLogin = ({ signIn, isLoggedInButNotAdmin }: AdminLoginProps) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const { error } = await signIn(email, password);
    if (error) {
      toast.error("Login mislukt: " + error.message);
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4">
      <div className="w-full max-w-sm space-y-6">
        <div className="text-center">
          <h1 className="font-serif text-2xl text-foreground">Admin</h1>
          <p className="text-sm text-muted-foreground mt-1">Maison Chardonneret CMS</p>
        </div>

        {isLoggedInButNotAdmin ? (
          <div className="p-4 bg-destructive/10 border border-destructive/20 rounded-md text-sm text-destructive text-center">
            Je account heeft geen admin-rechten.
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">E-mail</Label>
              <Input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Wachtwoord</Label>
              <Input id="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
            </div>
            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? "Bezig..." : "Inloggen"}
            </Button>
          </form>
        )}
      </div>
    </div>
  );
};
