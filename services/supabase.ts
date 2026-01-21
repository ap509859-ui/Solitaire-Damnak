
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.39.7';

const supabaseUrl = 'https://lrhauniyhqjmfjhitjil.supabase.co';
const supabaseKey = 'sb_publishable_r1xPHKuauAndw4mWyVl5gw_cpqJ0wCz';

export const supabase = createClient(supabaseUrl, supabaseKey);
