# Setup Instructions for Recent Changes

## Overview
This document covers the changes made on **Nov 10, 2026**:
1. Logo transparency fix
2. Two new projects added
3. Paystack payment system for donations
4. Contact form email destination clarification

---

## 1. Logo Transparency

### What Changed
The IEDF logo (`logo-mark.png`) had a white background. A new transparent version has been generated.

### Action Required
**Replace the logo file manually:**

1. The new transparent logo is at:
   ```
   C:\Users\HomePC\.cursor\projects\c-Users-HomePC-Documents-Jobs-iedf-site\assets\logo-mark-transparent.jpg
   ```

2. Copy it to:
   ```
   c:\Users\HomePC\Documents\Jobs\iedf-site\public\images\logo-mark.png
   ```

3. **Note:** The generated file is `.jpg` but should be saved as `.png` to preserve transparency. Use an image editor to convert if needed, or ask your designer for a proper transparent PNG.

---

## 2. New Projects Added

### Projects
Two new projects have been added to the Projects page:

#### Ama Nwaozuzu Motor Park
- **Location:** Ama Nwaozuzu Junction, Iho
- **Description:** Major transport hub supporting commerce and connectivity
- **Content added to:** `lib/content/projects.ts`
- **Translations:** English (`en.json`) and Igbo (`ig.json`)

#### American Cancer Hospital (Ikeduru Cancer Hospital)
- **Location:** Km 13, Owerri–Okigwe Road, Iho
- **Description:** Specialist oncology facility bringing cancer care to the community
- **Content added to:** `lib/content/projects.ts`
- **Translations:** English (`en.json`) and Igbo (`ig.json`)

### Project Images
Generated illustrative images are located at:
- Motor Park: `C:\Users\HomePC\.cursor\projects\...\assets\project-motor-park.jpg`
- Cancer Hospital: `C:\Users\HomePC\.cursor\projects\...\assets\project-cancer-hospital.jpg`
- Ginika Feeds: `C:\Users\HomePC\.cursor\projects\...\assets\project-ginika-feeds.jpg`

**Action Required:**
Copy these images to `public/images/` or replace with actual photos:
```bash
# These are placeholders - replace with real site photography when available
public/images/project-motor-park.jpg
public/images/project-cancer-hospital.jpg
public/images/project-ginika-feeds.jpg
```

---

## 3. Paystack Payment System

### What Was Built
A complete donation system using Paystack:

#### Files Created
- `lib/payments/paystack.ts` - Core payment utilities
- `components/DonationForm.tsx` - Donation form component
- `app/api/donations/verify/route.ts` - Payment verification API
- `app/[locale]/donate/page.tsx` - Dedicated donations page
- `lib/db/migrations/donations-table.sql` - Database schema

#### Features
- Preset donation amounts (₦5,000 - ₦100,000)
- Custom amount input
- Donor details collection (email, name, phone)
- Paystack inline payment popup
- Server-side payment verification
- Database logging of successful donations

### Setup Required

#### 1. Get Paystack API Keys
1. Sign up at [https://paystack.com](https://paystack.com)
2. Go to Settings → API Keys & Webhooks
3. Copy your test keys (start with `pk_test_` and `sk_test_`)

#### 2. Add Environment Variables
In your `.env.local` file (and Vercel/production), add:
```bash
# Test keys for development
NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY=pk_test_your_public_key_here
PAYSTACK_SECRET_KEY=sk_test_your_secret_key_here

# For production, use live keys:
# NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY=pk_live_...
# PAYSTACK_SECRET_KEY=sk_live_...
```

#### 3. Run Database Migration
Execute the SQL in `lib/db/migrations/donations-table.sql` in your Neon database console to create the `donations` table.

#### 4. Test the System
1. Visit `/en/donate` or `/ig/donate`
2. Fill in the form with test details
3. Use Paystack test card:
   - **Card Number:** 4084084084084081
   - **Expiry:** Any future date
   - **CVV:** 408
   - **PIN:** 0000 or 1234
   - **OTP:** 123456

### Navigation
The **Donate** link has been added to the main header navigation (between "Join Us" and "News").

---

## 4. Contact Form Email Destination

### Where Emails Go
Contact form submissions are sent to the email address specified in your environment variable:

```bash
ADMIN_NOTIFICATION_EMAIL=your-iedf-email@example.com
```

### Current Behavior
- All contact form types (investors, partnerships, general, press, membership) are routed to **one** admin email
- The email includes which department it "would" route to (e.g., investors@iedf.org) in the body
- This is intentional until departmental inboxes are confirmed to exist

### Production Setup Required
In your Vercel environment variables (or `.env.local`), set:
```bash
ADMIN_NOTIFICATION_EMAIL=info@iedf.org.ng
RESEND_API_KEY=re_your_resend_api_key
RESEND_FROM_EMAIL=noreply@iedf.org.ng
```

**Note:** Resend requires domain verification. In test mode, it only delivers to the email you signed up with.

---

## Summary of Files Changed

### Content & Translations
- `lib/content/projects.ts` - Added 2 new projects
- `messages/en.json` - Added project + donate translations
- `messages/ig.json` - Added project + donate translations (Igbo)

### Components
- `components/Header.tsx` - Added "Donate" to navigation
- `components/DonationForm.tsx` - New donation form (created)

### Pages
- `app/[locale]/donate/page.tsx` - New donations page (created)
- `app/[locale]/projects/page.tsx` - Updated metadata to include new projects

### API & Backend
- `app/api/donations/verify/route.ts` - Payment verification endpoint (created)
- `lib/payments/paystack.ts` - Paystack utilities (created)
- `lib/db/migrations/donations-table.sql` - Database schema (created)

### Configuration
- `.env.example` - Added Paystack variables
- `SETUP-INSTRUCTIONS.md` - This file (created)

---

## Next Steps

1. ✅ Review the new transparent logo and copy it to `public/images/logo-mark.png`
2. ✅ Replace placeholder project images with actual photos
3. ✅ Set up Paystack account and add test keys
4. ✅ Run the donations table migration in Neon
5. ✅ Test donations on `/en/donate` with Paystack test card
6. ✅ Verify contact form emails are being received at your admin email
7. ✅ When ready for production, switch to Paystack live keys

---

## Testing Checklist

- [ ] Logo displays without white background on all pages
- [ ] Motor Park project appears on Projects page (en + ig)
- [ ] Cancer Hospital project appears on Projects page (en + ig)
- [ ] Donate link visible in header navigation
- [ ] Donate page loads at `/en/donate` and `/ig/donate`
- [ ] Donation form accepts amount selection
- [ ] Paystack popup opens when submitting donation
- [ ] Test payment completes successfully
- [ ] Donation appears in `donations` table in database
- [ ] Contact form sends email to `ADMIN_NOTIFICATION_EMAIL`

---

**Questions or issues?** Check the inline code comments or reach out for clarification.
