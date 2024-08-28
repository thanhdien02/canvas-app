"use client";
import Editor from "@/features/editor/components/editor";

interface EditorDetailProps {
  params: {
    editerId: string;
  };
}
const EditorDetail = ({ params }: EditorDetailProps) => {
  return <Editor />;
};

export default EditorDetail;
