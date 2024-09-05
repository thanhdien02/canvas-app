"use client";
import { Button } from "@/components/ui/button";
import { useCreateProject } from "@/features/projects/api/use-create-project";
import { ArrowRight, Sparkles } from "lucide-react";

const Banner = () => {
  const mutation = useCreateProject();
  const onCreateProject = () => {
    mutation.mutate({
      name: "Untitled project",
      height: 1200,
      width: 900,
      json: "",
    });
  };
  return (
    <div className="flex items-center gap-x-6 bg-gradient-to-r from-blue-600 to-blue-400 h-[250px] w-full rounded-xl px-8">
      <div className="lg:block hidden relative size-28 bg-white/50 rounded-full">
        <div className="absolute flex items-center justify-center size-20 bg-white top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full">
          <Sparkles className="size-6 fill-blue-500 text-blue-500" />
        </div>
      </div>

      <div className="flex flex-col gap-y-3 text-white">
        <h2 className="font-bold lg:text-3xl text-xl">
          Visualize your ideas with Image AI
        </h2>
        <p className="text-sm lg:mt-1">
          Turn inspiration into design in no time. Simply upload an image and
          let AI do the rest.
        </p>
        <Button
          className="flex items-center gap-x-2 w-[160px]"
          variant="secondary"
          onClick={onCreateProject}
        >
          Start creating
          <ArrowRight className="size-4 text-black" />
        </Button>
      </div>
    </div>
  );
};

export default Banner;
