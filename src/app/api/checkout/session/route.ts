import { NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";
import { db } from "@/lib/db";

type CheckoutItem = {
  name: string;
  price: number;
  quantity: number;
};

export async function POST(request: Request) {
  try {
    if (!stripe) {
      return NextResponse.json({ error: "Stripe is not configured" }, { status: 500 });
    }

    const body = await request.json();
    const items: CheckoutItem[] = Array.isArray(body.items) ? body.items : [];
    const email = body.email ? String(body.email) : null;

    if (items.length === 0) {
      return NextResponse.json({ error: "Cart is empty" }, { status: 400 });
    }

    const line_items = items.map((item) => ({
      quantity: item.quantity,
      price_data: {
        currency: "inr",
        unit_amount: item.price,
        product_data: { name: item.name }
      }
    }));

    const baseUrl = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";

    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      payment_method_types: ["card"],
      line_items,
      customer_email: email || undefined,
      success_url: `${baseUrl}/checkout?success=true`,
      cancel_url: `${baseUrl}/checkout?canceled=true`
    });

    await db.order.create({
      data: {
        email,
        totalAmount: items.reduce((sum, i) => sum + i.price * i.quantity, 0),
        status: "pending",
        stripeSessionId: session.id,
        items: {
          create: items.map((i) => ({
            name: i.name,
            price: i.price,
            quantity: i.quantity
          }))
        }
      }
    });

    return NextResponse.json({ id: session.id, url: session.url });
  } catch (error) {
    return NextResponse.json({ error: "Checkout session failed", details: String(error) }, { status: 500 });
  }
}
