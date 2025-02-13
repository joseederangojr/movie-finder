# MovieFinder: IMDB-Style Movie Search App


## Features

- Search for movies by title
- Filter search results by type (movie, series, episode) and year
- View a list of search results with basic movie details
- Click on a movie to view detailed information on a separate page
- Responsive design for mobile and desktop screens
- Caching of API responses for improved performance

## Tech Stack

- Frontend: React with TypeScript
- Backend: Next.js API Routes
- Styling: Tailwind CSS
- UI Components: shadcn/ui
- State Management: React Query / React Hooks (useState)
- Caching: Redis

## Prerequisites

Before you begin, ensure you have met the following requirements:

- Node.js (v14 or later)
- pnpm/npm
- Redis server
- CollectAPI api key (https://collectapi.com)

## Generate Collect API api key
1. Go to https://collectapi.com
2. On the top right corner click 'sign in' button
3. Enter your email and verification link will be sent. Follow the link and confirm your account
4. Go to CollectAPI IMDB API page https://collectapi.com/api/imdb
5. On pricing tab click 'Free' subscription
6. Go to your profile page https://collectapi.com/auth.
7. On your profile page go to API Key tab and copy your API Key

## Installation

1. Clone the repository: git clone https://github.com/joseederangojr/movie-finder
2. Install dependencies: pnpm install
4. Setup your local env variables
    COLLECT_API_KEY=example:apikey
    Note: remove the 'apikey '
    REDIS_URL=redis://localhost:6379
3. Run the app locally: pnpm dev

## Improvements
1. Use caching via redis to decrease our request per second to CollectAPI
2. Mobile Responsive
3. Animation and loading states

## Limitation
1. OMDb API is still not responding to my request to have an access to their api, instead i used CollectAPI to their free and limited service
2. CollectAPI IMDb service doesn't have paging so infinite/paged results is not achievable
        - Note: although we can simulate paginated results through slicing the search results into desired page size
