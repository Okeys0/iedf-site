import { NextRequest, NextResponse } from "next/server";
import { verifyPaystackPayment } from "@/lib/payments/paystack";
import { query } from "@/lib/db/client";

/**
 * API route to verify Paystack donations and log them to the database.
 * Called by DonationForm after Paystack redirects back from payment.
 */
export async function POST(request: NextRequest) {
  try {
    const { reference } = await request.json();

    if (!reference) {
      return NextResponse.json(
        { success: false, error: "Payment reference is required" },
        { status: 400 }
      );
    }

    // Verify with Paystack
    const verification = await verifyPaystackPayment(reference);

    if (!verification.success) {
      return NextResponse.json(
        { success: false, error: verification.error || "Verification failed" },
        { status: 400 }
      );
    }

    const paymentData = verification.data;

    // Store donation record in database
    try {
      await query(
        `INSERT INTO donations (
          reference, 
          email, 
          amount, 
          currency, 
          status, 
          paid_at,
          metadata
        ) VALUES ($1, $2, $3, $4, $5, $6, $7)`,
        [
          paymentData.reference,
          paymentData.customer.email,
          paymentData.amount / 100, // Convert kobo to naira
          paymentData.currency,
          paymentData.status,
          paymentData.paid_at,
          JSON.stringify(paymentData.metadata || {}),
        ]
      );
    } catch (dbError) {
      console.error("[Donation DB error]", dbError);
      // Don't fail the response if DB write fails - payment was successful
      // Log it but still return success to the user
    }

    return NextResponse.json({
      success: true,
      data: {
        amount: paymentData.amount / 100,
        reference: paymentData.reference,
        email: paymentData.customer.email,
      },
    });
  } catch (error) {
    console.error("[Donation verification error]", error);
    return NextResponse.json(
      { success: false, error: "Server error during verification" },
      { status: 500 }
    );
  }
}
