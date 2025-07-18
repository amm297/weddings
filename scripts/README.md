# Wedding Data Import Script

This directory contains scripts for managing wedding data.

## Import Wedding Data Script

The `import-wedding-data.ts` script imports wedding data from a JSON file into Firestore.

### Usage

1. Create a `.wedding-data.json` file in the project root with your wedding data (see example below)
2. Run the script:

```bash
# Normal import
bun run scripts/import-wedding-data.ts

# Dry run (uses .env.production and doesn't write to database)
bun run scripts/import-wedding-data.ts --dry-run

# Use local emulator
bun run scripts/import-wedding-data.ts --use-emulator
```

### Example Wedding Data File

Create a `.wedding-data.json` file in the project root with the following structure:

```json
{
  "slug": "your-wedding-slug",
  "title": "Your Wedding Title",
  "date": "2024-12-31T18:00:00.000Z",
  "location": {
    "name": "Wedding Venue Name",
    "address": "123 Wedding Lane, City, Country",
    "coordinates": {
      "lat": 40.7128,
      "lng": -74.0060
    }
  },
  "couple": {
    "person1": {
      "name": "Person 1 Name",
      "description": "About person 1"
    },
    "person2": {
      "name": "Person 2 Name",
      "description": "About person 2"
    }
  },
  "events": [
    {
      "title": "Ceremony",
      "time": "2024-12-31T18:00:00.000Z",
      "description": "Wedding ceremony description"
    },
    {
      "title": "Reception",
      "time": "2024-12-31T19:00:00.000Z",
      "description": "Reception description"
    }
  ],
  "rsvpDeadline": "2024-11-30T23:59:59.000Z",
  "accommodations": [
    {
      "name": "Hotel Name",
      "address": "123 Hotel Street, City, Country",
      "description": "Hotel description",
      "bookingUrl": "https://hotel-booking-url.com"
    }
  ]
}
```

Note: The script will automatically convert date strings to Firestore timestamps. 