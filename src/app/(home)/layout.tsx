"use client";

interface Props {
  children: React.ReactNode;
}

const Layout = ({ children }: Props) => {
  return (
    <main className="flex flex-col min-h-screen max-h-full relative">
      {/* Background Video */}
      <video
        className="absolute inset-0 -z-10 h-full w-full object-cover"
        autoPlay loop muted playsInline
      >
        <source src="/background.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {/* Page Content */}
      <div className="flex-1 flex flex-col px-4 pb-4 relative z-10">
        {children}
      </div>
    </main>
  );
};

export default Layout;
