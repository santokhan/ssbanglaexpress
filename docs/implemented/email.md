# Email and password recovery

Password recovery sends a one-time link through Gmail SMTP. The forgot-password action returns the same success response for unknown email addresses and Google-only accounts, so the form does not reveal which addresses have password accounts.

For an account with a password, the app stores a SHA-256 digest of a random token, replaces any earlier reset token, and emails the original token in a link. The link expires after 30 minutes. On reset, the app hashes the new password, consumes the token once, and revokes the user's active sessions.

## Setup

Set `SMTP_USER` and `SMTP_APP_PASSWORD` in the server environment. `SMTP_USER` defaults to the configured support mailbox in `lib/email.ts`; use a Gmail app password for SMTP. Reset links are built from the request origin and require HTTPS outside localhost.

The reset token is never stored in plaintext. Passwords must be 8–72 bytes. This email setup currently covers password-reset messages.
