
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
    // This function should be protected in production
    // Ensure only admins can run it
    
    // Create a Supabase client
    const supabaseUrl = Deno.env.get('SUPABASE_URL') as string
    const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') as string
    const supabase = createClient(supabaseUrl, supabaseKey)
    
    const instagramPosts = [
      {
        post_id: 'sample-1',
        permalink: 'https://www.instagram.com/p/placeholder1/',
        media_url: 'https://via.placeholder.com/500x500/0078B3/FFFFFF?text=LATUM+Event',
        caption: 'Join us for our upcoming Latin American Cultural Festival! 🎉 #LATUM #LatinAmerican #Munich',
        timestamp: new Date('2023-05-30T12:00:00+0000').toISOString()
      },
      {
        post_id: 'sample-2',
        permalink: 'https://www.instagram.com/p/placeholder2/',
        media_url: 'https://via.placeholder.com/500x500/0078B3/FFFFFF?text=Spanish+Workshop',
        caption: 'Spanish Language Workshop this Friday! All levels welcome. #SpanishClass #LATUM',
        timestamp: new Date('2023-05-25T15:30:00+0000').toISOString()
      },
      {
        post_id: 'sample-3',
        permalink: 'https://www.instagram.com/p/placeholder3/',
        media_url: 'https://via.placeholder.com/500x500/0078B3/FFFFFF?text=Salsa+Night',
        caption: 'Last night\'s salsa dancing event was a huge success! Thanks to everyone who joined! #SalsaDancing #LatinNight',
        timestamp: new Date('2023-05-20T22:00:00+0000').toISOString()
      },
      {
        post_id: 'sample-4',
        permalink: 'https://www.instagram.com/p/placeholder4/',
        media_url: 'https://via.placeholder.com/500x500/0078B3/FFFFFF?text=Film+Festival',
        caption: 'Latin American Film Festival coming next month! Stay tuned for the full program. #FilmFestival #LatinCinema',
        timestamp: new Date('2023-05-15T14:00:00+0000').toISOString()
      }
    ];
    
    const linkedinPosts = [
      {
        post_id: 'sample-1',
        url: 'https://www.linkedin.com/company/latum-ev/posts/',
        title: 'New Partnership Announcement',
        summary: 'We\'re excited to announce our new partnership with TUM International Office to better support Latin American students.',
        published_date: new Date('2023-06-01T09:00:00+0000').toISOString()
      },
      {
        post_id: 'sample-2',
        url: 'https://www.linkedin.com/company/latum-ev/posts/',
        title: 'Successful Networking Event',
        summary: 'Thank you to all the professionals and students who attended our Latin American Professionals networking night!',
        published_date: new Date('2023-05-27T14:00:00+0000').toISOString()
      },
      {
        post_id: 'sample-3',
        url: 'https://www.linkedin.com/company/latum-ev/posts/',
        title: 'LATUM Scholarship Program',
        summary: 'Learn about our new scholarship program designed to support Latin American students pursuing engineering degrees at TUM.',
        published_date: new Date('2023-05-20T10:30:00+0000').toISOString()
      }
    ];
    
    // Clear existing sample data first
    await supabase
      .from('instagram_posts')
      .delete()
      .eq('post_id', 'sample-1');
      
    await supabase
      .from('linkedin_posts')
      .delete()
      .eq('post_id', 'sample-1');
    
    // Insert Instagram posts
    const { error: igError } = await supabase
      .from('instagram_posts')
      .insert(instagramPosts);
      
    if (igError) throw igError;
    
    // Insert LinkedIn posts
    const { error: liError } = await supabase
      .from('linkedin_posts')
      .insert(linkedinPosts);
      
    if (liError) throw liError;

    return new Response(
      JSON.stringify({ 
        success: true, 
        message: 'Sample posts seeded successfully',
        instagramCount: instagramPosts.length,
        linkedinCount: linkedinPosts.length
      }),
      { 
        headers: { 
          ...corsHeaders,
          'Content-Type': 'application/json' 
        },
        status: 200 
      }
    )
  } catch (error) {
    console.error('Error seeding posts:', error)
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
