import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

// Make this route dynamic to fetch fresh data from Instagram
export const dynamic = 'force-dynamic';
export const revalidate = 3600; // Revalidate every hour

export async function GET() {
  try {
    // Get Instagram credentials from environment variables
    const instagramUserId = process.env.NEXT_PUBLIC_INSTAGRAM_USER_ID;
    const instagramToken = process.env.NEXT_PUBLIC_INSTAGRAM_ACCESS_TOKEN;
    
    // Check if we have the required credentials
    if (!instagramUserId || !instagramToken) {
      console.error('Instagram credentials not found in environment variables');
      return fallbackToStaticData();
    }
    
    // Fetch data from Instagram API
    const response = await fetch(
      `https://graph.facebook.com/v12.0/${instagramUserId}/media?fields=id,media_url,permalink&access_token=${instagramToken}`,
      { next: { revalidate: 3600 } } // Cache for 1 hour
    );
    
    if (!response.ok) {
      console.error('Failed to fetch from Instagram API:', response.statusText);
      return fallbackToStaticData();
    }
    
    const data = await response.json();
    
    // Check if we got valid data
    if (!data.data || !Array.isArray(data.data) || data.data.length === 0) {
      console.error('Invalid data received from Instagram API');
      return fallbackToStaticData();
    }
    
    // Return the Instagram data
    return NextResponse.json(data);
  } catch (error) {
    console.error('Error fetching Instagram feed:', error);
    return fallbackToStaticData();
  }
}

// Helper function to fall back to static data if API fetch fails
async function fallbackToStaticData() {
  try {
    // Read from the pre-generated JSON file
    const dataPath = path.join(process.cwd(), 'public', 'data', 'instagram.json');
    
    // Check if the file exists
    if (!fs.existsSync(dataPath)) {
      return NextResponse.json(
        { error: 'Instagram data not found' },
        { status: 404 }
      );
    }
    
    // Read the file
    const rawData = fs.readFileSync(dataPath, 'utf8');
    const data = JSON.parse(rawData);
    
    return NextResponse.json(data);
  } catch (error) {
    console.error('Error reading static Instagram data:', error);
    return NextResponse.json(
      { error: 'Failed to fetch Instagram feed' },
      { status: 500 }
    );
  }
} 