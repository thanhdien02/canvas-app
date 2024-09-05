import { auth } from "@/auth";
import { protectServer } from "@/features/auth/utils";
import Banner from "./banner";
import Navbar from "./navbar";
import ProjectsSection from "./projects-section";

export default async function Home() {
  const session = await auth();
  await protectServer();

  return (
    <div className="flex flex-col w-full h-full">
      <Navbar />
      <div className="bg-white h-full p-8 lg:rounded-tl-xl">
        <Banner />
        <ProjectsSection />
      </div>
    </div>
  );
}
