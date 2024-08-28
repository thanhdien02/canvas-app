"use client";
import Logo from "./logo";
import { ChevronDown, MousePointerClick, Redo2, Undo2 } from "lucide-react";
import { BsCloudCheck, BsCloudSlash } from "react-icons/bs";
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

const Navbar = () => {
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
              onClick={() => {}}
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
      <div className="flex items-center gap-x-2">
        <BsCloudCheck className="w-[22px] h-[20px] text-muted-foreground" />
        <span className="text-sm text-muted-foreground">Saved</span>
      </div>
    </div>
  );
};

export default Navbar;
