"use client";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useGetProjects } from "@/features/projects/api/use-get-projects";
import { FileIcon, MoreHorizontal } from "lucide-react";
import React from "react";
import { formatDistanceToNow } from "date-fns";

const ProjectsSection = () => {
  const { data, isPending, isError } = useGetProjects();
  console.log("🚀 ~ ProjectsSection ~ data:", data);
  return (
    <div className="mt-5">
      <h2 className="text-xl font-bold mb-4">Recent projects</h2>
      <div className="flex flex-col gap-y-2">
        {data?.pages &&
          data?.pages.map((group, i) => (
            <React.Fragment key={i}>
              {group.data.map((project) => (
                <div
                  key={project.id}
                  className="p-4 flex items-center border-b w-full justify-between md:justify-stretch"
                >
                  <div className="flex items-center gap-x-2 md:w-[35%]">
                    <FileIcon className="size-6" />
                    <span className="text-sm font-medium">{project.name}</span>
                  </div>
                  <div className="text-sm md:block hidden w-[30%]">
                    {project.width} x {project.height} px
                  </div>
                  <div className="text-sm md:block hidden w-[30%]">
                    {formatDistanceToNow(project.updateAt, {
                      addSuffix: true,
                    })}
                  </div>
                  <div className="md:w-[5%]">
                    <DropdownMenu modal={false}>
                      <DropdownMenuTrigger asChild>
                        <Button
                          className="ml-auto"
                          disabled={false}
                          size="icon"
                          variant="ghost"
                        >
                          <MoreHorizontal className="size-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end" className="w-60">
                        <DropdownMenuItem onClick={() => {}}>
                          Edit
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => {}}>
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </div>
              ))}
            </React.Fragment>
          ))}
      </div>
    </div>
  );
};

export default ProjectsSection;
