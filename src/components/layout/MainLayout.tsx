import { ReactNode } from "react";
import { Header } from "./Header";
import { LeftSidebar } from "./LeftSidebar";
import { RightSidebar } from "./RightSidebar";

interface MainLayoutProps {
  children: ReactNode;
}

export function MainLayout({ children }: MainLayoutProps) {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <div className="flex flex-1">
        <LeftSidebar />
        <main className="flex-1 bg-background overflow-auto">
          {children}
        </main>
        <RightSidebar />
      </div>
    </div>
  );
}
