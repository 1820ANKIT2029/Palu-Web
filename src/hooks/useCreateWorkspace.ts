
import { createWorkspace } from "@/actions/workspace"
import { useMutationData } from "./useMutationData"
import useZodForm from "./useZodForm";
import { workspaceSchema } from "@/components/forms/workspace-form/schema";

export const useCreateWorkspace = () => {
    const { mutate, isPending } = useMutationData(
        ['create-workspace'], 
        (data: {name: string}) => createWorkspace(data.name),
        "user-workspaces"
    );

    const { errors, OnFormSubmit, register } = useZodForm(workspaceSchema, mutate)

    return { errors, OnFormSubmit, register, isPending }
};