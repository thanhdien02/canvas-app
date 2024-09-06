import { useQuery } from "@tanstack/react-query";
import { client } from "@/lib/hono";
import { InferResponseType } from "hono";

export type ResponseType = InferResponseType<
  (typeof client.api.projects)[":id"]["$get"],
  200
>;
interface UseGetProject {
  id: string;
}
export const useGetProject = ({ id }: UseGetProject) => {
  const query = useQuery({
    enabled: !!id,
    queryKey: ["project", { id }],
    queryFn: async () => {
      const response = await client.api.projects[":id"].$get({
        param: {
          id,
        },
      });
      if (!response.ok) {
        throw new Error("Failed to retrieve project");
      }
      return await response.json();
    },
  });
  return query;
};
