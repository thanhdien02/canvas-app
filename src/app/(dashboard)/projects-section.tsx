"use client";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useGetProjects } from "@/features/projects/api/use-get-projects";
import {
  AlertTriangle,
  Copy,
  FileIcon,
  Loader,
  MoreHorizontal,
  Pencil,
  Search,
  Trash2,
} from "lucide-react";
import React from "react";
import { formatDistanceToNow } from "date-fns";
import { useRouter } from "next/navigation";
import { useDeleteProject } from "@/features/projects/api/use-delete-project";
import { useDuplicateProject } from "@/features/projects/api/use-duplicate-project";

const ProjectsSection = () => {
  const { data, fetchNextPage, status, hasNextPage, isFetchingNextPage } =
    useGetProjects();

  const removeMutation = useDeleteProject();

  const duplicateMutation = useDuplicateProject();
  const route = useRouter();

  const onDelete = (id: string) => {
    removeMutation.mutate({ id });
  };
  const onDuplicate = (id: string) => {
    duplicateMutation.mutate({ id });
  };
  if (status === "pending" || !data) {
    return (
      <div className="mt-5">
        <h2 className="text-xl font-bold mb-4">Recent projects</h2>
        <div className="min-h-[300px] w-full flex items-center justify-center">
          <Loader className="size-6 animate-spin text-muted-foreground" />
        </div>
      </div>
    );
  } else if (status === "error") {
    return (
      <div className="mt-5">
        <h2 className="text-xl font-bold mb-4">Recent projects</h2>
        <div className="min-h-[300px] flex flex-col gap-y-4 items-center justify-center">
          <AlertTriangle className="size-6 text-muted-foreground" />
          <p className="text-muted-foreground text-sm">
            Failed to load projects
          </p>
        </div>
      </div>
    );
  }

  if (!data.pages.length || !data.pages[0].data.length) {
    return (
      <div className="mt-5">
        <h2 className="text-xl font-bold mb-4">Recent projects</h2>
        <div className="min-h-[300px] flex flex-col gap-y-4 items-center justify-center">
          <Search className="size-6 text-muted-foreground" />
          <p className="text-muted-foreground text-sm">No projects found</p>
        </div>
      </div>
    );
  }

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
                  <div
                    className="flex items-center gap-x-2 md:w-[35%] cursor-pointer hover:opacity-70"
                    onClick={() => {
                      route.push(`/editor/${project.id}`);
                    }}
                  >
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
                        <DropdownMenuItem
                          className="flex items-center gap-x-2"
                          onClick={() => {
                            onDuplicate(project.id);
                          }}
                        >
                          <Copy className="size-4" /> Make a copy
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          className="flex items-center gap-x-2"
                          onClick={() => {
                            onDelete(project.id);
                          }}
                        >
                          <Trash2 className="size-4" />
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
      {hasNextPage && (
        <div className="w-full flex items-center justify-center pt-4">
          <Button
            variant="ghost"
            onClick={() => fetchNextPage()}
            disabled={isFetchingNextPage}
          >
            Load more
          </Button>
        </div>
      )}
    </div>
  );
};

export default ProjectsSection;
