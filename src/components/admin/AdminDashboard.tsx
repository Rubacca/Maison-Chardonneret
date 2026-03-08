import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { LogOut, ExternalLink } from "lucide-react";
import { ContentEditor } from "./ContentEditor";
import { ImageEditor } from "./ImageEditor";
import { ReviewEditor } from "./ReviewEditor";

interface AdminDashboardProps {
  signOut: () => Promise<any>;
  userEmail: string;
}

export const AdminDashboard = ({ signOut, userEmail }: AdminDashboardProps) => {
  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border px-4 sm:px-6 py-4 flex items-center justify-between">
        <div>
          <h1 className="font-serif text-xl text-foreground">CMS Admin</h1>
          <p className="text-xs text-muted-foreground">{userEmail}</p>
        </div>
        <div className="flex items-center gap-2">
          <a href="/" target="_blank" rel="noopener noreferrer">
            <Button variant="outline" size="sm">
              <ExternalLink className="w-4 h-4 mr-1" /> Preview
            </Button>
          </a>
          <Button variant="ghost" size="sm" onClick={() => signOut()}>
            <LogOut className="w-4 h-4 mr-1" /> Uitloggen
          </Button>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-4 sm:px-6 py-8">
        <Tabs defaultValue="content">
          <TabsList className="mb-6">
            <TabsTrigger value="content">Teksten</TabsTrigger>
            <TabsTrigger value="images">Afbeeldingen</TabsTrigger>
            <TabsTrigger value="reviews">Reviews</TabsTrigger>
          </TabsList>

          <TabsContent value="content">
            <ContentEditor />
          </TabsContent>
          <TabsContent value="images">
            <ImageEditor />
          </TabsContent>
          <TabsContent value="reviews">
            <ReviewEditor />
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};
