import { Inter } from "next/font/google";
import { ThemeProvider } from "@/components/ui/ThemeProvider";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Toaster } from "sonner";
import "./globals.css";

const inter = Inter({ 
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata = {
  title: "WebDrop | Secure P2P File Transfer Across All Devices",
  description: "Transfer files instantly between phone and laptop using WebRTC. Private, encrypted, and cloud-free file sharing built for speed and simplicity.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning className={`${inter.variable}`}>
      {/* Set to Pure Black background */}
      <body className="bg-black text-[#F3F4F0] antialiased min-h-screen flex flex-col selection:bg-[#B19F91]/30 font-sans">
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false} disableTransitionOnChange>
          
          <Navbar />
          
          <main className="flex-grow pt-16 w-full flex flex-col"> 
            {children}
          </main>
          
          <Toaster 
            position="bottom-right" 
            theme="dark" 
            toastOptions={{
              className: "bg-[#48494B] border border-[#48494B]/50 text-[#F3F4F0] shadow-2xl rounded-xl"
            }}
          />

        </ThemeProvider>
      </body>
    </html>
  );
}