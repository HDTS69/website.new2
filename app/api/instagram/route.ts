import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

// For static exports, we need to explicitly set these
export const dynamic = 'force-static';
export const revalidate = false;

export async function GET() {
  try {
    // For static exports, we'll read from the pre-generated JSON file
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
    console.error('Error fetching Instagram feed:', error);
    return NextResponse.json(
      { error: 'Failed to fetch Instagram feed' },
      { status: 500 }
    );
  }
} 