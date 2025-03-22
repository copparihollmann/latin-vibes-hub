
-- Enable pg_cron and pg_net for scheduled tasks
CREATE EXTENSION IF NOT EXISTS pg_cron;
CREATE EXTENSION IF NOT EXISTS pg_net;

-- Schedule the social media sync to run daily at 2 AM UTC
SELECT cron.schedule(
  'daily-social-media-sync',    -- unique job name
  '0 2 * * *',                  -- cron schedule (daily at 2 AM)
  $$
  SELECT net.http_post(
    url:='https://piywbbjqrprkznpqbthd.supabase.co/functions/v1/cron-sync-social-media',
    headers:='{"Content-Type": "application/json", "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBpeXdiYmpxcnBya3pucHFidGhkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDI2MzgxMzYsImV4cCI6MjA1ODIxNDEzNn0.qPPIWi626NEyp4aslEQ-ZIEtPZwoCGyVmehYuamGhyU"}'::jsonb,
    body:='{}'::jsonb
  ) as request_id;
  $$
);
