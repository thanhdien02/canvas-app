import UserButton from "@/features/auth/components/user-button";

const Navbar = () => {
 
  return (
    <div className="h-[68px] shrink-0 w-full bg-muted flex items-center px-10">
      <div className="ml-auto cursor-pointer">
        <UserButton />
      </div>
    </div>
  );
};

export default Navbar;
