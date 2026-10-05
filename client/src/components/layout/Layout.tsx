import React from "react";
import Header from "./Header";
import Footer from "./Footer";
import CartDrawer from "../cart/CartDrawer";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="flex min-h-screen flex-col bg-slate-50/50 font-sans antialiased text-slate-800 selection:bg-rose-500 selection:text-white">
      <Header />
      <CartDrawer />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
};

export default Layout;
