# Portal Audio Indonesia - Admin Guide

## Getting Started with the Admin Panel

### Accessing the Admin Panel

1. Navigate to `/admin/login`
2. Enter your admin credentials
3. You'll be redirected to the admin dashboard

### Dashboard Overview

The dashboard provides:
- Total products count
- Pending inquiries
- Recent activity log
- Quick action buttons

## Managing Products

### Adding a New Product

1. Go to **Products** → **Add New**
2. Fill in the product details:
   - **Name**: Product name (e.g., "Premium Voltage Stabilizer 5000W")
   - **Slug**: URL-friendly name (auto-generated from name)
   - **Category**: Select from dropdown
   - **Description**: Detailed product description
   - **Specifications**: Technical specs (JSON format)
   - **Price**: In Indonesian Rupiah
   - **Brand**: Manufacturer name
   - **Origin**: Default is "USA"
   - **Availability**: in_stock, out_of_stock, pre_order
   - **Images**: Upload multiple product images
   - **Featured**: Check to display on homepage

3. Click **Save Product**

### Editing Products

1. Go to **Products** → **All Products**
2. Click **Edit** on the product you want to modify
3. Make your changes
4. Click **Update Product**

### Deleting Products

1. Go to **Products** → **All Products**
2. Click **Delete** on the product
3. Confirm deletion

## Managing Categories

### Adding Categories

1. Go to **Categories** → **Add New**
2. Enter:
   - Category name
   - Slug (URL-friendly)
   - Description
   - Category image (optional)
3. Click **Save Category**

## Managing Dealers

### Adding a Dealer

1. Go to **Dealers** → **Add New**
2. Fill in dealer information:
   - Name
   - Address
   - City and Region
   - Contact details (phone, email)
   - Location coordinates (for map)
   - Status (active/inactive)
3. Click **Save Dealer**

### Finding Coordinates

To get latitude and longitude for the dealer map:
1. Open [Google Maps](https://maps.google.com)
2. Right-click on the dealer location
3. Click on the coordinates to copy them
4. Paste into the Latitude and Longitude fields

## Managing Inquiries

### Viewing Inquiries

1. Go to **Inquiries**
2. See all customer inquiries with:
   - Customer name and contact
   - Message content
   - Date submitted
   - Status (new, in_progress, resolved)

### Responding to Inquiries

1. Click on an inquiry to view details
2. Update status to "in_progress"
3. Contact customer via email or phone
4. Mark as "resolved" when complete

## Managing Testimonials

### Adding Testimonials

1. Go to **Testimonials** → **Add New**
2. Enter:
   - Customer name
   - Company (optional)
   - Testimonial content
   - Rating (1-5 stars)
   - Related product (optional)
   - Featured (to display on homepage)
3. Click **Save Testimonial**

## Managing Blog Posts

### Creating a Blog Post

1. Go to **Blog** → **Add New**
2. Fill in:
   - Title
   - Slug
   - Content (rich text editor)
   - Excerpt (summary)
   - Featured image
   - Author name
   - Published status
3. Click **Save Post**

### Publishing Posts

- **Draft**: Uncheck "Published" to save as draft
- **Publish**: Check "Published" and set publish date

## Image Management

### Uploading Images

1. Click **Upload Image** button
2. Select image file (JPG, PNG, WebP)
3. Image will be automatically uploaded to Cloudinary
4. Image URL will be saved in the database

### Image Best Practices

- **Product Images**: 1200x1200px, square format
- **Category Images**: 800x600px, landscape
- **Blog Featured Images**: 1200x630px, landscape
- **File Size**: Keep under 1MB for fast loading
- **Format**: Use WebP for best compression

## SEO Optimization

### Product SEO

Each product should have:
- Descriptive, keyword-rich name
- Detailed description (min 150 words)
- Alt text for images
- Proper category assignment

### Blog Post SEO

- Use descriptive titles (50-60 characters)
- Write compelling excerpts (150-160 characters)
- Include relevant keywords naturally
- Add featured images with alt text

## Tips for Success

### Product Management

1. **Keep inventory updated**: Regularly update availability status
2. **High-quality images**: Use professional product photos
3. **Detailed specs**: Include all technical specifications
4. **Competitive pricing**: Research market prices
5. **Featured products**: Highlight best-sellers on homepage

### Customer Service

1. **Respond quickly**: Reply to inquiries within 24 hours
2. **Be professional**: Maintain courteous communication
3. **Follow up**: Check if customers are satisfied
4. **Collect testimonials**: Ask happy customers for reviews

### Content Strategy

1. **Regular updates**: Post new blog content monthly
2. **Educational content**: Write about audio equipment tips
3. **Product showcases**: Feature new arrivals
4. **Industry news**: Share relevant audio industry updates

## Troubleshooting

### Can't Upload Images

- Check Cloudinary credentials in environment variables
- Verify file size is under 10MB
- Ensure file format is supported (JPG, PNG, WebP)

### Products Not Showing

- Check if product is set to "in_stock"
- Verify category is assigned
- Clear browser cache

### Login Issues

- Verify email and password
- Check if user account is active in database
- Clear browser cookies

## Security Best Practices

1. **Strong passwords**: Use complex passwords (12+ characters)
2. **Regular updates**: Keep admin password updated
3. **Logout**: Always logout when finished
4. **Secure connection**: Only access admin panel over HTTPS
5. **Limited access**: Only give admin access to trusted staff

## Support

For technical support or questions:
- Email: admin@portalaudio.id
- Check README.md for setup instructions
- Review database schema in supabase-schema.sql

---

**Last Updated**: January 2026
