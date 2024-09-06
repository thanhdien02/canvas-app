import { useMutation, useQueryClient } from "@tanstack/react-query";
import { client } from "@/lib/hono";
import { InferRequestType, InferResponseType } from "hono";
import { toast } from "sonner";

type ResponseType = InferResponseType<
  (typeof client.api.projects)[":id"]["$patch"],
  200
>;
type RequestType = InferRequestType<
  (typeof client.api.projects)[":id"]["$patch"]
>["json"];
interface UseUpdateProjectProps {
  id: string;
}
export const useUpdateProject = ({ id }: UseUpdateProjectProps) => {
  const queryClient = useQueryClient();
  const mutation = useMutation<ResponseType, Error, RequestType>({
    mutationKey: ["project", { id }],
    mutationFn: async (json) => {
      const response = await client.api.projects[":id"].$patch({
        json,
        param: { id },
      });
      if (!response.ok) {
        throw new Error("Failed to update project");
      }
      return await response.json();
    },
    onSuccess: () => {
      toast.success("Project updated successfully");
      queryClient.invalidateQueries({ queryKey: ["project"] });
    },
    onError: () => {
      toast.error("Failed to update project");
    },
  });

  return mutation;
};
