const mockData = {
  id: 1,
  name: 'Vizilu',
  description:
    'Vizilu 3D Picture Frame (12"x18") - Immersive Photo Display, Reverse Perspective Illusion, Perfect Wall Art, Novelty Gift',
  images: [
    {
      url: require('../assets/Shop/1.jpeg'),
      alt: 'Image 1',
    },
    {
      url: require('../assets/Shop/2.jpeg'),
      alt: 'Image 2',
    },
    {
      url: require('../assets/Shop/3.jpeg'),
      alt: 'Image 3',
    },
    {
      url: require('../assets/Shop/4.jpeg'),
      alt: 'Image 4',
    },
    {
      url: require('../assets/Shop/5.jpeg'),
      alt: 'Image 5',
    },
    {
      url: require('../assets/Shop/6.jpeg'),
      alt: 'Image 6',
    },
  ],
  price: 99.95,
  additionalInfo: {
    arrival: 'Arrives soon! Get it by Nov 29-Dec 6 if you order today',
    returnsExchanges: 'Returns & exchanges accepted',
    paymentOptions: 'Pay in 4 installments of $24.98. Klarna. Learn more',
    itemDetails: {
      handmade: true,
      dimensions: {
        width: 18,
        height: 12,
        depth: 3,
      },
      description:
        'Dive into a world of visual enchantment with our Vizilu 3D Visual Illusion Picture Frame (12"x18"). Elevate your space with mesmerizing 3D photo displays, where memories come to life. Simply upload, warp, print, and install for a captivating experience. As you move, your photos appear to rotate within the frame, creating an enchanting and dynamic visual narrative. This premium matte black gallery edition is a perfect blend of technology and artistry. Transform your cherished moments into captivating masterpieces! Order now and infuse your space with the magic of Vizilu!',
      keyFeatures: [
        'Immersive 3D Experience: Your pictures appear to hang on the walls of a photo gallery, rotating and tracking your every move.',
        'Effortless Photo Upload: Use the Vizilu app for seamless photo selection and warping.',
        'Print and Display: Print warped images on premium matte or glossy photo paper for a stunning visual effect.',
        'Versatile and Reusable: Change photos easily with supplied magnets; a novel way to showcase memories.',
        'Sleek Design: 12"x18" Gallery Edition in stylish black, perfect for any wall.',
      ],
      appStages: [
        'Upload: Simply upload your selected photos.',
        'Customize: Crop, zoom, and position photos in square frames.',
        'Perspective Transformation: Apply reverse perspective for the Vizilu gallery effect.',
        'Preview: Rearrange and replace warped images as you visualize them in the Vizilu gallery.',
        'Export: Consolidate warped images into a pdf file ready for printing.',
      ],
      installation:
        'Installation is a breeze – small metal dots and supplied magnets keep each photo securely in place. Stand at least four feet away for the best mesmerizing effect.',
      giftIdea:
        'Novel and enchanting, Vizilu makes for a unique and memorable gift.',
    },
    shippingOptions: {
      standard:
        'Standard Shipping: 3-5 business days in US & Canada, 5-7 business days internationally.',
    },
    orderInfo: 'Order today to get by Nov 29-Dec 6',
    returnPolicy: 'Returns & exchanges accepted within 30 days',
    freeShipping: true,
  },
};

export default mockData;
