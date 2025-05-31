import { createCommentSchema } from "@/components/forms/comment-form/schema"
import { useMutationData } from "./useMutationData"
import { useQueryData } from "./useQueryData"
import useZodForm from "./useZodForm"
import { createCommentAndReply, getUserProfile } from "@/actions/user"
import { useUser } from '@clerk/nextjs';

export const useVideoComment = (videoId: string, commentId?: string) => {
    const { data, isFetching } = useQueryData(
        ['user-profile'],
        getUserProfile
    )

    // if(isFetching){
    //     return null;
    // }

    const { status, data: User } = data as {
        status: number
        data: { id: string; image: string }
    }

    const { mutate, isPending } = useMutationData(
        ['new-comment'],
        (data: { comment: string }) => createCommentAndReply(User.id, data.comment, videoId, commentId),
        'video-comments',
        () => reset()
    )

    const { register, OnFormSubmit, errors, reset } = useZodForm(
        createCommentSchema,
        mutate
    )

    return { register, OnFormSubmit, errors, reset, isPending }
}