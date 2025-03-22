
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
    // Create a Supabase client
    const supabaseUrl = Deno.env.get('SUPABASE_URL') as string
    const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') as string
    const supabase = createClient(supabaseUrl, supabaseKey)

    // Fetch posts from our database (populated by the sync process)
    const { data: posts, error } = await supabase
      .from('instagram_posts')
      .select('*')
      .order('timestamp', { ascending: false })
      .limit(10)

    if (error) throw error

    // If we don't have posts in the database, check if we can fetch directly
    // This is a fallback for development and shouldn't be necessary in production
    // when the sync cron job is running properly
    if (!posts || posts.length === 0) {
      console.log('No posts found in database, trying to fetch directly');
      
      const instagramToken = Deno.env.get('INSTAGRAM_TOKEN');
      const instagramUserId = Deno.env.get('INSTAGRAM_USER_ID');
      
      if (instagramToken && instagramUserId) {
        try {
          // Make a direct call to Instagram Graph API
          const response = await fetch(
            `https://graph.instagram.com/${instagramUserId}/media?fields=id,caption,media_type,media_url,permalink,timestamp&access_token=${instagramToken}`
          );
          
          if (response.ok) {
            const data = await response.json();
            
            if (data && data.data && data.data.length > 0) {
              return new Response(
                JSON.stringify({ posts: data.data }),
                { 
                  headers: { 
                    ...corsHeaders,
                    'Content-Type': 'application/json' 
                  },
                  status: 200 
                }
              );
            }
          }
        } catch (directError) {
          console.error('Error fetching directly from Instagram:', directError);
          // Continue to return empty posts array
        }
      }
    }

    return new Response(
      JSON.stringify({ posts: posts || [] }),
      { 
        headers: { 
          ...corsHeaders,
          'Content-Type': 'application/json' 
        },
        status: 200 
      }
    )
  } catch (error) {
    console.error('Error fetching Instagram posts:', error)
    return new Response(
      JSON.stringify({ error: error.message, posts: [] }),
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
