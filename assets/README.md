# Assets Folder

This folder contains all static assets for the website.

## Structure

```
assets/
├── photos/          # All project images and photos
│   ├── fullsquish/  # Full Squish app images
│   ├── av/          # Alpha Vidiris boardgame images
│   ├── sonos/       # Sonos Aircooler project images
│   └── bikefit/     # Bike Fit Calculator images
└── README.md        # This file
```

## Adding New Assets

- **Photos**: Place in `assets/photos/[project-name]/`
- **Icons**: Add to `assets/icons/` (create if needed)
- **Documents**: Add to `assets/docs/` (create if needed)

## Hero Background Image

The hero section currently uses a placeholder image from Unsplash. To use your own image:
1. Add your photo to `assets/photos/`
2. Update the CSS in `styles.css` (line ~116)
3. Replace the URL with: `url('./assets/photos/your-hero-image.jpg')`
