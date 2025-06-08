'use server'

import { client } from "@/lib/prisma";
import { currentUser } from "@clerk/nextjs/server";
import getInviteEmailOptions from "@/components/global/invite-template";
import nodemailer from 'nodemailer';
import Stripe from "stripe";

// need to implement
// const stripe = new Stripe(process.env.STRIPE_CLIENT_SECRET as string)

export const sendEmail = async (
    to: string,
    subject: string,
    text: string,
    html?: string
) => {
    const transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 465,
        secure: true,
        auth: {
            user: process.env.MAILER_EMAIL,
            pass: process.env.MAILER_PASSWORD,
        },
    })
  
    const mailOptions = {
        to,
        subject,
        text,
        html,
    }
    return { transporter, mailOptions }
}

export const onAuthenticateUser = async () => {
    try{
        const user = await currentUser()
        if(!user){
            // throw new Error("User Not Found")
            return { status: 403 }
        }

        const userExist = await client.user.findUnique({
            where: {
                clerkid: user.id
            },
            include: {
                workspace: {
                    where: {
                        User: {
                            clerkid: user.id
                        },
                    },
                },
            },
        })
        if(userExist) {
            return { status: 200, user: userExist }
        }

        const newUser = await client.user.create({
            data: {
                clerkid: user.id,
                email: user.emailAddresses[0].emailAddress,
                firstname: user.firstName,
                lastname: user.lastName,
                image: user.imageUrl,
                studio: {
                    create: {},
                },
                subscription: {
                    create: {},
                },
                workspace: {
                    create: {
                        name: `${user.firstName}'s Workspace`,
                        type: 'PERSONAL',
                    }
                },
            },
            include: {
                workspace: {
                    where: {
                        User: {
                            clerkid: user.id
                        },
                    },
                },
                subscription: {
                    select: {
                        plan: true,
                    },
                },
            },
        })

        if(newUser){
            return { status: 201, user: newUser }
        }

        return { status: 400, message: "User Not created"}
        
    } catch(error){
        console.log('🔴 ERROR', error)
        return { status: 500, message: "Internal System Error"}

    }
};

export const getNotifications = async () => {
    try {
        const user = await currentUser()
        if (!user) return { status: 404 }
        const notifications = await client.user.findUnique({
        where: {
            clerkid: user.id,
        },
        select: {
            notification: true,
            _count: {
            select: {
                notification: true,
            },
            },
        },
        })

        if (notifications && notifications.notification.length > 0)
        return { status: 200, data: notifications }
        return { status: 404, data: [] }
    } catch (error) {
        return { status: 400, data: [] }
    }
}

export const searchUsers = async (query: string) => {
    try {
        const user = await currentUser()
        if (!user) return { status: 404 }

        const users = await client.user.findMany({
        where: {
            OR: [
            { firstname: { contains: query } },
            { email: { contains: query } },
            { lastname: { contains: query } },
            ],
            NOT: [{ clerkid: user.id }],
        },
        select: {
            id: true,
            subscription: {
                select: {
                    plan: true,
                },
            },
            firstname: true,
            lastname: true,
            image: true,
            email: true,
        },
        })

        if (users && users.length > 0) {
        return { status: 200, data: users }
        }

        return { status: 404, data: undefined }
    } catch (error) {
        return { status: 500, data: undefined }
    }
}

export const getPaymentInfo = async () => {
    try {
        const user = await currentUser();
        if(!user) return { status: 404 }

        const payment = await client.user.findUnique({
            where: {
                clerkid: user.id,
            },
            select: {
                subscription: {
                    select: {
                        plan: true,
                    },
                },
            },
        })

        if(payment){
            return { status: 200, data: payment }
        }
    } catch (error) {
        return { status: 500 }
    }
}

export const enableFirstView = async (state: boolean) => {
    try {
        const user = await currentUser()
  
        if (!user) return { status: 404 }
  
        const view = await client.user.update({
            where: {
                clerkid: user.id,
            },
            data: {
                firstView: state,
            },
        })
  
        if (view) {
            return { status: 200, data: 'Setting updated' }
        }
    } catch (error) {
        return { status: 400 }
    }
}

export const getFirstView = async () => {
    try {
        const user = await currentUser();
        if(!user) return { status: 404 }

        const userData = await client.user.findUnique({
            where: {
                clerkid: user.id,
            },
            select: {
                firstView: true,
            },
        })

        if(userData) return { status: 200, data: userData.firstView }

        return { status: 400, data: false }

    } catch (error) {
        return { status: 500 }
    }
}

export const createCommentAndReply = async (
    userId: string,
    comment: string,
    videoId: string,
    commentId?: string | undefined
) => {
    try {
        if (commentId) {
            const reply = await client.comment.update({
                where: {
                    id: commentId,
                },
                data: {
                    reply: {
                        create: {
                            comment,
                            userId,
                            videoId,
                        },
                    },
                },
            })
            if (reply) {
                return { status: 200, data: 'Reply posted' }
            }
        }

        const newComment = await client.video.update({
            where: {
            id: videoId,
            },
            data: {
                Comment: {
                    create: {
                    comment,
                    userId,
                    },
                },
            },
        })
    if (newComment) return { status: 200, data: 'New comment added' }
    } catch (error) {
    return { status: 400 }
    }
}

export const getUserProfile = async () => {
    try {
        const user = await currentUser()
        if (!user) return { status: 404 }
        const profileIdAndImage = await client.user.findUnique({
            where: {
                clerkid: user.id,
            },
            select: {
                image: true,
                id: true,
            },
        })
    
        if (profileIdAndImage) return { status: 200, data: profileIdAndImage }
    } catch (error) {
        return { status: 400 }
    }
}
  
export const getVideoComments = async (Id: string) => {
    try {
        const comments = await client.comment.findMany({
            where: {
                OR: [{ videoId: Id }, { commentId: Id }],
                commentId: null,
            },
            include: {
                reply: {
                        include: {
                        User: true,
                    },
                },
                User: true,
            },
        })
  
      return { status: 200, data: comments }
    } catch (error) {
      return { status: 400 }
    }
}

export const inviteMembers = async (
    workspaceId: string,
    recieverId: string,
    email: string
) => {
    try {
        const user = await currentUser()
        if (!user) return { status: 404 }
        const recieverInfo = await client.user.findUnique({
            where: {
                id: recieverId,
            },
            select: {
                id: true,
                firstname: true,
                lastname: true,
            },
        })

        const serderInfo = await client.user.findUnique({
            where: {
                clerkid: user.id,
            },
            select: {
                id: true,
                firstname: true,
                lastname: true,
            },
        })

        if (recieverInfo && serderInfo) {
            const workspace = await client.workSpace.findUnique({
                where: {
                    id: workspaceId,
                },
                select: {
                    name: true,
                },
            })
            if (workspace) {
                const invitation = await client.invite.create({
                    data: {
                        senderId: serderInfo.id,
                        recieverId: recieverInfo.id,
                        workSpaceId: workspaceId,
                        content: `You are invited to join ${workspace.name} Workspace, click accept to confirm`,
                    },
                    select: {
                        id: true,
                    },
                })
    
                await client.user.update({
                    where: {
                        id: recieverInfo.id,
                    },
                    data: {
                        notification: {
                            create: {
                                content: `${serderInfo.firstname} ${serderInfo.lastname} invited ${recieverInfo.firstname} into ${workspace.name} Workspace`,
                            },
                        },
                    },
                })
                if (invitation) {
                    const { subject, plainText, html } = getInviteEmailOptions({
                        recipientName: recieverInfo.firstname,
                        senderName: `${serderInfo.firstname} ${serderInfo.lastname}`,
                        workspaceName: workspace.name,
                        inviteLink: `${process.env.NEXT_PUBLIC_HOST_URL}/invite/${invitation.id}`,
                        logoUrl: `${process.env.NEXT_PUBLIC_HOST_URL}/palu-logo.svg`
                    })

                    const { transporter, mailOptions } = await sendEmail(
                        email,
                        subject,
                        plainText,
                        html
                    )
        
                    transporter.sendMail(mailOptions, (error, info) => {
                        if (error) {
                            console.log('🔴', error.message)
                        } else {
                            console.log('✅ Email send')
                        }
                    })
                    return { status: 200, data: 'Invite sent' }
                }
                return { status: 400, data: 'invitation failed' }
            }
            return { status: 404, data: 'workspace not found' }
        }
        return { status: 404, data: 'recipient not found' }
    } catch (error: any) {
        console.log('Error caught:', typeof error === 'object' ? JSON.stringify(error, null, 2) : error);
        return { status: 400, data: 'Internal server error' }
    }
}

export const acceptInvite = async (inviteId: string) => {
    try {
        const user = await currentUser()
        if (!user) return { status: 404 }
        const invitation = await client.invite.findUnique({
            where: {
                id: inviteId,
            },
            select: {
                workSpaceId: true,
                reciever: {
                    select: {
                        clerkid: true,
                    },
                },
            },
        })
    
        if (user.id !== invitation?.reciever?.clerkid) return { status: 401 }
        const acceptInvite = client.invite.update({
            where: {
                id: inviteId,
            },
            data: {
                accepted: true,
            },
        })
    
        const updateMember = client.user.update({
            where: {
                clerkid: user.id,
            },
            data: {
            members: {
                create: {
                    workSpaceId: invitation.workSpaceId,
                },
            },
            },
        })
    
        const membersTransaction = await client.$transaction([
            acceptInvite,
            updateMember,
        ])
    
        if (membersTransaction) {
            return { status: 200 }
        }
        return { status: 400 }
    } catch (error) {
        return { status: 400 }
    }
}

export const completeSubscription = async (session_id: string) => {

    return { status: 500 , data: "out of service!!"}
    // try {
    //     const user = await currentUser()
    //     if (!user) return { status: 404 }
  
    //     const session = await stripe.checkout.sessions.retrieve(session_id)
    //     if (session) {
    //         const customer = await client.user.update({
    //             where: {
    //                 clerkid: user.id,
    //             },
    //             data: {
    //                 subscription: {
    //                     update: {
    //                         data: {
    //                             customerId: session.customer as string,
    //                             plan: 'PRO',
    //                         },
    //                     },
    //                 },
    //             },
    //         })
    //         if (customer) {
    //             return { status: 200 }
    //         }
    //     }
    //     return { status: 404 }
    // } catch (error) {
    //     return { status: 400 }
    // }
}