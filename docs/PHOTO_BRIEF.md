# Dazzlit – Photography brief and AI image prompts

**Decision (4 Nov 2026):** the site uses AI-generated images that match the skyline-and-architecture style of the Dazzlit homepage design, so Dazzlit owns them and no stock licence is needed.
**Status:** these prompts are ready. The images haven't been generated yet; this session has no image-generation tool. Generate them in ChatGPT, Gemini or Midjourney, then upload them and I'll crop, compress and place them.

## Look and feel (applies to every image)
- **Subject:** global cities and modern architecture at golden hour or dusk. Glass towers, curved façades, waterfronts, terraces.
- **Light and colour:** sunset sky going from violet (#7047EB) to warm orange (#FF7849), with deep navy (#10162B) shadows. No green or teal casts.
- **Composition:** strong diagonals and curves that echo the brand's chevron ribbon. Leave clean negative space where headlines or the ribbon will sit.
- **Rules:**
  - Photoreal; no illustration.
  - No text, logos, watermarks or recognisable brand signage.
  - No identifiable real people. Distant silhouettes only, if any.
  - No famous landmarks that pin the image to one city. Exception: the location pages, which use city-specific images.
- **Delivery:**
  - Generate at the largest size the tool allows.
  - I export AVIF/WebP at the sizes listed below.

## Prompt template
> Photorealistic architectural photograph, `<SUBJECT>`, golden hour turning to dusk, sky graded from deep violet to warm orange, navy shadows, glass reflections catching sunset light, strong diagonal composition, clean negative space on the `<left/right>`, premium editorial style, shot on a full-frame camera with a 24mm lens, high dynamic range, no text, no logos, no people in focus, aspect ratio `<RATIO>`

## Images needed for Wave 1

| # | Where | Subject (`<SUBJECT>`) | Ratio | Negative space |
|---|---|---|---|---|
| 1 | Home hero (right panel) | Futuristic waterfront skyline of glass towers, seen from a curved glass terrace | 4:5 | left |
| 2 | Home hero (mobile) | Same scene, tighter crop on the towers | 4:3 | top |
| 3 | Insight card "Building a brand across markets" | Wide skyline across a river at dusk with long reflections | 16:10 | bottom |
| 4 | Insight card "Connecting creativity with performance" | Curved modern building façade with balconies against a violet-orange sky | 16:10 | left |
| 5 | About page hero | Modern open-plan studio interior with floor-to-ceiling windows overlooking a city at sunset; empty desks | 16:9 | right |
| 6 | Contact / proposal page | Rooftop terrace with lounge seating, city lights coming on | 16:9 | left |
| 7 | Case studies hub | Abstract close-up of glass and steel geometry catching orange light | 3:2 | centre |
| 8–26 | 19 service hub heroes | One image per service area. Keep the same style and vary the subject (see below). | 16:9 | right |
| 27 | Default social share image (OG) | Skyline at dusk; I add the logo and headline | 1.91:1 | centre |

### Service hub subjects (images 8–26)
| Service area | Subject |
|---|---|
| SEO | Aerial view of a city grid at dusk with light trails like search paths |
| Local SEO | Warm-lit neighbourhood street corner with shopfronts (signage blurred) |
| Link Building | Pedestrian bridges connecting two glass towers |
| PPC | Busy avenue at dusk with long-exposure traffic streaks |
| Social Media Marketing | Lively rooftop gathering seen from a distance, silhouettes only |
| Social Media Advertising | Wall of glowing screens in a modern atrium, blurred, no readable content |
| Web Design & Development | Minimal desk with a laptop and design sketches by a window overlooking the city |
| CRO | Spiral staircase in a modern building, seen from below |
| Video & Media Production | Professional camera on a gimbal on a rooftop at sunset |
| Content Marketing | Library-style workspace with large windows and warm light |
| Digital PR | Modern press-conference room with an empty stage and city backdrop |
| eCommerce Management | Contemporary warehouse loading area at dusk, orderly and clean |
| eCommerce Marketing | Stylish retail boutique window display at dusk (no brands) |
| Amazon & Marketplaces | Parcels on a modern conveyor in warm light, labels blank |
| Reputation Management | Glass tower reflecting a clear sunset sky, symmetrical |
| Review Generation | Café terrace with warm string lights, customers as soft silhouettes |
| App Store Optimization | Hand holding a phone against a blurred city skyline (screen dark or blank) |
| Marketing Automation | Clean, modern data-centre corridor with violet and orange accent lights |
| AI Marketing | Abstract architectural light installation with flowing violet-orange light ribbons |

## Location pages (Wave 6, later)
One image per country and per L1 city, each showing that city's skyline (landmarks allowed), graded to the same violet-orange dusk. Prompts follow the template, with the city name in `<SUBJECT>`.

## After generation
Upload the files here. I then:
1. Check each one for artefacts (warped buildings, gibberish text).
2. Grade them for consistency.
3. Crop to each slot and export AVIF and WebP with responsive sizes.
4. Write alt text.
5. Store them in `site/src/assets/images/`.
