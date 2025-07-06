# React Trading App

A modern, responsive trading application built with React that allows users to select brokers, manage holdings, view orderbooks, track positions, and place buy/sell orders.

## Features

### 🏦 Broker Login System
- **Multiple Broker Options**: Choose from popular Indian brokers (Zerodha, Upstox, Angel One, Groww)
- **Secure Login**: Handle various backend responses (200, 400, 500) with proper error handling
- **Modern UI**: Beautiful gradient backgrounds and smooth transitions

### 📱 Navigation & Screens
- **Bottom Navigation**: Three main screens with intuitive icons
  - **Holdings**: Display stock holdings with P&L information
  - **Orderbook**: View past orders with Realized/Unrealized P&L summary
  - **Positions**: Track active trades with detailed P&L cards

### 💰 Trading Features
- **Order Pad**: Professional trading interface with green/red themes for Buy/Sell
- **Stock Selection**: Click any stock to open order pad
- **Order Types**: Market, Limit, and Stop Loss orders
- **Real-time Calculations**: Order value, brokerage, and total calculations

### 🎯 Floating Action Button (FAB)
- **Draggable FAB**: Move the button anywhere on screen
- **Expandable Options**: Click to reveal Buy/Sell options
- **Auto Stock Selection**: Automatically selects top-listed stock or fallback

### 🎨 Modern UI/UX
- **Responsive Design**: Works perfectly on desktop and mobile
- **Smooth Animations**: Hover effects, transitions, and loading states
- **Error Handling**: User-friendly error messages and retry options
- **Loading States**: Proper loading indicators for all API calls

## Technology Stack

- **React 18**: Modern React with hooks
- **CSS3**: Custom styling with modern design patterns
- **Mock APIs**: Simulated backend responses for realistic testing
- **Responsive Design**: Mobile-first approach

## Project Structure

```
src/
├── api/
│   └── mockApi.js          # Mock API functions
├── components/
│   ├── BrokerSelection.js   # Broker selection screen
│   ├── LoginForm.js        # Login form with error handling
│   ├── BottomNavigation.js # Bottom navigation bar
│   ├── Holdings.js         # Holdings screen
│   ├── Orderbook.js        # Orderbook screen
│   ├── Positions.js        # Positions screen
│   ├── OrderPad.js         # Trading order pad
│   ├── FloatingActionButton.js # Draggable FAB
│   └── *.css              # Component-specific styles
├── App.js                  # Main application component
├── App.css                 # App-level styles
├── index.js               # Application entry point
└── index.css              # Global styles
```

## Getting Started

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd react-trading-app
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm start
   ```

4. **Open your browser**
   Navigate to `http://localhost:3000`

## Usage

### Demo Credentials
- **Username**: `demo`
- **Password**: `demo123`

### Features Walkthrough

1. **Broker Selection**: Choose your preferred broker from the available options
2. **Login**: Use demo credentials to log in (simulates various response scenarios)
3. **Navigation**: Use bottom navigation to switch between Holdings, Orderbook, and Positions
4. **Trading**: 
   - Click any stock to open order pad
   - Use the floating action button for quick Buy/Sell
   - Drag the FAB to reposition it
5. **Order Placement**: Fill order details and submit trades

## API Simulation

The app includes realistic mock APIs that simulate:
- **Login Responses**: 70% success, 15% invalid credentials, 15% server error
- **Holdings Data**: Realistic stock holdings with P&L calculations
- **Orderbook Data**: Past orders with status and P&L summary
- **Positions Data**: Active trades with detailed information
- **Order Placement**: Simulated order processing with delays

## Key Features Explained

### Error Handling
- **Login Errors**: Clear messages for invalid credentials and server errors
- **API Errors**: Retry buttons and user-friendly error messages
- **Loading States**: Proper loading indicators for all async operations

### Responsive Design
- **Mobile-First**: Optimized for mobile devices
- **Desktop Support**: Full functionality on larger screens
- **Touch-Friendly**: Large touch targets and intuitive gestures

### Modern UI Elements
- **Gradient Backgrounds**: Beautiful color schemes
- **Card Design**: Clean, modern card layouts
- **Hover Effects**: Interactive elements with smooth transitions
- **Color Coding**: Green for positive values, red for negative

## Customization

### Adding New Brokers
Edit `src/api/mockApi.js` to add more broker options:
```javascript
export const brokers = [
  // Add your broker here
  {
    id: 5,
    name: 'Your Broker',
    logo: '🟦',
    description: 'Your broker description'
  }
];
```

### Modifying Mock Data
Update the mock API functions to change the simulated data:
- `getHoldings()` - Modify holdings data
- `getOrderbook()` - Change orderbook structure
- `getPositions()` - Update positions data

### Styling Changes
All components use CSS files that can be easily modified:
- Color schemes in component CSS files
- Layout adjustments in responsive breakpoints
- Animation timing in transition properties

## Browser Support

- Chrome (recommended)
- Firefox
- Safari
- Edge

## Performance

- **Optimized Rendering**: Efficient React component structure
- **Lazy Loading**: Components load only when needed
- **Minimal Dependencies**: Lightweight with no unnecessary packages
- **Responsive Images**: Optimized for different screen sizes

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is for educational purposes and demonstrates modern React development practices.

---

**Built with ❤️ using React and modern web technologies** 