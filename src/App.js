import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useNavigate,
} from "react-router-dom";
import { brokers, loginUser } from "./api/mockApi";
import Header from "./components/common/Header/Header";
import LandingPage from "./components/LandingPage/LandingPage";
import BrokerSelection from "./components/BrokerSelection/BrokerSelection";
import LoginForm from "./components/LoginForm/LoginForm";
import BottomNavigation from "./components/common/BottomNavigation";
import Holdings from "./pages/holidings/Holdings";
import Orderbook from "./pages/order/Orderbook";
import Positions from "./pages/positions/Positions";
import OrderPad from "./components/BuySellModal/OrderPad";
import FloatingActionButton from "./components/common/ActionButton/FloatingActionButton";
import Footer from "./components/common/Footer/Footer";
import "./App.css";
import Toast from "./components/Toast/Toast";

// Main App Component with Routes
function AppRoutes() {
  const [selectedBroker, setSelectedBroker] = useState(() => {
    const stored = localStorage.getItem("tradingApp_broker");
    return stored ? JSON.parse(stored) : null;
  });
  const [user, setUser] = useState(() => {
    const stored = localStorage.getItem("tradingApp_user");
    return stored ? JSON.parse(stored) : null;
  });
  const [activeTab, setActiveTab] = useState("holdings");
  const [orderPad, setOrderPad] = useState({
    show: false,
    stock: null,
    type: null,
  });
  const [currentStocks, setCurrentStocks] = useState([]);
  const [toast, setToast] = useState({
    show: false,
    message: "",
    type: "success",
  });
  const navigate = useNavigate();

  const handleGetStarted = () => {
    // Scroll to broker selection section
    const brokerSection = document.querySelector(".broker-selection-section");
    if (brokerSection) {
      brokerSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleBrokerSelection = (broker) => {
    setSelectedBroker(broker);
    navigate("/login");
  };

  const handleLogin = async (brokerId, credentials) => {
    try {
      const response = await loginUser(brokerId, credentials);

      if (response.status === 200) {
        setUser(response.data);
        navigate("/app");

        // Save to localStorage
        localStorage.setItem("tradingApp_user", JSON.stringify(response.data));
        localStorage.setItem(
          "tradingApp_broker",
          JSON.stringify(selectedBroker)
        );
      } else if (response.status === 400) {
        // Handle client-side errors (bad request, validation errors)
        throw new Error(
          response.error || "Invalid request. Please check your input."
        );
      } else if (response.status === 500) {
        // Handle server-side errors
        throw new Error(
          response.error || "Server error. Please try again later."
        );
      } else {
        // Handle unexpected status codes
        throw new Error("An unexpected error occurred. Please try again.");
      }
    } catch (error) {
      throw error;
    }
  };

  const handleBackToBrokers = () => {
    setSelectedBroker(null);
    navigate("/");
  };

  const handleLogout = () => {
    setUser(null);
    setSelectedBroker(null);
    navigate("/");
    localStorage.removeItem("tradingApp_user");
    localStorage.removeItem("tradingApp_broker");
  };

  const handleStockSelect = (stock) => {
    // Ensure stock object has required properties
    if (stock && stock.symbol && stock.name) {
      setOrderPad({ show: true, stock, type: "BUY" });
    } else {
      console.error("Invalid stock object:", stock);
    }
  };

  const handleOrderPlaced = (orderData) => {
    console.log("Order placed:", orderData);
  };

  // Get the top stock from current stocks or fallback
  const getTopStock = () => {
    if (currentStocks && currentStocks.length > 0) {
      return currentStocks[0];
    }
    // Fallback to first stock alphabetically from mock data
    return { symbol: "AAPL", name: "Apple Inc." };
  };

  const handleBuyOrder = (stock) => {
    const selectedStock = stock || getTopStock();
    if (selectedStock && selectedStock.symbol && selectedStock.name) {
      setOrderPad({ show: true, stock: selectedStock, type: "BUY" });
    }
  };

  const handleSellOrder = (stock) => {
    const selectedStock = stock || getTopStock();
    if (selectedStock && selectedStock.symbol && selectedStock.name) {
      setOrderPad({ show: true, stock: selectedStock, type: "SELL" });
    }
  };

  const handleCloseOrderPad = () => {
    setOrderPad({ show: false, stock: null, type: null });
  };

  const handleStocksUpdate = (stocks) => {
    setCurrentStocks(stocks);
  };

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  });

  // Toast functions
  const showToast = (message, type = "success") => {
    setToast({ show: true, message, type });
  };

  const hideToast = () => {
    setToast({ show: false, message: "", type: "success" });
  };

  // Set up global toast function
  useEffect(() => {
    window.showToast = showToast;
    return () => {
      delete window.showToast;
    };
  }, []);

  return (
    <div className="app-wrapper">
      <Routes>
        <Route
          path="/"
          element={
            <div className="landing-container">
              <Header appName="TradeFlow" showBackButton={false} />
              <LandingPage onGetStarted={handleGetStarted} />
              <div className="broker-selection-section">
                <BrokerSelection
                  brokers={brokers}
                  onSelectBroker={handleBrokerSelection}
                />
              </div>
              <Footer />
            </div>
          }
        />

        {/* Login Route */}
        <Route
          path="/login"
          element={
            selectedBroker ? (
              <div className="app-container">
                <Header
                  appName="TradeFlow"
                  brokerName={selectedBroker?.name}
                  brokerLogo={selectedBroker?.logo}
                  onBack={handleBackToBrokers}
                  showBackButton={true}
                />
                <LoginForm
                  selectedBroker={selectedBroker}
                  onLogin={handleLogin}
                  onBack={handleBackToBrokers}
                />
                <Footer />
              </div>
            ) : (
              <Navigate to="/" replace />
            )
          }
        />

        {/* Main App Route */}
        <Route
          path="/app"
          element={
            user ? (
              <div className="app-container">
                {/* {console.log("Rendering app with user:", user)} */}
                {/* Debug log */}
                <Header
                  appName="TradeFlow"
                  userName={user?.name}
                  brokerName={selectedBroker?.name}
                  brokerLogo={selectedBroker?.logo}
                  onLogout={handleLogout}
                />
                <div className="app-content">
                  {activeTab === "holdings" && (
                    <>
                      <Holdings
                        onStockSelect={handleStockSelect}
                        onStocksUpdate={handleStocksUpdate}
                      />
                      <Footer />
                    </>
                  )}
                  {activeTab === "orderbook" && (
                    <>
                      <Orderbook
                        onStockSelect={handleStockSelect}
                        onStocksUpdate={handleStocksUpdate}
                      />
                      <Footer />
                    </>
                  )}
                  {activeTab === "positions" && (
                    <>
                      <Positions
                        onStockSelect={handleStockSelect}
                        onStocksUpdate={handleStocksUpdate}
                      />
                      <Footer />
                    </>
                  )}
                </div>
                <BottomNavigation
                  activeTab={activeTab}
                  onTabChange={setActiveTab}
                />
                <FloatingActionButton
                  onBuy={handleBuyOrder}
                  onSell={handleSellOrder}
                  currentStocks={currentStocks}
                />
                {orderPad.show && (
                  <OrderPad
                    stock={orderPad.stock}
                    orderType={orderPad.type}
                    onClose={handleCloseOrderPad}
                    onOrderPlaced={handleOrderPlaced}
                    stocks={currentStocks}
                  />
                )}
                <Toast
                  message={toast.message}
                  type={toast.type}
                  isVisible={toast.show}
                  onClose={hideToast}
                />
              </div>
            ) : (
              <Navigate to="/" replace />
            )
          }
        />
      </Routes>
    </div>
  );
}

function App() {
  return (
    <Router>
      <AppRoutes />
    </Router>
  );
}

export default App;
