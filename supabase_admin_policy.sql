-- Jalankan ini di Supabase SQL Editor agar Admin bisa melakukan update data
CREATE POLICY "Allow update desa_info" ON desa_info FOR UPDATE USING (true);
CREATE POLICY "Allow update aparatur"  ON aparatur  FOR UPDATE USING (true);
CREATE POLICY "Allow insert aparatur"  ON aparatur  FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow delete aparatur"  ON aparatur  FOR DELETE USING (true);
