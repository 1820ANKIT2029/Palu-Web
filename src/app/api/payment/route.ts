import { currentUser } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import Stripe from 'stripe';

// const stripe = new Stripe(process.env.STRIPE_CLIENT_SECRET as string)
let stripe;

export async function GET() {
    return NextResponse.json({ status: 500 })
    const user = await currentUser();
    if(!user) return NextResponse.json({status: 404});

    const priceId = process.env.STRIPE_SUBSCRIPTION_PRICE_ID;

    const session = await stripe.checkout.sessions.create({
        mode: 'subscription',
        line_items: [
            {
                price: priceId,
                quantity: 1,
            },
        ],
        success_url: `${process.env.NEXT_PUBLIC_HOST_URL}/payment?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${process.env.NEXT_PUBLIC_HOST_URL}/payment?cancel=true`,
    })

    if(session){
        return NextResponse.json({
            status: 200,
            session_url: session.url,
            customer_id: session.customer,
        })
    }

    return NextResponse.json({ status: 400 })
}