
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.7.1";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabaseUrl = Deno.env.get('SUPABASE_URL') as string;
    const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') as string;
    const supabase = createClient(supabaseUrl, supabaseKey);
    
    // Initialize result object
    const result = {
      success: true,
      instagram: { status: 'skipped', message: 'No API credentials' },
      linkedin: { status: 'skipped', message: 'No API credentials' }
    };

    // Check for Instagram credentials
    const instagramToken = Deno.env.get('INSTAGRAM_TOKEN');
    if (instagramToken) {
      try {
        console.log('Syncing Instagram posts...');
        // You would make actual Graph API calls here
        // For now, we'll just report success
        result.instagram = { 
          status: 'success', 
          message: 'Would sync Instagram posts using Graph API (placeholder)'
        };
      } catch (error) {
        console.error('Instagram sync error:', error);
        result.instagram = { 
          status: 'error', 
          message: error.message 
        };
      }
    }

    // Check for LinkedIn credentials
    const linkedinClientId = Deno.env.get('LINKEDIN_CLIENT_ID');
    const linkedinClientSecret = Deno.env.get('LINKEDIN_CLIENT_SECRET');
    
    if (linkedinClientId && linkedinClientSecret) {
      try {
        console.log('Syncing LinkedIn posts...');
        // You would make actual LinkedIn API calls here
        // For now, we'll just report success
        result.linkedin = { 
          status: 'success', 
          message: 'Would sync LinkedIn posts using their API (placeholder)'
        };
      } catch (error) {
        console.error('LinkedIn sync error:', error);
        result.linkedin = { 
          status: 'error', 
          message: error.message 
        };
      }
    }

    // For demonstration, seed some sample posts if tables are empty
    const { count: instagramCount } = await supabase
      .from('instagram_posts')
      .select('*', { count: 'exact', head: true });
      
    const { count: linkedinCount } = await supabase
      .from('linkedin_posts')
      .select('*', { count: 'exact', head: true });

    if (instagramCount === 0 || linkedinCount === 0) {
      console.log('Tables empty, seeding sample posts...');
      
      // Call the seed function
      await supabase.functions.invoke('seed-social-posts');
    }

    return new Response(
      JSON.stringify(result),
      { 
        headers: { 
          ...corsHeaders,
          'Content-Type': 'application/json' 
        },
        status: 200 
      }
    );
  } catch (error) {
    console.error('Error in cron sync:', error);
    return new Response(
      JSON.stringify({ error: error.message }),
      { 
        headers: { 
          ...corsHeaders,
          'Content-Type': 'application/json' 
        },
        status: 500 
      }
    );
  }
});
