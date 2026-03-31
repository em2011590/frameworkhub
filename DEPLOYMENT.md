# Deployment Guide - Vercel

This guide will help you deploy your Next.js application to Vercel.

## Prerequisites

1. **Vercel Account**: Sign up at [vercel.com](https://vercel.com)
2. **GitHub Account**: Connect your repository to Vercel
3. **MongoDB**: Already configured with connection string in `.env.local`

## Step 1: Push to GitHub

```bash
# Initialize git if not already done
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/newframerwork.git
git push -u origin main
```

## Step 2: Deploy on Vercel

### Option A: Using Vercel Dashboard (Recommended)

1. Go to [vercel.com/dashboard](https://vercel.com/dashboard)
2. Click **"New Project"**
3. Select your GitHub repository
4. Click **"Import"**
5. Set up environment variables (see Step 3 below)
6. Click **"Deploy"**

### Option B: Using Vercel CLI

```bash
npm i -g vercel
vercel
# Follow the prompts to connect and deploy
```

## Step 3: Configure Environment Variables

In your Vercel project dashboard:

1. Go to **Settings → Environment Variables**
2. Add the following variables:

### Required Variables

| Variable | Value | Example |
|----------|-------|---------|
| `MONGODB_URI` | Your MongoDB connection string | `mongodb+srv://user:pass@cluster.mongodb.net/database` |
| `NEXTAUTH_SECRET` | Generate with: `openssl rand -base64 32` | `k8x4j2p9m1q5r6t3y7u8i0o2n4a5b6c7d8e9f` |
| `AUTH_SECRET` | Same as `NEXTAUTH_SECRET` | (same value) |
| `NEXTAUTH_URL` | Leave empty or set to your domain | (Vercel auto-fills this) |

### How to generate `NEXTAUTH_SECRET`:

```bash
# On macOS/Linux
openssl rand -base64 32

# On Windows PowerShell
[Convert]::ToBase64String([System.Security.Cryptography.RandomNumberGenerator]::GetBytes(32))
```

## Step 4: Verify Deployment

After deployment completes:

1. Visit your Vercel URL (e.g., `https://your-project.vercel.app`)
2. Test the following:
   - ✓ Home page loads
   - ✓ Frameworks page displays frameworks
   - ✓ Login/Signup pages work
   - ✓ API endpoints respond: `/api/auth/providers`
   - ✓ Database connection works (check `/api/frameworks`)

## Step 5: Custom Domain (Optional)

1. Go to **Settings → Domains**
2. Add your custom domain
3. Update DNS records as instructed by Vercel

## Troubleshooting

### "No frameworks found" error
- Check `MONGODB_URI` is correct in Vercel dashboard
- Verify environment variables are set (case-sensitive!)
- App will use fallback static frameworks if DB unavailable

### Authentication not working
- Ensure `NEXTAUTH_SECRET` and `AUTH_SECRET` are set
- Verify `NEXTAUTH_URL` is set to your domain
- Check that `/api/auth/[...nextauth]/route.ts` exists

### "Cannot connect to MongoDB"
- Verify MongoDB connection string is correct
- Check MongoDB IP whitelist includes Vercel's IPs (use `0.0.0.0/0` for testing, then restrict)
- Test connection locally first

### Build fails with "Error: Cannot find module"
- Run `npm install` locally and commit `package-lock.json`
- Check `.gitignore` doesn't exclude necessary files

## Performance Tips

1. **Enable Caching**:
   - Vercel automatically caches static builds
   - Next.js API routes are cached with ISR when possible

2. **Monitor Usage**:
   - Check Vercel dashboard for usage metrics
   - Set up bandwidth alerts in project settings

3. **Database Optimization**:
   - Add MongoDB connection pooling
   - Use MongoDB Atlas with SSD storage
   - Enable automatic backups

## Production Checklist

- [ ] MongoDB production URI set in Vercel
- [ ] Strong random `NEXTAUTH_SECRET` generated and set
- [ ] Environment variables all configured
- [ ] Custom domain configured (or use Vercel domain)
- [ ] SSL certificate auto-enabled (Vercel standard)
- [ ] Build script verified: `npm run build`
- [ ] Start script verified: `npm start`
- [ ] All API routes tested
- [ ] Database fallback working
- [ ] Error monitoring configured (optional: Sentry, DataDog)
- [ ] GitHub Actions or Vercel deployment preview enabled

## Auto-Deployment

By default, Vercel automatically deploys when you push to your main branch. 

To disable/configure:
1. Go to **Settings → Git**
2. Configure which branches trigger deployments
3. Set up preview deployments for pull requests

## Rollback

If something goes wrong:
1. Go to **Deployments** tab
2. Find the previous working deployment
3. Click the "..." menu and select **"Redeploy"**

## Support

- **Vercel Docs**: https://vercel.com/docs
- **Next.js Docs**: https://nextjs.org/docs
- **NextAuth Docs**: https://next-auth.js.org
