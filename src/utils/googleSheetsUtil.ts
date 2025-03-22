
/**
 * Utility for fetching team member data from Supabase
 * 
 * This file originally used mock Google Sheets data, but now uses Supabase directly
 */

import { supabase } from '@/integrations/supabase/client';

export interface TeamMember {
  name: string;
  role: string;
  country: string;
  bio: string;
  image: string | null;
}

export interface AlumniMember {
  name: string;
  position: string;
  year: string;
  image: string | null;
}

export const fetchTeamMembersFromSheet = async (): Promise<TeamMember[]> => {
  try {
    const { data, error } = await supabase
      .from('team_members')
      .select('name, role, country, bio, image')
      .order('created_at');
      
    if (error) {
      console.error('Error fetching team members:', error);
      throw error;
    }
    
    return data || [];
  } catch (error) {
    console.error('Error fetching team members from Supabase:', error);
    throw error;
  }
};

export const fetchAlumniFromSheet = async (): Promise<AlumniMember[]> => {
  try {
    const { data, error } = await supabase
      .from('alumni_members')
      .select('name, position, year, image')
      .order('created_at');
      
    if (error) {
      console.error('Error fetching alumni:', error);
      throw error;
    }
    
    return data || [];
  } catch (error) {
    console.error('Error fetching alumni from Supabase:', error);
    throw error;
  }
};

/**
 * Note: The file still has the original name "googleSheetsUtil" for backward compatibility,
 * but now uses Supabase database to fetch team and alumni data instead of Google Sheets.
 */
