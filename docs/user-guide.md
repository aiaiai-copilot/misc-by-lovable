# User Guide - Records Manager

Welcome to Records Manager, a powerful tag-based record organization system. This guide will help you get started and make the most of all available features.

## Overview

Records Manager allows you to create, organize, and search through records using a flexible tagging system. Each record consists of a collection of tags that describe and categorize your content.

## Getting Started

### Creating Your First Record

1. **Enter tags in the input field** - Type tags separated by spaces
2. **Press Enter or click Create** - Your record will be saved instantly
3. **Success notification** - You'll see a confirmation toast

**Example:** Type `work meeting project-alpha urgent` to create a record with three tags.

## Core Features

### Adding Records

- **Tag Input**: Enter multiple tags separated by spaces
- **Auto-completion**: The system suggests existing tags as you type
- **Flexible tagging**: Use any combination of letters, numbers, and hyphens

### Searching and Filtering

The search system uses intelligent filtering logic:

- **Complete tags**: Must match exactly (strict superset matching)
- **Partial tags**: The last tag you're typing matches any record tag that starts with those characters
- **Real-time filtering**: Results update as you type with a 300ms delay

**Example Search Behaviors:**
- Typing `work` shows all records containing tags that start with "work"
- Typing `work meeting` shows records that have both a "work" tag AND any tag starting with "meeting"
- Adding `proj` shows records with "work", "meeting", and tags starting with "proj"

### Tag Cloud Navigation

The tag cloud displays all your tags with visual emphasis based on usage frequency:

- **Size indicates popularity** - More frequently used tags appear larger
- **Click to add** - Click any tag to add it to your search
- **Keyboard navigation** - Use arrow keys to navigate between tags
- **Responsive layout** - Adapts to different screen sizes

### Records List

Your filtered records appear in a clean list format:

- **Chronological order** - Most recent records appear first
- **Tag display** - All tags for each record are shown as badges
- **Quick actions** - Edit and delete buttons for each record

## Keyboard Navigation

### Input Field Controls
- **Enter** - Create new record or save edited record
- **Escape** - Clear input and cancel any editing
- **Tab** - Navigate to tag cloud or records list

### Tag Cloud Navigation
- **Arrow keys** - Move between tags
- **Enter/Space** - Select a tag
- **Escape** - Return focus to input field

### Records List Navigation
- **Arrow keys** - Move between records
- **Enter/Space** - Edit the selected record
- **Delete** - Remove the selected record
- **Escape** - Return focus to input field

## Record Management

### Editing Records

1. **Click the Edit button** or press Enter while navigating records
2. **Input field populates** with existing tags
3. **Modify tags** as needed
4. **Press Enter** to save changes
5. **Press Escape** to cancel editing

### Deleting Records

- **Mouse**: Click the delete button (trash icon) on any record
- **Keyboard**: Navigate to a record and press Delete key
- **Confirmation**: You'll see a toast notification confirming deletion

## Mobile Support

The application is fully optimized for mobile devices:

- **Touch-friendly buttons** - All interactive elements are easily tappable
- **Visible controls** - Delete buttons are always visible (no hover required)
- **Responsive design** - Layout adapts to screen size
- **Touch navigation** - Tap to interact with all elements

## Tips for Effective Use

### Tagging Best Practices

1. **Use consistent naming** - Stick to lowercase for uniformity
2. **Be descriptive** - Use meaningful tags that you'll remember
3. **Use hyphens for compound terms** - e.g., `project-alpha` instead of `project alpha`
4. **Start broad, then narrow** - Use general categories first, then specific details

### Search Strategies

1. **Start with broad terms** - Begin with general categories
2. **Refine gradually** - Add more specific tags to narrow results
3. **Use partial matching** - Take advantage of prefix matching for quick filtering
4. **Remember tag frequency** - Popular tags appear larger in the cloud

### Organization Tips

1. **Create tag hierarchies** - Use consistent prefixes (e.g., `project-`, `work-`, `personal-`)
2. **Regular cleanup** - Periodically review and merge similar tags
3. **Use the tag cloud** - It shows which tags you use most frequently

## Troubleshooting

### Common Issues

**Records not appearing in search:**
- Check that you're using the correct tag spelling
- Remember that complete tags need exact matches
- Only the last (incomplete) tag uses prefix matching

**Keyboard navigation not working:**
- Ensure the correct element has focus
- Use Tab to move between sections
- Use Escape to reset focus to input field

**Mobile interaction issues:**
- All buttons should be visible without hovering
- Use touch gestures for navigation
- Rotate device for better tag cloud visibility

## Technical Notes

- **Data persistence** - Records are stored locally in your browser
- **Real-time updates** - Changes are reflected immediately
- **Responsive design** - Works on desktop, tablet, and mobile devices
- **Accessibility** - Full keyboard navigation support

## Need Help?

If you encounter any issues or have suggestions for improvements, please refer to the project repository or contact the development team.

---

*Last updated: [Current Date]*