
/**
 * Utility for fetching team member data from Google Sheets
 * 
 * In a real application, this would use the Google Sheets API
 * Note: For a production app, this should be done server-side with a Google API key
 * in an edge function or similar to protect your credentials
 */

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
    // In a real implementation, you would call the Google Sheets API here
    // For now, we'll return dummy data with a simulated delay to mimic API call
    return new Promise((resolve) => {
      setTimeout(() => {
        // This is placeholder data - in a real app you'd fetch from Google Sheets
        const dummyTeamMembers: TeamMember[] = [
          {
            name: 'Sofia Rodriguez',
            role: 'President',
            country: 'Mexico',
            bio: 'Ph.D. candidate in Computer Science with a passion for creating inclusive communities.',
            image: null
          },
          {
            name: 'Carlos Mendoza',
            role: 'Vice President',
            country: 'Colombia',
            bio: 'Studying Mechanical Engineering and working to connect Latin American students across Munich.',
            image: null
          },
          {
            name: 'Valentina Silva',
            role: 'Events Coordinator',
            country: 'Brazil',
            bio: 'Master\'s student in Business Administration with experience in organizing cultural events.',
            image: null
          },
          {
            name: 'Gabriel Torres',
            role: 'Treasurer',
            country: 'Argentina',
            bio: 'Economics student with a background in financial management for student organizations.',
            image: null
          },
          {
            name: 'Luciana Vargas',
            role: 'Communications Director',
            country: 'Peru',
            bio: 'Studying Media Communications and passionate about telling stories that bridge cultures.',
            image: null
          },
          {
            name: 'Mateo Herrera',
            role: 'Academic Coordinator',
            country: 'Chile',
            bio: 'Ph.D. student in Physics focused on creating support systems for international students.',
            image: null
          },
          {
            name: 'Isabella Ortiz',
            role: 'Cultural Affairs Director',
            country: 'Ecuador',
            bio: 'Anthropology student specializing in Latin American traditions and cultural exchange programs.',
            image: null
          },
          {
            name: 'Diego Morales',
            role: 'Social Media Manager',
            country: 'Costa Rica',
            bio: 'Digital Media student with expertise in content creation and community engagement strategies.',
            image: null
          }
        ];
        resolve(dummyTeamMembers);
      }, 1000);
    });
  } catch (error) {
    console.error('Error fetching team members from Google Sheets:', error);
    throw error;
  }
};

export const fetchAlumniFromSheet = async (): Promise<AlumniMember[]> => {
  try {
    // In a real implementation, you would call the Google Sheets API here
    // For now, we'll return dummy data with a simulated delay to mimic API call
    return new Promise((resolve) => {
      setTimeout(() => {
        // This is placeholder data - in a real app you'd fetch from Google Sheets
        const dummyAlumni: AlumniMember[] = [
          {
            name: 'Miguel Sanchez',
            position: 'Former President',
            year: '2023',
            image: null
          },
          {
            name: 'Ana Cabrera',
            position: 'Former Vice President',
            year: '2023',
            image: null
          },
          {
            name: 'Rafael Jimenez',
            position: 'Former Treasurer',
            year: '2023',
            image: null
          },
          {
            name: 'Lucia Rodriguez',
            position: 'Former Events Coordinator',
            year: '2023',
            image: null
          },
          {
            name: 'Pablo Navarro',
            position: 'Former Communications Director',
            year: '2023',
            image: null
          },
          {
            name: 'Camila Reyes',
            position: 'Former Academic Coordinator',
            year: '2023',
            image: null
          }
        ];
        resolve(dummyAlumni);
      }, 1000);
    });
  } catch (error) {
    console.error('Error fetching alumni from Google Sheets:', error);
    throw error;
  }
};

/**
 * Instructions for connecting to real Google Sheets:
 * 
 * 1. Create a Google Sheet with separate sheets for:
 *    - Team members: columns for name, role, country, bio, image
 *    - Alumni: columns for name, position, year, image
 * 2. Make the sheet public or share it with appropriate permissions
 * 3. Set up a Google Cloud project and enable the Google Sheets API
 * 4. Create an API key or service account credentials
 * 5. For a production application, use these credentials in a server-side function
 *    (like a Supabase Edge Function) to avoid exposing your API key in client-side code
 * 
 * For a full implementation, you'd replace the dummy data with an actual API call:
 * 
 * const SHEET_ID = 'your-google-sheet-id';
 * const API_KEY = 'your-api-key'; // Better to keep in server-side environment variable
 * const TEAM_RANGE = 'TeamMembers!A2:E20'; // Adjust as needed
 * const ALUMNI_RANGE = 'Alumni!A2:D20'; // Adjust as needed
 * 
 * // For team members
 * const response = await fetch(
 *   `https://sheets.googleapis.com/v4/spreadsheets/${SHEET_ID}/values/${TEAM_RANGE}?key=${API_KEY}`
 * );
 * const data = await response.json();
 * 
 * // Map the response data to your TeamMember interface
 * const teamMembers = data.values.map(row => ({
 *   name: row[0],
 *   role: row[1],
 *   country: row[2],
 *   bio: row[3],
 *   image: row[4] || null
 * }));
 * 
 * // Similar process for alumni
 * const alumniResponse = await fetch(
 *   `https://sheets.googleapis.com/v4/spreadsheets/${SHEET_ID}/values/${ALUMNI_RANGE}?key=${API_KEY}`
 * );
 * const alumniData = await alumniResponse.json();
 * 
 * const alumni = alumniData.values.map(row => ({
 *   name: row[0],
 *   position: row[1],
 *   year: row[2],
 *   image: row[3] || null
 * }));
 */
