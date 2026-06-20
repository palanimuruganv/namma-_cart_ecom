import React from "react";

const Footer = () => (
  <footer className="bg-gradient-to-r from-slate-900 via-purple-900 to-slate-900 text-slate-200 mt-16 border-t-2 border-gradient-primary">
    <div className="max-w-6xl mx-auto px-4 py-8 text-sm flex flex-col sm:flex-row justify-between gap-2">
      <p>© {new Date().getFullYear()} Namma Cart Built with the MERN stack.</p>
      
    </div>
  </footer>
);

export default Footer;
