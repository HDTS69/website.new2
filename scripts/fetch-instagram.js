// Script to pre-fetch Instagram data during build time
const fs = require('fs');
const path = require('path');
const https = require('https');

require('dotenv').config();

const INSTAGRAM_USER_ID = process.env.INSTAGRAM_USER_ID;
const INSTAGRAM_ACCESS_TOKEN = process.env.INSTAGRAM_ACCESS_TOKEN;
const OUTPUT_DIR = path.join(__dirname, '../public/data');
const OUTPUT_FILE = path.join(OUTPUT_DIR, 'instagram.json');

// Ensure the output directory exists
if (!fs.existsSync(OUTPUT_DIR)) {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });
}

// Function to fetch Instagram data
async function fetchInstagramData() {
  return new Promise((resolve, reject) => {
    if (!INSTAGRAM_USER_ID || !INSTAGRAM_ACCESS_TOKEN) {
      console.warn('Instagram credentials not found. Using placeholder data.');
      resolve({
        data: [
          {
            id: 'placeholder1',
            media_url: 'https://via.placeholder.com/640x640?text=Instagram+Placeholder',
            permalink: 'https://instagram.com'
          },
          {
            id: 'placeholder2',
            media_url: 'https://via.placeholder.com/640x640?text=Instagram+Placeholder',
            permalink: 'https://instagram.com'
          },
          {
            id: 'placeholder3',
            media_url: 'https://via.placeholder.com/640x640?text=Instagram+Placeholder',
            permalink: 'https://instagram.com'
          }
        ]
      });
      return;
    }
    
    const url = `https://graph.facebook.com/v12.0/${INSTAGRAM_USER_ID}/media?fields=id,media_url,permalink&access_token=${INSTAGRAM_ACCESS_TOKEN}`;
    
    https.get(url, (res) => {
      let data = '';
      
      res.on('data', (chunk) => {
        data += chunk;
      });
      
      res.on('end', () => {
        try {
          const parsedData = JSON.parse(data);
          if (parsedData.error) {
            console.error('Instagram API error:', parsedData.error);
            console.warn('Using placeholder data instead.');
            resolve({
              data: [
                {
                  id: 'placeholder1',
                  media_url: 'https://via.placeholder.com/640x640?text=Instagram+Placeholder',
                  permalink: 'https://instagram.com'
                },
                {
                  id: 'placeholder2',
                  media_url: 'https://via.placeholder.com/640x640?text=Instagram+Placeholder',
                  permalink: 'https://instagram.com'
                },
                {
                  id: 'placeholder3',
                  media_url: 'https://via.placeholder.com/640x640?text=Instagram+Placeholder',
                  permalink: 'https://instagram.com'
                }
              ]
            });
            return;
          }
          
          resolve(parsedData);
        } catch (error) {
          console.error('Error parsing Instagram data:', error);
          reject(error);
        }
      });
    }).on('error', (error) => {
      console.error('Error fetching Instagram data:', error);
      reject(error);
    });
  });
}

// Main function
async function main() {
  try {
    console.log('Fetching Instagram data...');
    const data = await fetchInstagramData();
    
    if (data.data && Array.isArray(data.data)) {
      // Only save the first 3 posts
      const posts = data.data.slice(0, 3);
      
      // Write to file
      fs.writeFileSync(OUTPUT_FILE, JSON.stringify({ data: posts }, null, 2));
      console.log(`Instagram data saved to ${OUTPUT_FILE}`);
    } else {
      console.error('No Instagram posts found in the response');
      // Create placeholder data instead of failing
      const placeholderData = {
        data: [
          {
            id: 'placeholder1',
            media_url: 'https://via.placeholder.com/640x640?text=Instagram+Placeholder',
            permalink: 'https://instagram.com'
          },
          {
            id: 'placeholder2',
            media_url: 'https://via.placeholder.com/640x640?text=Instagram+Placeholder',
            permalink: 'https://instagram.com'
          },
          {
            id: 'placeholder3',
            media_url: 'https://via.placeholder.com/640x640?text=Instagram+Placeholder',
            permalink: 'https://instagram.com'
          }
        ]
      };
      fs.writeFileSync(OUTPUT_FILE, JSON.stringify(placeholderData, null, 2));
      console.log(`Placeholder Instagram data saved to ${OUTPUT_FILE}`);
    }
  } catch (error) {
    console.error('Failed to fetch Instagram data:', error);
    // Create placeholder data instead of failing
    const placeholderData = {
      data: [
        {
          id: 'placeholder1',
          media_url: 'https://via.placeholder.com/640x640?text=Instagram+Placeholder',
          permalink: 'https://instagram.com'
        },
        {
          id: 'placeholder2',
          media_url: 'https://via.placeholder.com/640x640?text=Instagram+Placeholder',
          permalink: 'https://instagram.com'
        },
        {
          id: 'placeholder3',
          media_url: 'https://via.placeholder.com/640x640?text=Instagram+Placeholder',
          permalink: 'https://instagram.com'
        }
      ]
    };
    fs.writeFileSync(OUTPUT_FILE, JSON.stringify(placeholderData, null, 2));
    console.log(`Placeholder Instagram data saved to ${OUTPUT_FILE}`);
  }
}

main(); 