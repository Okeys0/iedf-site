/**
 * Paystack payment utilities for IEDF donations.
 * 
 * Test keys should be set in .env.local:
 * NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY=pk_test_...
 * PAYSTACK_SECRET_KEY=sk_test_...
 * 
 * For production, use live keys:
 * NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY=pk_live_...
 * PAYSTACK_SECRET_KEY=sk_live_...
 */

export interface DonationData {
  email: string;
  amount: number; // in kobo (NGN minor unit) - e.g., 10000 = ₦100
  fullName?: string;
  phone?: string;
  metadata?: Record<string, any>;
}

export interface PaystackConfig {
  publicKey: string;
  email: string;
  amount: number;
  currency?: string;
  ref?: string;
  metadata?: Record<string, any>;
  onSuccess?: (reference: any) => void;
  onClose?: () => void;
}

/**
 * Get the Paystack public key from environment.
 * Returns empty string if not set (caller should handle gracefully).
 */
export function getPaystackPublicKey(): string {
  return process.env.NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY || "";
}

/**
 * Generate a unique payment reference for Paystack.
 */
export function generatePaymentRef(): string {
  return `IEDF_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`.toUpperCase();
}

/**
 * Convert amount in Naira to kobo (Paystack expects minor units).
 * Example: nairaToKobo(100) => 10000
 */
export function nairaToKobo(naira: number): number {
  return Math.round(naira * 100);
}

/**
 * Convert amount in kobo to Naira for display.
 * Example: koboToNaira(10000) => 100
 */
export function koboToNaira(kobo: number): number {
  return kobo / 100;
}

/**
 * Format amount in Naira for display.
 * Example: formatNaira(1500) => "₦1,500.00"
 */
export function formatNaira(amount: number): string {
  return new Intl.NumberFormat('en-NG', {
    style: 'currency',
    currency: 'NGN',
  }).format(amount);
}

/**
 * Verify a Paystack payment on the server side.
 * This should be called from a server action or API route.
 */
export async function verifyPaystackPayment(reference: string): Promise<{
  success: boolean;
  data?: any;
  error?: string;
}> {
  const secretKey = process.env.PAYSTACK_SECRET_KEY;
  
  if (!secretKey) {
    return { success: false, error: "Payment verification not configured" };
  }

  try {
    const response = await fetch(
      `https://api.paystack.co/transaction/verify/${reference}`,
      {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${secretKey}`,
          'Content-Type': 'application/json',
        },
      }
    );

    const result = await response.json();

    if (response.ok && result.status && result.data.status === 'success') {
      return { success: true, data: result.data };
    }

    return { success: false, error: result.message || "Payment verification failed" };
  } catch (error) {
    console.error("[Paystack verification error]", error);
    return { success: false, error: "Network error during verification" };
  }
}
