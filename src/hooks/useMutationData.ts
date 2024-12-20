import { MutationFunction, MutationKey, useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export const useMutationData = (
    mutationKey: MutationKey,
    mutationFn: MutationFunction<any, any>,
    queryKey?: string,
    OnSuccess?: () => void
) => {
    const client = useQueryClient()
    const {mutate, isPending} = useMutation({
        mutationKey,
        mutationFn,
        onSuccess(data){
            if(OnSuccess) OnSuccess()
            return toast(data?.status === 200 ? "Success" : "Error", {
                description: data?.data,
            })
        },
        onSettled: async () => {
            return await client.invalidateQueries({ queryKey: [queryKey]})
        },
    })

    return { mutate, isPending }
}