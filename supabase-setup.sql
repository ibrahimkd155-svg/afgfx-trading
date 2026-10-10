-- AFGFX Supabase schema reference.
-- Your project was previously initialized. Run only if tables/policies are missing.
create table if not exists public.admin_users (
  user_id uuid primary key references auth.users(id) on delete cascade,
  created_at timestamptz not null default now()
);
create table if not exists public.posts (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  body text not null default '',
  category text not null check (category in ('analysis','education','insights','community')),
  status text not null default 'draft' check (status in ('draft','published')),
  image_url text,
  created_at timestamptz not null default now()
);
alter table public.admin_users enable row level security;
alter table public.posts enable row level security;
drop policy if exists "Approved admins can read admin list" on public.admin_users;
create policy "Approved admins can read admin list" on public.admin_users for select to authenticated
using (user_id = auth.uid());
drop policy if exists "Public read published posts" on public.posts;
create policy "Public read published posts" on public.posts for select to anon, authenticated
using (status = 'published' or exists (select 1 from public.admin_users where user_id = auth.uid()));
drop policy if exists "Approved admins insert posts" on public.posts;
create policy "Approved admins insert posts" on public.posts for insert to authenticated
with check (exists (select 1 from public.admin_users where user_id = auth.uid()));
drop policy if exists "Approved admins update posts" on public.posts;
create policy "Approved admins update posts" on public.posts for update to authenticated
using (exists (select 1 from public.admin_users where user_id = auth.uid()))
with check (exists (select 1 from public.admin_users where user_id = auth.uid()));
drop policy if exists "Approved admins delete posts" on public.posts;
create policy "Approved admins delete posts" on public.posts for delete to authenticated
using (exists (select 1 from public.admin_users where user_id = auth.uid()));
insert into storage.buckets (id, name, public) values ('afgfx-content','afgfx-content',true)
on conflict (id) do update set public = true;
drop policy if exists "Public can view AFGFX content" on storage.objects;
create policy "Public can view AFGFX content" on storage.objects for select to anon, authenticated
using (bucket_id = 'afgfx-content');
drop policy if exists "Approved admins upload AFGFX content" on storage.objects;
create policy "Approved admins upload AFGFX content" on storage.objects for insert to authenticated
with check (bucket_id = 'afgfx-content' and exists (select 1 from public.admin_users where user_id = auth.uid()));
drop policy if exists "Approved admins update AFGFX content" on storage.objects;
create policy "Approved admins update AFGFX content" on storage.objects for update to authenticated
using (bucket_id = 'afgfx-content' and exists (select 1 from public.admin_users where user_id = auth.uid()))
with check (bucket_id = 'afgfx-content' and exists (select 1 from public.admin_users where user_id = auth.uid()));
drop policy if exists "Approved admins delete AFGFX content" on storage.objects;
create policy "Approved admins delete AFGFX content" on storage.objects for delete to authenticated
using (bucket_id = 'afgfx-content' and exists (select 1 from public.admin_users where user_id = auth.uid()));
