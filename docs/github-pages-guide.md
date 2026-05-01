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

## Tips & Tricks

### 1. Local testing with Jekyll
```bash
gem install bundler jekyll
bundle install
bundle exec jekyll serve
```

### 2. Force HTTPS
Add to `_config.yml`:
```yaml
enforce_ssl: true
```

### 3. Custom 404 page
Create `404.html` in repository root

### 4. Hide pages from search
Add frontmatter to HTML files:
```yaml
---
sitemap: false
---
```

## Common Issues

### "Page not found" after deployment
- Wait up to 10 minutes for DNS propagation
- Check that you're pushing to the correct branch
- Verify file paths and case sensitivity

### Jekyll build errors
- Check for invalid YAML in frontmatter
- Ensure all required Jekyll gems are in `Gemfile`
- Validate HTML syntax

### Custom domain not working
- Verify CNAME file contents (no trailing slash)
- Check DNS configuration
- Wait for full propagation

## Resources

- [GitHub Pages Documentation](https://docs.github.com/en/pages)
- [Jekyll Documentation](https://jekyllrb.com/docs/)
- [GitHub Pages Examples](https://github.com/pages/examples)
