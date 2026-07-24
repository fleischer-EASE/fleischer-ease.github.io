# EASE Website Backlog

This file records the nine highest-impact website improvements identified in the July 2026 review. Reference an item by ID when asking for it to be implemented, for example: **"Implement EASE-03."**

## EASE-01 — Product-led LU 20 hero

**Priority:** P0  
**Status:** Done

Replace the generic logistics hero with a clear LU 20 value proposition, real field-use imagery, and a deliberate CTA hierarchy.

**Done when:**

- The LU 20 and its support for the back and arms are immediately clear.
- The primary CTA is demo booking.
- The secondary CTA leads to the workplace self-test or product details.
- German and English versions work on desktop and mobile.

## EASE-02 — Complete LU 20 product section

**Priority:** P0  
**Status:** Awaiting product information and materials

Create a sales-focused product section covering suitable applications, technical specifications, fit, operation, safety, availability, service, and commercial next steps.

**Information and materials needed to proceed:**

1. **Technical specifications**
   - Product weight
   - Assistance/support level for the arms and back
   - Battery runtime and charging time
   - Available sizes and adjustment range
   - Expected donning and removal time
   - Operating conditions and restrictions
   - Relevant mobility, noise, and comfort figures
2. **Suitable applications**
   - Typical tasks, such as lifting, carrying, picking, assembly, or overhead work
   - Target industries
   - Suitable load ranges and shift durations
   - Situations in which LU 20 should not be used
3. **Safety and product status**
   - Current CE and certification status
   - Relevant standards and completed tests
   - Current commercial availability
   - Expected delivery date and countries served
   - Claims that must be avoided or phrased carefully
4. **Commercial information**
   - Price, starting price, rental/pilot model, or confirmation that pricing should be request-only
   - Items and services included with the product
   - Warranty, maintenance, training, and onboarding
   - Demo and pilot process
   - Preferred conversion route: form, email, calendar, or phone
5. **Evidence**
   - Measured field-test results, including preliminary results if clearly labelled
   - Approved customer quotations
   - Number and duration of pilots
   - Permission to name customers and display their logos
   - Evidence supporting the claim that LU 20 is the only active exoskeleton supporting both arms and back
6. **Visual materials and usage rights**
   - Front, back, and side product views
   - LU 20 being worn during real work
   - Close-ups of the arm and back mechanisms
   - Putting-on and adjustment sequence
   - Product videos, renderings, diagrams, or brochures
   - Confirmation that EASE may publish the supplied material
7. **Languages**
   - Whether German and English should launch simultaneously
   - Existing approved English product terminology

Rough notes, brochures, datasheets, presentations, and unpolished source material are acceptable; the website copy can be developed from them.

**Current assumptions to confirm:**

- LU 20 actively supports both arms and back.
- It is intended for logistics and production workplaces.
- It has completed industrial field testing.
- Delivery is planned for 2026.

**Done when:**

- Buyers can understand what the LU 20 does and whether it fits their workplace.
- Key specifications, limitations, safety/certification status, delivery, service, and warranty are covered.
- Product imagery shows the device in use and from useful detail angles.
- Pricing or a clear request-a-quote route is provided.
- German and English content is available.

## EASE-03 — Move customer proof near the top

**Priority:** P0  
**Status:** Done

Surface field tests, paid pilots, awards, customer logos, quotations, and measurable outcomes directly after the hero.

**Done when:**

- A compact proof bar appears below the hero.
- At least one short customer case study is visible before general feature content.
- Performance and health claims are quantified, sourced, or carefully qualified.
- Customer names, quotations, and logos have publication approval.

## EASE-04 — Shorten and reorder the homepage

**Priority:** P1  
**Status:** Done

Restructure the homepage around the customer buying journey and reduce sections that delay product understanding.

**Target order:**

1. Hero
2. Customer proof
3. LU 20 benefits
4. Product specifications
5. Field-test case study
6. Self-test and demo CTA
7. FAQ
8. Team and partners

**Done when:**

- The roadmap is condensed or moved to an About page.
- Unnecessary full-viewport section heights are removed.
- Repeated content is consolidated.
- Important conversion content appears substantially earlier.

## EASE-05 — Build a real demo-booking funnel

**Priority:** P1  
**Status:** Implemented with email handoff; direct submission endpoint pending

Replace the mail-only demo journey with a short qualification and booking flow.

The bilingual qualification form, validation, privacy notice, success/error states, next-step explanation, privacy-safe conversion events, and structured email fallback are implemented. Direct in-page submission still requires a dedicated HubSpot demo-form ID or equivalent endpoint to be added to the forms' `data-endpoint` attributes. The existing HubSpot form is the multi-step workplace self-test and does not collect the required demo-booking fields, so it is intentionally not reused.

**Done when:**

- Visitors can provide company, workplace/task, employee count, contact details, and preferred timing.
- The page explains the next steps: assessment, workplace test, and tailored offer.
- Submission success, validation, privacy notice, and failure states are handled.
- Conversion events can be measured in a privacy-compliant way.

## EASE-06 — Align forms and privacy disclosures

**Priority:** P0  
**Status:** Done

Review the HubSpot self-test and all third-party resources against the privacy policy and consent approach.

The HubSpot self-test loads only after an explicit, informed click; a non-HubSpot email alternative is provided. The privacy policy covers the controller, purposes, data categories, legal bases, recipients, international transfers, the approved twelve-month retention period, withdrawal and data-subject rights. It also documents that EASE uses no cookies or visitor tracking and retains only data actively submitted through form fields or optional uploads. The external AOS dependency was removed. Martin Fleischer approved the wording, retention period, recipients, HubSpot processing arrangement and consent mechanism on July 24, 2026.

**Done when:**

- The privacy policy accurately describes HubSpot and other relevant third parties.
- External form loading and consent behavior follow the approved legal approach.
- Data purpose, retention, recipients, and user rights are described where required.
- The final wording and mechanism have been reviewed by the responsible legal/privacy owner.

## EASE-07 — Improve performance and motion accessibility

**Priority:** P1  
**Status:** Done

Reduce the homepage payload and ensure animations respect user preferences.

Responsive WebP sources, lazy loading, intrinsic image dimensions, an optimized MP4/WebM product video, a lightweight poster and `preload="none"` are implemented. The new referenced product images total roughly 54 KB at 1800 px and 23 KB at 900 px; the case-study variants are roughly 176 KB and 65 KB. The video fell from roughly 10.4 MB to about 0.54 MB (MP4) / 0.49 MB (WebM). Reduced-motion behavior disables smooth scrolling and bouncing and reduces transition durations; the partner carousel is slowed from 30 to 40 seconds but remains automatic following a later explicit design request.

Formal browser checks were completed on July 24, 2026. The cold-cache desktop profile recorded FCP/LCP of 0.24 seconds, a 0.42-second load event, zero layout shift and approximately 1.12 MB transferred. The throttled mobile profile used a 375 CSS-pixel viewport, 4× CPU slowdown, 150 ms latency, 1.6 Mbps download and 0.75 Mbps upload; it recorded FCP/LCP of 1.31 seconds, DOMContentLoaded at 1.32 seconds, the load event at 6.51 seconds, CLS of 0.006 and approximately 1.06 MB transferred. The desktop profile selected the 1800 px hero source and mobile selected the 900 px source. Neither profile downloaded the MP4/WebM during initial load. German and English pages had no failed requests, console warnings/errors or horizontal overflow.

**Done when:**

- Large images and video are resized and compressed into appropriate modern formats.
- Responsive image sources, lazy loading, and an effective video poster/loading strategy are used.
- `prefers-reduced-motion` disables or simplifies AOS, smooth scrolling, bouncing, pulsing, and the partner carousel.
- Performance is checked on desktop and a throttled mobile profile.

## EASE-08 — Accessibility, SEO, and copy-quality pass

**Priority:** P1  
**Status:** Done

Complete a focused quality pass covering semantics, keyboard use, search metadata, internationalization, and language consistency.

**Done when:**

- Pages include a skip link, appropriate landmarks, consistent headings, and visible `:focus-visible` styles.
- Interactive controls have adequate touch targets and accessible names.
- Video and meaningful images have suitable accessible alternatives.
- Metadata includes descriptions, canonical URLs, `hreflang`, social previews, and relevant structured data.
- German tone is consistent and known spelling/HTML errors are fixed in both languages.
- Language switches lead to equivalent translated content where available.

## EASE-09 — Put the whole team on the website

**Priority:** P1

**Status:** Done

Add every current team member to the team section on the website.

**Done when:**

- Every current team member is included with their name, role, and approved photo.
- The complete team is shown on both the German and English pages.
- The team section works well on desktop and mobile.
