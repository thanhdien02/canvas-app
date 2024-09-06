"use client";
import { Button } from "@/components/ui/button";
import Editor from "@/features/editor/components/editor";
import { useGetProject } from "@/features/projects/api/use-get-project";
import { Link, Loader, TriangleAlert } from "lucide-react";

interface EditorDetailProps {
  params: {
    editerId: string;
  };
}
const EditorDetail = ({ params }: EditorDetailProps) => {
  const { data, isPending, isError } = useGetProject({
    id: params.editerId,
  });

  if (isPending || !data) {
    return (
      <div className="h-screen w-full flex items-center justify-center">
        <Loader className="size-6 animate-spin text-muted-foreground" />
      </div>
    );
  }
  if (isError) {
    return (
      <div className="h-full flex flex-col gap-y-5 items-center justify-center">
        <TriangleAlert className="size-6 text-muted-foreground" />
        <p className="text-muted-foreground text-sm">Failed to fetch project</p>
        <Button asChild variant="secondary">
          <Link href="/">Back to Home</Link>
        </Button>
      </div>
    );
  }
  return <Editor initialData={data.data} />;
};

export default EditorDetail;
