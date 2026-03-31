# Quick Deployment Checklist

## Before You Deploy

✅ **Local Testing**
```bash
npm install
npm run build  # Test production build
npm start      # Test production server
```

✅ **Git Setup**
```bash
git add .
git commit -m "Ready for Vercel deployment"
git push origin main
```

## Vercel Deployment - 3 Easy Steps

### Step 1: Connect Your Repository
1. Go to https://vercel.com/new
2. Select your GitHub repository
3. Click "Import"

### Step 2: Set Environment Variables
In Vercel Project Settings → Environment Variables, add:

```
MONGODB_URI = mongodb+srv://your_username:your_password@cluster.mongodb.net/database?appName=Cluster0

NEXTAUTH_SECRET = [Generate: openssl rand -base64 32]

AUTH_SECRET = [Same as NEXTAUTH_SECRET]
```

Generate NEXTAUTH_SECRET:
- **Windows PowerShell**: 
  ```powershell
  [Convert]::ToBase64String([System.Security.Cryptography.RandomNumberGenerator]::GetBytes(32))
  ```
- **Mac/Linux**: 
  ```bash
  openssl rand -base64 32
  ```

### Step 3: Deploy
Click "Deploy" button

## ✅ Verification After Deployment

Test these URLs:
- [ ] Home: `https://your-app.vercel.app/`
- [ ] Frameworks: `https://your-app.vercel.app/frameworks`
- [ ] API: `https://your-app.vercel.app/api/auth/providers`
- [ ] Login: `https://your-app.vercel.app/login`

## MongoDB Configuration for Production

If MongoDB shows "Database unavailable":

1. Go to MongoDB Atlas Dashboard
2. Network Access → Add Current IP Address
3. Or use: `0.0.0.0/0` for testing (then restrict later)

## GitHub Secrets (For CI/CD)

Add these to your GitHub repository secrets (if using Actions):

- `VERCEL_TOKEN`: Get from Vercel dashboard
- `VERCEL_ORG_ID`: Get from Vercel dashboard  
- `VERCEL_PROJECT_ID`: Get from Vercel dashboard

## Need Help?

📖 **Full Guide**: See `DEPLOYMENT.md`  
🔗 **Vercel Docs**: https://vercel.com/docs  
📚 **Next.js Docs**: https://nextjs.org/docs/deployment
