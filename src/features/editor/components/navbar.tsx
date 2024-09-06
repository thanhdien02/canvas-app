"use client";
import Logo from "./logo";
import {
  ChevronDown,
  Download,
  MousePointerClick,
  Redo2,
  Undo2,
} from "lucide-react";
import { BsCloudCheck } from "react-icons/bs";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { CiFileOn } from "react-icons/ci";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";
import Hint from "@/components/hint";
import { Editor, JSON_KEYS } from "../type/type.editor";
import { useFilePicker } from "use-file-picker";
import { useUpdateProject } from "@/features/projects/api/use-update-project";
import { useParams, usePathname } from "next/navigation";
import { fabric } from "fabric";
interface NavbarProps {
  editor: Editor | undefined;
}
const Navbar = ({ editor }: NavbarProps) => {
  const { editerId } = useParams();
  const mutation = useUpdateProject({ id: editerId as string });

  const { openFilePicker } = useFilePicker({
    accept: ".json",
    onFilesSuccessfullySelected: ({ plainFiles }: any) => {
      if (plainFiles && plainFiles.length > 0) {
        const file = plainFiles[0];
        const reader = new FileReader();
        reader.readAsText(file, "UTF-8");
        reader.onload = () => {
          editor?.loadJson(reader.result as string);
        };
      }
    },
  });
  const onSave = () => {
    const currentState = editor?.canvas.toJSON(JSON_KEYS);
    const json = JSON.stringify(currentState);

    const size = editor?.getActiveSizePage() || { height: 0, width: 0 };
    mutation.mutate({ ...size, json });
  };
  return (
    <div className="h-[68px] p-4 pl-8 flex items-center shrink-0 border-b">
      <Link href="/">
        <Logo />
      </Link>
      <div className="ml-10">
        <DropdownMenu modal={false}>
          <DropdownMenuTrigger
            className="flex items-center gap-2 font-medium"
            asChild
          >
            <Button variant="ghost" type="button" size="sm">
              <span className="text-sm">File</span>
              <ChevronDown strokeWidth="2" size="20px" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem
              className="flex items-center gap-2"
              onClick={() => {
                openFilePicker();
              }}
            >
              <CiFileOn className="size-8" />
              <div>
                <p>Open</p>
                <p className="text-sm text-muted-foreground">
                  Open a JSON file
                </p>
              </div>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <Separator orientation="vertical" className="mx-2" />

      <Hint label="Click" side="bottom" sideOffset={10}>
        <Button variant="ghost" size="icon">
          <MousePointerClick className="size-4" />
        </Button>
      </Hint>
      <div className="flex items-center gap-1">
        <Hint label="Undo" side="bottom" sideOffset={10}>
          <Button variant="ghost" size="icon">
            <Undo2 className="size-4" />
          </Button>
        </Hint>
        <Hint label="Redo" side="bottom" sideOffset={10}>
          <Button variant="ghost" size="icon">
            <Redo2 className="size-4" />
          </Button>
        </Hint>
      </div>
      <Separator orientation="vertical" className="mx-2" />
      <div
        className="flex items-center gap-x-2 cursor-pointer"
        onClick={onSave}
      >
        <BsCloudCheck className="w-[22px] h-[20px] text-muted-foreground" />
        <span className="text-sm text-muted-foreground">Saved</span>
      </div>

      <div className="ml-auto flex items-center gap-x-4">
        <DropdownMenu modal={false}>
          <DropdownMenuTrigger asChild>
            <Button size="sm" variant="ghost">
              Export
              <Download className="size-4 ml-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem
              className="flex items-center gap-x-2"
              onClick={() => editor?.saveJson()}
            >
              <CiFileOn className="size-8" />
              <div>
                <p>JSON</p>
                <p className="text-xs text-muted-foreground">
                  Save for later editing
                </p>
              </div>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
};

export default Navbar;
