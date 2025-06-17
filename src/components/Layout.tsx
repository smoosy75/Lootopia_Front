import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { AppSidebar } from "@/components/app-sidebar";
import { SidebarProvider } from "@/components/ui/sidebar";
import { TooltipProvider } from "@/components/ui/tooltip";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <TooltipProvider>
      <SidebarProvider>
        <div className="flex min-h-screen bg-[#283541]">
          <AppSidebar />
          <div className="flex-1 flex flex-col">
            <Header />
            <main className="flex-1">{children}</main>
            <Footer />
          </div>
        </div>
      </SidebarProvider>
    </TooltipProvider>
  );
}
