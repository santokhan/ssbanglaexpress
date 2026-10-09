# Google sign-in

Google sign-in is available on the signup and sign-in pages. The browser loads Google Identity Services and sends its credential to the `signInWithGoogle` server action.

The server verifies the ID token against `NEXT_PUBLIC_GOOGLE_CLIENT_ID` and requires a verified email. It finds the user by Google ID, links the Google ID to an existing account with the same email, or creates a new account. A successful sign-in creates the app's normal session and redirects to `/profile`.

## Setup

Set `NEXT_PUBLIC_GOOGLE_CLIENT_ID` to a Google OAuth 2.0 Web client ID. Add the site's origins to the client's authorized JavaScript origins. The same ID is used in the browser and for server-side token verification. Google sign-in shows as unconfigured when the variable is missing.

Sessions use the HTTP-only `ssbangla_session` cookie and require `SESSION_SECRET`. See [email.md](email.md) for password recovery, which is separate from Google sign-in.
