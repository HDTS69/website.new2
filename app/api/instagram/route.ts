import { NextResponse } from 'next/server';

// Instagram Graph API endpoint for media
const INSTAGRAM_API_URL = 'https://graph.instagram.com';

// Mock data for fallback or development
const MOCK_INSTAGRAM_POSTS = [
  {
    id: 'mock1',
    media_url: 'https://via.placeholder.com/1080x1080/1CD4A7/ffffff?text=Instagram+Post+1',
    permalink: 'https://www.instagram.com/hdtradeservices/',
  },
  {
    id: 'mock2',
    media_url: 'https://via.placeholder.com/1080x1080/1CD4A7/ffffff?text=Instagram+Post+2',
    permalink: 'https://www.instagram.com/hdtradeservices/',
  },
  {
    id: 'mock3',
    media_url: 'https://via.placeholder.com/1080x1080/1CD4A7/ffffff?text=Instagram+Post+3',
    permalink: 'https://www.instagram.com/hdtradeservices/',
  },
];

export async function GET() {
  try {
    // Get environment variables
    const accessToken = process.env.NEXT_PUBLIC_INSTAGRAM_ACCESS_TOKEN;
    const userId = process.env.NEXT_PUBLIC_INSTAGRAM_USER_ID;
    
    // Check if we have the required credentials
    if (!accessToken || !userId) {
      console.warn('Instagram API credentials not found, using mock data');
      return NextResponse.json({ data: MOCK_INSTAGRAM_POSTS });
    }
    
    // Fetch media from Instagram Graph API
    const response = await fetch(
      `${INSTAGRAM_API_URL}/${userId}/media?fields=id,media_url,permalink&access_token=${accessToken}`,
      { next: { revalidate: 3600 } } // Cache for 1 hour
    );
    
    if (!response.ok) {
      throw new Error(`Instagram API responded with status: ${response.status}`);
    }
    
    const data = await response.json();
    
    // Return only the first few posts
    return NextResponse.json({
      data: data.data?.slice(0, 3) || MOCK_INSTAGRAM_POSTS
    });
  } catch (error) {
    console.error('Error fetching Instagram posts:', error);
    
    // Return mock data as fallback
    return NextResponse.json({ 
      data: MOCK_INSTAGRAM_POSTS,
      error: 'Failed to fetch Instagram posts'
    });
  }
} 