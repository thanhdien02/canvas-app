import { ActiveTool, Editor } from "../type/type.editor";
import ToolSidebarHeader from "./tool-siderbar-header";
import { Separator } from "@/components/ui/separator";
import ToolSidebarClose from "./tool-sidebar-close";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { useGetImages } from "@/features/images/api/use-get-images";
import Image from "next/image";
import Link from "next/link";
import { AlertTriangle, Loader } from "lucide-react";

interface ImageSideBarProps {
  isActive: ActiveTool;
  onChangeActiveTool: (tool: ActiveTool) => void;
  editor: Editor | undefined;
}
const ImageSideBar = ({
  isActive,
  editor,
  onChangeActiveTool,
}: ImageSideBarProps) => {
  const { data, isLoading, isError } = useGetImages();
  const onClose = () => {
    onChangeActiveTool("select");
  };
  return (
    <div
      className={`flex flex-col relative z-40 shrink-0 border-r bg-white transition-all w-[360px] 
         ${isActive === "images" ? "block" : "hidden"}`}
    >
      <ToolSidebarHeader
        title="Images"
        description="Add images to your design"
      ></ToolSidebarHeader>
      <Separator orientation="horizontal"></Separator>
      {isLoading && (
        <div className="flex items-center justify-center flex-1">
          <Loader className="size-4 text-muted-foreground animate-spin" />
        </div>
      )}
      {isError && (
        <div className="flex flex-col gap-y-4 items-center justify-center flex-1">
          <AlertTriangle className="size-4 text-muted-foreground" />
          <p className="text-muted-foreground text-xs">
            Failed to fetch images
          </p>
        </div>
      )}
      <ScrollArea>
        <div className="p-4">
          <div className="grid grid-cols-2 gap-4">
            {data &&
              data.map((image) => {
                return (
                  <button
                    className="relative group h-[110px] rounded"
                    key={image?.id}
                    onClick={() => editor?.addImage(image.urls.regular)}
                  >
                    <Image
                      className="object-cover rounded"
                      alt={image?.alt_description || "Image"}
                      fill
                      src={image?.urls?.small}
                    ></Image>
                    <div className="absolute inset-0 group-hover:bg-slate-200/50 opacity-0 group-hover:opacity-100 transition-all">
                      <Link
                        href={image.links.html}
                        target="_blank"
                        className="flex items-center justify-start shrink-0 w-full px-2 text-white text-xs hover:underline absolute left-0 right-0 bottom-0 h-[30px] bg-black/50"
                      >
                        <span className="w-[90%] shrink-0 truncate">
                          {image.user.name}
                        </span>
                      </Link>
                    </div>
                  </button>
                );
              })}
          </div>
        </div>
      </ScrollArea>
      <ToolSidebarClose onClose={onClose}></ToolSidebarClose>
    </div>
  );
};

export default ImageSideBar;
