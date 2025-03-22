import { serve } from 'https://deno.land/std@0.168.0/http/server.ts'
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.7.1'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders })
  }

  try {
    // This function should be protected
    // Check for auth header in a production environment
    const authHeader = req.headers.get('Authorization');
    
    if (!authHeader && Deno.env.get('SUPABASE_ENV') === 'production') {
      throw new Error('Unauthorized request');
    }
    
    // Parse request body
    const requestData = await req.json();
    const { source } = requestData;
    
    // Create a Supabase client
    const supabaseUrl = Deno.env.get('SUPABASE_URL') as string
    const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') as string
    const supabase = createClient(supabaseUrl, supabaseKey)
    
    let result = { success: false, message: 'No action taken' }
    
    // Sync Instagram posts
    if (source === 'instagram') {
      const instagramToken = Deno.env.get('INSTAGRAM_TOKEN');
      const instagramUserId = Deno.env.get('INSTAGRAM_USER_ID');
      
      if (!instagramToken || !instagramUserId) {
        throw new Error('Instagram credentials not configured');
      }
      
      try {
        // Fetch media from Instagram Graph API
        const response = await fetch(
          `https://graph.instagram.com/${instagramUserId}/media?fields=id,caption,media_type,media_url,permalink,timestamp&access_token=${instagramToken}`,
          {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
            },
          }
        );

        const data = await response.json();

        if (!response.ok) {
          throw new Error(`Instagram API error: ${data.error?.message || 'Unknown error'}`);
        }

        if (data && data.data && data.data.length > 0) {
          // Process posts and store in database
          const instagramPosts = data.data.map((post: any) => ({
            id: post.id,
            permalink: post.permalink,
            media_url: post.media_url,
            caption: post.caption || '',
            timestamp: post.timestamp,
            media_type: post.media_type,
          }));

          // First, clear existing posts
          await supabase.from('instagram_posts').delete().neq('id', '0');

          // Then insert new posts
          const { error: insertError } = await supabase.from('instagram_posts').insert(instagramPosts);

          if (insertError) {
            throw insertError;
          }

          result = {
            success: true,
            message: `Synced ${instagramPosts.length} Instagram posts successfully`,
          };
        } else {
          result = {
            success: true,
            message: 'No Instagram posts found to sync',
          };
        }
      } catch (error) {
        console.error('Error syncing Instagram posts:', error);
        result = {
          success: false,
          message: `Error syncing Instagram posts: ${error.message}`,
        };
      }
    }
    
    // Sync LinkedIn posts
    else if (source === 'linkedin') {
      const linkedinClientId = Deno.env.get('LINKEDIN_CLIENT_ID')
      const linkedinClientSecret = Deno.env.get('LINKEDIN_CLIENT_SECRET')
      
      if (!linkedinClientId || !linkedinClientSecret) {
        throw new Error('LinkedIn credentials not configured')
      }
      
      console.log('Would fetch LinkedIn posts using credentials');
      
      result = { 
        success: true, 
        message: 'LinkedIn sync would happen here with real API credentials',
        note: 'This is a placeholder for actual LinkedIn API integration'
      }
    }
    
    else {
      throw new Error('Invalid source specified')
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
    )
  } catch (error) {
    console.error('Error syncing social media:', error)
    return new Response(
      JSON.stringify({ error: error.message }),
      { 
        headers: { 
          ...corsHeaders,
          'Content-Type': 'application/json' 
        },
        status: 500 
      }
    )
  }
})
