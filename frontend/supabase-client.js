const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY

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