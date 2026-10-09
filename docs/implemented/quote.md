# Quote and contact requests

The quote form submits shipping, sourcing, or manufacturing requests through a server action. The action trims and length-checks fields, validates the type-specific required numbers and email, and requires consent before saving a request in the database. Successful submissions receive an `SSB-YYYYMMDD-XXXXXX` reference.

The contact form similarly validates and saves messages, returning an `SSB-C-XXXXXXXX` reference. Both actions return a clear failure result if the database write fails.

These forms store requests for follow-up; submitting one does not automatically calculate or send a price. See the `QuoteRequest` and `ContactMessage` models in `prisma/schema.prisma` for stored fields.
