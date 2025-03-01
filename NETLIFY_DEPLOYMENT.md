# Netlify Deployment Guide for HD Trade Services Website

This document outlines the steps to deploy this Next.js website to Netlify.

## Prerequisites

- A GitHub repository containing your website code
- A Netlify account (sign up at [netlify.com](https://netlify.com) if you don't have one)

## Deployment Steps

### 1. Push Your Code to GitHub

If your code is not already on GitHub:

```bash
# Initialize a git repository if needed
git init

# Add all files
git add .

# Commit changes
git commit -m "Prepare for Netlify deployment"

# Add your GitHub repository as remote
git remote add origin https://github.com/yourusername/your-repo-name.git

# Push to GitHub
git push -u origin main
```

### 2. Connect to Netlify

1. Log in to your Netlify account
2. Click "Add new site" > "Import an existing project"
3. Select GitHub as your Git provider
4. Authenticate with GitHub if prompted
5. Select your repository from the list

### 3. Configure Build Settings

Netlify should automatically detect that you're using Next.js, but verify these settings:

- **Build command**: `npm run build`
- **Publish directory**: `.next`

The `netlify.toml` file in your repository should handle these settings automatically.

### 4. Environment Variables

Add the following environment variables in Netlify (Site settings > Environment variables):


```

Add any other environment variables your application needs.

### 5. Deploy

Click "Deploy site" and Netlify will start building and deploying your website.

### 6. Custom Domain (Optional)

To use a custom domain:

1. Go to "Domain settings" in your Netlify site dashboard
2. Click "Add custom domain"
3. Follow the instructions to set up your domain

### 7. Continuous Deployment

Netlify automatically sets up continuous deployment. Any changes pushed to your main branch will trigger a new build and deployment.

## Troubleshooting

If you encounter any issues during deployment:

1. Check the build logs in Netlify for specific errors
2. Ensure all dependencies are correctly listed in package.json
3. Verify that environment variables are correctly set
4. Check that the Netlify configuration in netlify.toml is correct

## Additional Resources

- [Netlify Docs for Next.js](https://docs.netlify.com/integrations/frameworks/next-js/overview/)
- [Next.js Deployment Documentation](https://nextjs.org/docs/deployment) 