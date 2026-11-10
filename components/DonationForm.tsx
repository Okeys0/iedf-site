"use client";

import { useState, useEffect } from "react";
import {
  getPaystackPublicKey,
  generatePaymentRef,
  nairaToKobo,
  formatNaira,
} from "@/lib/payments/paystack";
import { AlertCircle, CheckCircle, Heart } from "lucide-react";

// Extend Window to include PaystackPop
declare global {
  interface Window {
    PaystackPop?: any;
  }
}

const PRESET_AMOUNTS = [5000, 10000, 25000, 50000, 100000];

interface DonationFormProps {
  locale: string;
}

export function DonationForm({ locale }: DonationFormProps) {
  const [email, setEmail] = useState("");
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [amount, setAmount] = useState<number | "">(10000);
  const [customAmount, setCustomAmount] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState<{
    type: "success" | "error";
    text: string;
  } | null>(null);

  const publicKey = getPaystackPublicKey();

  // Load Paystack inline script
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://js.paystack.co/v1/inline.js";
    script.async = true;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  const handleSuccess = async (reference: any) => {
    setIsSubmitting(true);
    setMessage(null);

    try {
      // Verify payment on the server
      const response = await fetch("/api/donations/verify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ reference: reference.reference }),
      });

      const result = await response.json();

      if (result.success) {
        setMessage({
          type: "success",
          text: `Thank you! Your donation of ${formatNaira(typeof amount === "number" ? amount : 0)} has been received.`,
        });
        // Reset form
        setEmail("");
        setFullName("");
        setPhone("");
        setAmount(10000);
        setCustomAmount("");
      } else {
        setMessage({
          type: "error",
          text: "Payment verification failed. Please contact us if you were charged.",
        });
      }
    } catch (error) {
      console.error("[Donation verification error]", error);
      setMessage({
        type: "error",
        text: "Something went wrong verifying your donation. Please contact us.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    setMessage({
      type: "error",
      text: "Payment was cancelled. Your donation was not processed.",
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setMessage(null);

    if (!publicKey) {
      setMessage({
        type: "error",
        text: "Donation system is not configured yet. Please check back soon.",
      });
      return;
    }

    if (!email || !amount || amount < 100) {
      setMessage({
        type: "error",
        text: "Please provide a valid email and amount (minimum ₦100).",
      });
      return;
    }

    if (!window.PaystackPop) {
      setMessage({
        type: "error",
        text: "Payment system is loading. Please try again in a moment.",
      });
      return;
    }

    const handler = window.PaystackPop.setup({
      key: publicKey,
      email,
      amount: nairaToKobo(typeof amount === "number" ? amount : 0),
      currency: "NGN",
      ref: generatePaymentRef(),
      metadata: {
        custom_fields: [
          {
            display_name: "Full Name",
            variable_name: "full_name",
            value: fullName || "Anonymous",
          },
          {
            display_name: "Phone",
            variable_name: "phone",
            value: phone || "Not provided",
          },
          {
            display_name: "Purpose",
            variable_name: "purpose",
            value: "IEDF General Donation",
          },
        ],
      },
      onSuccess: handleSuccess,
      onClose: handleClose,
    });

    handler.openIframe();
  };

  const selectAmount = (preset: number) => {
    setAmount(preset);
    setCustomAmount("");
  };

  const handleCustomAmount = (value: string) => {
    setCustomAmount(value);
    const parsed = parseFloat(value);
    if (!isNaN(parsed) && parsed > 0) {
      setAmount(parsed);
    } else {
      setAmount("");
    }
  };

  const inputCls =
    "w-full rounded-xl border border-gold/15 bg-forest/20 px-4 py-3 text-sm text-ink placeholder:text-ink-faint transition-all duration-300 focus:border-gold/50 focus:bg-forest/35 focus:outline-none focus:ring-2 focus:ring-gold/25";

  return (
    <form onSubmit={handleSubmit} className="glass-strong space-y-6 rounded-3xl p-6 sm:p-8">
      <div className="flex items-center gap-3">
        <Heart className="h-6 w-6 text-gold-bright" />
        <h3 className="font-display text-2xl text-ink">Support Our Work</h3>
      </div>

      {/* Amount selection */}
      <div className="space-y-3">
        <label className="block text-sm font-medium text-ink">Select Amount (₦)</label>
        <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
          {PRESET_AMOUNTS.map((preset) => (
            <button
              key={preset}
              type="button"
              onClick={() => selectAmount(preset)}
              className={`rounded-xl border px-4 py-3 text-sm font-semibold transition-all duration-200 ${
                amount === preset && !customAmount
                  ? "border-gold/50 bg-gold/15 text-gold-bright"
                  : "border-gold/15 bg-forest/20 text-ink-muted hover:border-gold/30 hover:text-ink"
              }`}
            >
              {formatNaira(preset)}
            </button>
          ))}
        </div>
        <input
          type="number"
          placeholder="Or enter custom amount"
          value={customAmount}
          onChange={(e) => handleCustomAmount(e.target.value)}
          className={inputCls}
          min="100"
          step="100"
        />
      </div>

      {/* Donor details */}
      <div className="space-y-3">
        <input
          type="email"
          placeholder="Email address *"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className={inputCls}
        />
        <input
          type="text"
          placeholder="Full name (optional)"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
          className={inputCls}
        />
        <input
          type="tel"
          placeholder="Phone number (optional)"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          className={inputCls}
        />
      </div>

      {/* Message */}
      {message && (
        <div
          className={`flex items-start gap-3 rounded-xl border px-4 py-3 text-sm ${
            message.type === "success"
              ? "border-emerald/30 bg-emerald/10 text-mint"
              : "border-gold/30 bg-gold/10 text-gold-pale"
          }`}
        >
          {message.type === "success" ? (
            <CheckCircle className="h-5 w-5 shrink-0" />
          ) : (
            <AlertCircle className="h-5 w-5 shrink-0" />
          )}
          <p>{message.text}</p>
        </div>
      )}

      {/* Submit */}
      <button
        type="submit"
        disabled={isSubmitting || !publicKey}
        className="w-full rounded-full bg-[linear-gradient(115deg,#f6e7b2,#ecc76a_30%,#d4a734_100%)] px-7 py-3.5 text-[15px] font-bold text-night transition-all duration-300 hover:brightness-110 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-50"
      >
        {isSubmitting ? "Processing..." : amount ? `Donate ${formatNaira(typeof amount === "number" ? amount : 0)}` : "Donate"}
      </button>

      <p className="text-center text-xs text-ink-faint">
        Secure payment powered by Paystack. Your donation supports IEDF&apos;s economic development initiatives in Ikeduru.
      </p>
    </form>
  );
}
