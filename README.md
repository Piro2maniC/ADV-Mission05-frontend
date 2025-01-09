# Trade Me Clone Frontend

A modern React-based frontend application for an online auction platform, inspired by Trade Me. This application provides a rich user interface for browsing, searching, and comparing auction items.

## Features

- **Advanced Search Functionality**
  - Real-time search with keyword filtering
  - Category-based filtering
  - Location-based filtering
  - Dynamic result updates

- **Dual View Modes**
  - Grid view for visual browsing
  - List view for detailed information
  - Easy toggle between views

- **Item Comparison**
  - Compare up to 2 items side by side
  - Quick add/remove from comparison
  - Detailed comparison view

- **Item Cards**
  - Image preview with loading states
  - Reserve status indication
  - Current bid display
  - Buy Now option
  - Shipping information
  - Watchlist functionality
  - Time remaining countdown

## Technology Stack

- **Framework**: React.js
- **Routing**: React Router v6
- **Styling**: CSS Modules
- **State Management**: React Hooks
- **HTTP Client**: Fetch API
- **Asset Management**: Webpack
- **Development Server**: Vite

## Project Structure

```
src/
├── assets/           # Static assets (images, icons)
├── components/       # React components
│   ├── pages/       # Page-level components
│   │   ├── Search/  # Search page components
│   │   └── ...
│   └── shared/      # Shared/reusable components
├── styles/          # CSS modules
└── App.jsx          # Root component
```

## Getting Started

1. **Prerequisites**
   - Node.js (v14 or higher)
   - npm or yarn

2. **Installation**
   ```bash
   # Clone the repository
   git clone https://github.com/Piro2maniC/ADV-Mission05-frontend.git

   # Navigate to project directory
   cd ADV-Mission05-frontend

   # Install dependencies
   npm install
   ```

3. **Development**
   ```bash
   # Start development server
   npm run dev
   ```
   The application will be available at `http://localhost:5173`

4. **Building for Production**
   ```bash
   # Create production build
   npm run build
   ```

## Component Documentation

### Search Component
The main search page component that handles:
- Search query management
- Category filtering
- View mode switching
- Item comparison management

### SearchCard Component
Individual item card component featuring:
- Image display with loading states
- Reserve status indication
- Current bid display
- Compare functionality
- Buy Now option
- Shipping information

## Styling

The project uses CSS Modules for styling, providing:
- Scoped styling per component
- Reusable style compositions
- Dynamic class application
- Responsive design

Key style files:
- `search.module.css`: Styles for the search page layout
- `SearchCard.module.css`: Styles for individual item cards

## API Integration

The frontend communicates with the backend API for:
- Fetching auction items
- Searching and filtering
- Item comparison
- User interactions

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details
