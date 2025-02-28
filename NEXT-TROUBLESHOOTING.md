# Next.js Troubleshooting Guide

This guide addresses common Next.js errors and their solutions, with a focus on build and runtime issues.

## Common Errors and Solutions

### 1. Missing Vendor Chunks Error

**Error:**
```
Error: ENOENT: no such file or directory, open '/path/to/.next/server/vendor-chunks/next.js'
```

**Solution:**

This error occurs when the Next.js build cache becomes corrupted. To fix it:

1. **Clean the Next.js cache**:
   ```bash
   npm run clean-dev
   ```

2. **If the error persists, perform a full clean**:
   ```bash
   npm run full-clean
   ```

### 2. Module Not Found Errors

**Error:**
```
Cannot find module './vendor-chunks/webidl-conversions.js'
```

**Solution:**

These errors typically occur due to:
- Corrupted build cache
- Incompatible dependencies
- Outdated node_modules

Steps to resolve:

1. **Clean the cache and restart**:
   ```bash
   npm run clean-dev
   ```

2. **If the error persists, perform a full clean**:
   ```bash
   npm run full-clean
   ```

3. **Check for dependency conflicts**:
   ```bash
   npm ls <package-name>
   ```

### 3. Hydration Mismatch Errors

See the detailed guide in [HYDRATION.md](./HYDRATION.md).

### 4. Invalid Next.js Configuration Options

**Error:**
```
Invalid next.config.js options detected: 
Unrecognized key(s) in object: 'swcMinify' at "experimental"
```

**Solution:**

Next.js configuration options change between versions. When upgrading Next.js:

1. **Review the Next.js upgrade guide** for your target version
2. **Remove deprecated options** from next.config.js
3. **Add new recommended options** if applicable

### 5. Port Already in Use

**Error:**
```
Port 3000 is in use, trying 3001 instead.
```

**Solution:**

This is not an error but a notification. Next.js automatically tries the next available port.

If you want to kill all processes using these ports:

```bash
# On macOS/Linux
pkill -f "node.*next"

# On Windows (PowerShell)
Get-Process | Where-Object {$_.ProcessName -eq "node" -and $_.CommandLine -like "*next*"} | Stop-Process
```

## Advanced Troubleshooting

### Memory Issues

If you're experiencing out-of-memory errors during build:

1. **Increase Node.js memory limit**:
   ```bash
   export NODE_OPTIONS="--max-old-space-size=4096"
   ```

2. **Optimize your build process** by reducing the number of pages or components built simultaneously

### Webpack Issues

For webpack-specific errors:

1. **Enable webpack debugging**:
   ```bash
   NEXT_DEBUG_WEBPACK=true npm run dev
   ```

2. **Analyze your bundle size**:
   ```bash
   npm run analyze
   ```

## When All Else Fails

If you've tried all the above solutions and still encounter issues:

1. **Check your Node.js version** - Make sure it's compatible with your Next.js version
2. **Verify your npm/yarn version** - Update to the latest stable version
3. **Try a fresh clone of your repository** in a new directory
4. **Check for file system issues** - Ensure you have proper permissions and disk space

## Useful Commands

```bash
# Clean development cache and restart
npm run clean-dev

# Full clean (removes node_modules and package-lock.json)
npm run full-clean

# Check for outdated dependencies
npm outdated

# Update dependencies
npm update

# Check for dependency conflicts
npm ls <package-name>
``` 