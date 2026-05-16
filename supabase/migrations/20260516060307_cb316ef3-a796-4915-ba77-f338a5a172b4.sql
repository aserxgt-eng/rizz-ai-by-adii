INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
  'app-releases',
  'app-releases',
  true,
  524288000,
  ARRAY['application/vnd.android.package-archive','application/octet-stream','application/zip']
)
ON CONFLICT (id) DO UPDATE SET
  public = EXCLUDED.public,
  file_size_limit = EXCLUDED.file_size_limit,
  allowed_mime_types = EXCLUDED.allowed_mime_types;

CREATE POLICY "Public can read app releases"
ON storage.objects FOR SELECT
USING (bucket_id = 'app-releases');

CREATE POLICY "Anyone can upload app releases"
ON storage.objects FOR INSERT
WITH CHECK (bucket_id = 'app-releases');

CREATE POLICY "Anyone can update app releases"
ON storage.objects FOR UPDATE
USING (bucket_id = 'app-releases');

CREATE POLICY "Anyone can delete app releases"
ON storage.objects FOR DELETE
USING (bucket_id = 'app-releases');