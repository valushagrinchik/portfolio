# GitHub Pages Quick Reference

## Setting Up GitHub Pages

### 1. Enable GitHub Pages
1. Go to your repository on GitHub
2. Click **Settings** tab
3. Scroll down to **GitHub Pages** section
4. Select source:
   - **Deploy from a branch**: Choose main/master and `/ (root)` or `/docs` folder
   - **GitHub Actions**: For custom builds (React, Next.js, etc.)

## Deployment Commands

### Push changes to trigger rebuild
```bash
git add .
git commit -m "Update site"
git push origin main
```

### Custom domain setup
1. Create `CNAME` file in repository root with your domain
2. Configure DNS settings with your domain provider
3. Wait for DNS propagation (can take 24-48 hours)

## GitHub Actions for Complex Sites

### Example workflow for React/Next.js
Create `.github/workflows/deploy.yml`:
```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [ main ]

jobs:
  build-and-deploy:
    runs-on: ubuntu-latest
    steps:
    - uses: actions/checkout@v3
    - name: Setup Node.js
      uses: actions/setup-node@v3
      with:
        node-version: '18'
    - name: Install dependencies
      run: npm ci
    - name: Build
      run: npm run build
    - name: Deploy
      uses: peaceiris/actions-gh-pages@v3
      with:
        github_token: ${{ secrets.GITHUB_TOKEN }}
        publish_dir: ./build
```
