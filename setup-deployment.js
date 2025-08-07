#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

console.log('🚀 Speech Path Dash - Deployment Setup');
console.log('=====================================\n');

// Check if .env.local exists
const envPath = path.join(__dirname, '.env.local');
if (!fs.existsSync(envPath)) {
  console.log('📝 Creating .env.local file...');
  const envContent = `NEXT_PUBLIC_SUPABASE_URL=https://qbdfuvzrnanjskwcbrgj.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFiZGZ1dnpybmFuanNrd2NicmdqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTQ1NDQzOTUsImV4cCI6MjA3MDEyMDM5NX0.9XlY7bfK78bgrpCLY4x_jR3qaAfMgZU_WmLnFXJBEQ4`;
  
  fs.writeFileSync(envPath, envContent);
  console.log('✅ .env.local created successfully');
} else {
  console.log('✅ .env.local already exists');
}

// Check if git is initialized
const gitPath = path.join(__dirname, '.git');
if (!fs.existsSync(gitPath)) {
  console.log('\n📦 Initializing Git repository...');
  console.log('Run these commands:');
  console.log('  git init');
  console.log('  git add .');
  console.log('  git commit -m "Initial commit - Speech Path Dash CRM"');
} else {
  console.log('✅ Git repository already initialized');
}

console.log('\n🎯 Next Steps:');
console.log('1. Create a GitHub repository');
console.log('2. Push your code to GitHub:');
console.log('   git remote add origin https://github.com/YOUR_USERNAME/speech-path-dash.git');
console.log('   git branch -M main');
console.log('   git push -u origin main');
console.log('3. Deploy to Vercel:');
console.log('   - Go to https://vercel.com');
console.log('   - Import your GitHub repository');
console.log('   - Add environment variables in Vercel dashboard');
console.log('   - Deploy!');
console.log('\n📖 See DEPLOYMENT.md for detailed instructions');
console.log('\n🔗 Your Supabase Project:');
console.log('   URL: https://qbdfuvzrnanjskwcbrgj.supabase.co');
console.log('   Dashboard: https://supabase.com/dashboard/project/qbdfuvzrnanjskwcbrgj');
