# Project Case Studies

This folder contains individual case study pages for each portfolio project. These pages are designed to showcase your work in a Product Manager/Engineering portfolio format.

## Structure

```
projects/
├── case-study.css              # Shared styles for all project pages (dark theatre theme)
├── po-copilot.html            # PO Copilot case study
├── ai-origination-system.html # AI-Assisted M&A Origination System case study
├── fullsquish.html            # Full Squish app case study
├── alpha-vidiris.html         # Alpha Vidiris board game case study
├── sonos-aircooler.html       # Sonos Aircooler engineering case study
├── bike-fit-calculator.html   # Bike Fit Calculator web app case study
└── README.md                  # This file
```

## Case Study Template Sections

Each case study page includes the following sections (with placeholder content):

1. **Hero Section**
   - Project category/type
   - Project title
   - Subtitle/tagline
   - Metadata (role, timeline, platform)

2. **Overview**
   - Brief project description
   - Target users and value proposition

3. **Problem Statement**
   - User pain points
   - Challenges addressed
   - Gaps in existing solutions

4. **Research & Discovery** (if applicable)
   - User research methodology
   - Key insights
   - Market analysis

5. **Solution**
   - How your project solves the problem
   - Core features
   - Screenshots/images

6. **Development/Design Process**
   - Methodology used
   - Technical approach
   - Iterations and testing
   - Technologies used

7. **Results & Impact**
   - Measurable outcomes (stats cards)
   - User feedback
   - Success metrics

8. **Key Learnings**
   - What you learned from the project
   - Skills developed

9. **Future Roadmap** (optional)
   - Planned improvements
   - Next steps

10. **Call to Action**
    - Links to live project, GitHub, etc.

## How to Edit

### Adding Content

1. Open the HTML file for the project you want to edit
2. Look for placeholder text in brackets like `[Add description here]`
3. Replace with your actual content
4. Keep the HTML structure intact

### Adding Images

To add more images to the gallery:

```html
<div class="image-gallery">
    <div class="gallery-item">
        <img src="../assets/photos/[project-folder]/[image-name].png" alt="Description">
        <div class="gallery-caption">Caption text here</div>
    </div>
    <!-- Add more gallery items as needed -->
</div>
```

### Updating Stats

Update the stat cards with real numbers:

```html
<div class="stat-card">
    <div class="stat-number">100+</div>
    <div class="stat-label">Your Metric</div>
</div>
```

### Customizing Styles

To customize the look of your case studies, edit `case-study.css` (structural/content classes) or `../styles.css` (design tokens shared with the rest of the site — colors, fonts, radii). Common customizations:

- Change colors by editing the `:root` CSS variables in `../styles.css`
- Adjust spacing by modifying padding/margin values in `case-study.css`
- Change font sizes for different sections
- Swap the hero art/gradient (pulled from each project's entry in `../data/portfolio-data.js`)

## Tips for Strong Case Studies

### Product Manager Portfolio
- Focus on **impact metrics** and business outcomes
- Highlight **user research** and discovery process
- Show **decision-making** and prioritization
- Demonstrate **cross-functional collaboration**
- Include **A/B testing** and iteration examples

### Engineering Portfolio
- Showcase **technical architecture** and decisions
- Explain **problem-solving** approach
- Highlight **scalability** and performance considerations
- Include **code quality** and best practices
- Show **testing** and deployment strategies

### General Tips
- Use concrete numbers and metrics
- Tell a story with clear problem → solution → impact flow
- Show your process, not just the final product
- Include visuals: mockups, diagrams, screenshots
- Be honest about challenges and learnings

## Getting Help

For design assistance or content help, ask me:
- "Help me write a compelling problem statement for [project]"
- "Can you suggest metrics to highlight for [project]?"
- "Help me design a diagram showing [technical architecture/user flow/etc.]"
- "Review my case study and suggest improvements"

## Next Steps

1. **Fill in placeholders** - Replace all `[bracketed]` content
2. **Add images** - Upload screenshots, diagrams, mockups
3. **Update metadata** - Add actual timelines, roles, platforms
4. **Add real metrics** - Replace placeholder stats with real data
5. **Review & polish** - Proofread and refine your content

Remember: Quality over quantity. It's better to have 2-3 detailed, well-crafted case studies than many shallow ones.
