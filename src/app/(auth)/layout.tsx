// import bg from "../../../public/bg.jpg";

interface AuthLayoutProps {
  children: React.ReactNode;
}
const LayoutAuth = ({ children }: AuthLayoutProps) => {
  return (
    <div className="relative h-screen w-screen bg-[url(/bg.jpg)] bg-cover">
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0.8),rgba(0,0,0,.4),rgba(0,0,0,.8))]"></div>
      <div className="absolute inset-0 flex items-center justify-center">
        {children}
      </div>
    </div>
  );
};

export default LayoutAuth;
