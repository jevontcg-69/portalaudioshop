# Cloudinary Integration Guide

To enable image uploads in your Portal Audio CMS, you need to connect your Cloudinary account. Follow these steps:

## 1. Get your Cloudinary Credentials
1. Log in to your [Cloudinary Dashboard](https://cloudinary.com/console).
2. On the **Product Environment Settings** (homepage), you will see:
   - **Cloud Name**
   - **API Key**
   - **API Secret**

## 2. Update Environment Variables
Open your [.env.local](file:///c:/Users/jevon/OneDrive/Desktop/portalaudio/.env.local) file and fill in these three values:

```env
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=your_cloud_name_here
CLOUDINARY_API_KEY=your_api_key_here
CLOUDINARY_API_SECRET=your_api_secret_here
```

## 3. Configure Upload Folder (Optional)
The app is currently configured to upload images to a folder named `portal-audio/products`. Cloudinary will create this folder automatically on your first upload.

## 4. Next.js Image Security
To allow images from Cloudinary to display on your site, I have already updated `next.config.ts`. If you change your cloud name later, ensure the configuration matches.

---

### **Verification**
Once you've added the keys:
1. Restart your development server (`npm run dev`).
2. Go to the Admin Cabinet.
3. Try uploading a small image in the **Add New Product** form.
4. If successful, you'll see a preview of the image instantly.
