// Le tue chiavi verranno da .env in produzione
const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL || 'https://jmkbpegdfuqxyyfpcoto.supabase.co'
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Impta2JwZWdkZnVxeHl5ZnBjb3RvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODI3MzczODAsImV4cCI6MjA5ODMxMzM4MH0.yHyQfukFJ3Y5BWwhVjKPBxK5jANoIFJ6nsDEPXqHR_o'

import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY)

// Test connessione
export async function testConnection() {
    try {
        const { data, error } = await supabase
            .from('sensor_data')
            .select('count')
            .limit(1)
        
        if (error) throw error
        console.log('✅ Supabase connesso!')
        return true
    } catch (error) {
        console.error('❌ Errore connessione Supabase:', error)
        return false
    }
}