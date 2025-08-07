# Deployment Guide - Speech Path Dash

## 🚀 Deploying to Vercel with Supabase

### Prerequisites
- GitHub account
- Vercel account
- Supabase project (already configured)

### Step 1: Push to GitHub

1. **Initialize Git** (if not already done):
   ```bash
   git init
   git add .
   git commit -m "Initial commit - Speech Path Dash CRM"
   ```

2. **Create GitHub Repository**:
   - Go to GitHub and create a new repository
   - Name it `speech-path-dash` or similar

3. **Push to GitHub**:
   ```bash
   git remote add origin https://github.com/YOUR_USERNAME/speech-path-dash.git
   git branch -M main
   git push -u origin main
   ```

### Step 2: Deploy to Vercel

1. **Connect to Vercel**:
   - Go to [vercel.com](https://vercel.com)
   - Sign in with GitHub
   - Click "New Project"
   - Import your `speech-path-dash` repository

2. **Configure Environment Variables**:
   In the Vercel project settings, add these environment variables:
   ```
   NEXT_PUBLIC_SUPABASE_URL=https://qbdfuvzrnanjskwcbrgj.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFiZGZ1dnpybmFuanNrd2NicmdqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTQ1NDQzOTUsImV4cCI6MjA3MDEyMDM5NX0.9XlY7bfK78bgrpCLY4x_jR3qaAfMgZU_WmLnFXJBEQ4
   ```

3. **Deploy**:
   - Click "Deploy"
   - Vercel will automatically build and deploy your app

### Step 3: Local Development Setup

For local development, create a `.env.local` file in the project root:

```env
NEXT_PUBLIC_SUPABASE_URL=https://qbdfuvzrnanjskwcbrgj.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFiZGZ1dnpybmFuanNrd2NicmdqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTQ1NDQzOTUsImV4cCI6MjA3MDEyMDM5NX0.9XlY7bfK78bgrpCLY4x_jR3qaAfMgZU_WmLnFXJBEQ4
```

### Step 4: Verify Deployment

1. **Check Vercel Dashboard**:
   - Monitor the build process
   - Check for any build errors
   - Verify environment variables are set

2. **Test the Application**:
   - Visit your Vercel URL
   - Test adding patients
   - Test logging sessions
   - Verify data persistence

### Step 5: Custom Domain (Optional)

1. **Add Custom Domain**:
   - In Vercel dashboard, go to Settings → Domains
   - Add your custom domain
   - Configure DNS settings as instructed

### Troubleshooting

#### Common Issues:

1. **Build Errors**:
   - Check that all dependencies are in `package.json`
   - Verify TypeScript compilation
   - Check for missing environment variables

2. **Database Connection Issues**:
   - Verify Supabase URL and key are correct
   - Check Row Level Security policies
   - Ensure database is active

3. **Environment Variables**:
   - Double-check variable names (must start with `NEXT_PUBLIC_`)
   - Verify no extra spaces or quotes
   - Redeploy after changing environment variables

### Production Checklist

- [ ] Environment variables configured in Vercel
- [ ] Database schema deployed to Supabase
- [ ] RLS policies configured
- [ ] Application builds successfully
- [ ] All features working in production
- [ ] Custom domain configured (if desired)
- [ ] SSL certificate active
- [ ] Performance monitoring enabled

### Security Notes

- Environment variables are automatically encrypted by Vercel
- Supabase RLS policies protect your data
- Never commit `.env.local` to version control
- Use different Supabase projects for staging/production if needed

### Monitoring

- **Vercel Analytics**: Monitor performance and usage
- **Supabase Dashboard**: Monitor database usage and performance
- **Error Tracking**: Consider adding Sentry for error monitoring

Your application will be live at: `https://your-project-name.vercel.app`
