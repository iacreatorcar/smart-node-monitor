import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const SUPABASE_URL = 'https://jmkbpegdfuqxyyfpcoto.supabase.co'
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Impta2JwZWdkZnVxeHl5ZnBjb3RvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODI3MzczODAsImV4cCI6MjA5ODMxMzM4MH0.yHyQfukFJ3Y5BWwhVjKPBxK5jANoIFJ6nsDEPXqHR_o'

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY)

export function subscribeToSensorData(callback) {
    supabase
        .channel('sensor_data')
        .on('postgres_changes', {
            event: 'INSERT',
            schema: 'public',
            table: 'sensor_data',
        }, (payload) => callback(payload.new))
        .subscribe()
}
