# vizilu-final

# Presentation Time: NOVEMBER 28th

# Look into Test Flight

# low and high res image

# have settings for image size, frame count and image frame change sensitivity

When displaying a lot of images quickly in a React Native application, the primary considerations should be efficient loading, rendering performance, and memory usage. Here's a guide to help you choose the best approach:

Image Format:

JPEG: Ideal for photographic images where fine detail is less critical. Its smaller file size can lead to faster loading times.
PNG: Use for images with transparency or sharp lines (like icons or logos). It's larger in size compared to JPEG but essential for certain types of images.
WebP: This modern format offers superior compression and quality characteristics compared to JPEG and PNG. It's supported in React Native and is a great choice for balancing quality and performance.
Image Optimization:

Resize Images: Serve images that are appropriately sized for the user's device. Avoid downloading large images only to display them in a small size.
Compression: Use tools or services to optimize images. This reduces file size without significantly compromising quality.
Efficient Loading:

Lazy Loading: Load images as they are about to appear on the screen. React Native libraries like react-native-lazy-load-image can be useful.
Caching: Use image caching to store already-loaded images. This prevents re-downloading of images that the user has already seen.
Performance Techniques:

Use FlatList or VirtualizedList: For rendering long lists of images, these components only render elements that are currently visible, improving performance.
Avoid Unnecessary Re-renders: Optimize your components to prevent unnecessary re-renders, which can slow down your app.
Image Preloading: Preload images that the user is likely to view next. This can make navigation between images feel more responsive.
Coding Practices:

Use FastImage: This is a React Native module that is more performant than the standard Image component. It supports caching and other features beneficial for image-heavy apps.
Background Loading: Load images in the background if possible, especially for images that are not immediately visible on the app launch.
Testing and Monitoring:

Regularly test the performance of your app, especially on different devices and network conditions.
Use tools to monitor the app's memory usage and loading times.
In summary, a combination of using efficient image formats (consider WebP for its balance of quality and size), optimizing image sizes and compression, implementing smart loading techniques (like lazy loading and caching), and following good React Native coding practices will help achieve the goal of displaying a lot of images quickly and efficiently.
