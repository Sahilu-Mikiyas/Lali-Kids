-- Trigger functions run automatically; nobody needs to call them through the API.
revoke execute on function public.handle_new_user() from public, anon, authenticated;
revoke execute on function public.award_star() from public, anon, authenticated;

-- Only the website's server (secret key) checks subscriptions.
revoke execute on function public.has_active_subscription(uuid) from public, anon, authenticated;
grant execute on function public.has_active_subscription(uuid) to service_role;

-- is_admin() stays callable: row-level security policies call it as the reading user.
-- It only ever reveals whether the caller themself is an admin.
