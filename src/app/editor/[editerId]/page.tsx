"use client";
import Editor from "@/features/editor/components/editor";
import { useSession } from "next-auth/react";

interface EditorDetailProps {
  params: {
    editerId: string;
  };
}
const EditorDetail = ({ params }: EditorDetailProps) => {
  const session = useSession();
  return <Editor />;
};

export default EditorDetail;
