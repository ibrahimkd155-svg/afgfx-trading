# AFGFX Complete Package

## What's included
- Preserved AFGFX homepage design, logo, CSS, JavaScript and sitemap
- Four separate content pages: `analysis.html`, `education.html`, `insights.html`, `community.html`
- `admin.html` for Supabase email/password login and content management
- Supabase configuration using the project's URL and publishable key
- `assistant-photo.jpeg` for the AFGFX Assistant avatar

## Deploy safely
1. Keep a backup of your current GitHub repository before replacing anything.
2. Upload the contents of this ZIP to the repository root (not the ZIP file itself).
3. Confirm `index.html`, `style.css`, `script.js`, `logo.jpeg`, `sitemap.xml`, `supabase-config.js`, `content-style.css`, `content.js`, the four content pages, `admin.html`, and `assistant-photo.jpeg` are at the root.
4. Open the deployed site and test the homepage, each content page, and `/admin.html`.

## Supabase
- The browser config includes only the publishable `sb_publishable_...` key.
- NEVER put an `sb_secret_...` or `service_role` key into frontend files.
- `supabase-setup.sql` is provided as a reference. The project was already initialized, so don't run it blindly if policies/tables already exist.
- Admin login works only if the account is in `public.admin_users`. Your existing admin UID should already be there.
- Confirm the `posts` table has columns: `id`, `title`, `body`, `category`, `status`, `image_url`, `created_at`.
- Confirm the Storage bucket `afgfx-content` exists and its policies permit approved admins to upload.

## Important checks
- This package is assembled from the files supplied in chat, but it has not been deployed or tested against the live Supabase project from this environment. Test after deployment before deleting any backups.
- If Supabase says a database field or policy is missing, don't delete tables; send the exact error message for troubleshooting.
