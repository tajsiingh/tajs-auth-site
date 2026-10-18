# Taj's Self-Hosted Services — OAuth information website

Public information pages for `https://auth.tajs.uk`, intended for Google OAuth branding verification. This is an independent, zero-dependency Node web service (no authentication, databases, analytics, cookies, or application API).

**Important:** Review the policy descriptions against your actual applications and practices before submitting for Google verification. Do not publish statements that aren't true for your deployment. Domain verification in Google Search Console is still required.

## Run locally

```bash
npm start
# http://localhost:3000
```

Routes: `/`, `/privacy`, `/terms`, `/health`.

## Dokploy (native application, Railpack)

1. Create a new **Application**, not a Compose/database service.
2. Select the GitHub repository and `main` branch.
3. Choose **Railpack** as build type (Node via `package.json`).
4. Build command: leave default/empty. Start command: `npm start` (or autodetect).
5. Set `PORT=3000` (optional; defaults to 3000). Configure app port `3000` in Dokploy.
6. Deploy; test `http://VM101_LAN_IP:EXPOSED_PORT/` if you choose to publish a port, or use Dokploy's internal service address via Pangolin/Newt. You may need to explicitly publish a port through Dokploy's Advanced/Ports settings; not all application types expose a host port by default.
7. In Pangolin, create an HTTP resource for `auth.tajs.uk` pointing to the correct Dokploy-accessible HTTP endpoint. **Do not enable Pangolin authentication on this informational site.** Enable HTTPS on the public resource.
8. Verify `https://auth.tajs.uk/`, `/privacy` and `/terms` load in an incognito browser without sign-in.

No secrets are required. Do not add OAuth client IDs or secrets to this public repo/site.

## Google Auth Platform Branding

- App name: `Taj's Self-Hosted Services`
- Homepage: `https://auth.tajs.uk/`
- Privacy policy: `https://auth.tajs.uk/privacy`
- Terms: `https://auth.tajs.uk/terms`
- Authorized domain: `tajs.uk`
- Verify `tajs.uk` ownership in Google Search Console using the Google account/project used for OAuth.
- After accessible pages and ownership are verified, wait for Google's ownership propagation and request re-verification. Google may separately require sensitive-scope verification.

## Hosting notes

- Don't add Pangolin identity login to the site: Google reviewers need anonymous access.
- Keep Immich, Musubi and database systems separately protected.
- Shared Google OAuth project branding will appear across OAuth clients in that project.
- Static content contains an operator contact address; review it before publication.
