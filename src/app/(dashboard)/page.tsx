import { auth } from "@/auth";
import { protectServer } from "@/features/auth/utils";
import Banner from "./banner";
import Navbar from "./navbar";
import ProjectsSection from "./projects-section";

export default async function Home() {
  const session = await auth();
  await protectServer();

  return (
    <div className="flex flex-col w-full h-screen">
      <Navbar />
      <div className="bg-white flex-1 p-8 lg:rounded-tl-xl overflow-auto">
        <Banner />
        <ProjectsSection />
      </div>
    </div>
  );
}
