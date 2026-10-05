import {
    BrowserRouter,
    Routes,
    Route,
} from "react-router-dom";

import ScrollToTop from "../components/common/ScrollToTop";
import Home from "../pages/home/Home";
import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";
import Shop from "../pages/products/Shop";
import ProductDetails from "../pages/products/ProductDetails";

// Cart & Checkout Flow
import Cart from "../pages/cart/Cart";
import Checkout from "../pages/checkout/Checkout";
import OrderSuccess from "../pages/checkout/OrderSuccess";

// Common Utility Pages
import NotFound from "../pages/common/NotFound";
import Maintenance from "../pages/common/Maintenance";

// Dashboards (Admin, Vendor, User Profile)
import AdminDashboard from "../pages/admin/AdminDashboard";
import VendorDashboard from "../pages/vendor/VendorDashboard";
import UserDashboard from "../pages/profile/UserDashboard";

// Client Care Pages
import TrackOrder from "../pages/footer/TrackOrder";
import ReturnPolicy from "../pages/footer/ReturnPolicy";
import ShippingPolicy from "../pages/footer/ShippingPolicy";
import BatCareGuide from "../pages/footer/BatCareGuide";
import WarrantyRegistration from "../pages/footer/WarrantyRegistration";
import ContactSupport from "../pages/footer/ContactSupport";

// Company Pages
import AboutUs from "../pages/footer/AboutUs";
import BrandPartners from "../pages/footer/BrandPartners";
import Sustainability from "../pages/footer/Sustainability";
import Sponsorships from "../pages/footer/Sponsorships";
import Careers from "../pages/footer/Careers";
import StoreLocator from "../pages/footer/StoreLocator";

// Legal & Directory Pages
import PrivacyPolicy from "../pages/footer/PrivacyPolicy";
import TermsOfService from "../pages/footer/TermsOfService";
import SecurityPolicy from "../pages/footer/SecurityPolicy";
import Sitemap from "../pages/footer/Sitemap";

const AppRoutes = () => {
    return (
        <BrowserRouter>
            <ScrollToTop />
            <Routes>
                {/* Core App Routes */}
                <Route
                    path="/"
                    element={<Home />}
                />

                <Route
                    path="/login"
                    element={<Login />}
                />

                <Route
                    path="/register"
                    element={<Register />}
                />

                <Route
                    path="/shop"
                    element={<Shop />}
                />

                <Route
                    path="/products/:slug"
                    element={<ProductDetails />}
                />

                {/* Cart & Checkout Commerce Routes */}
                <Route
                    path="/cart"
                    element={<Cart />}
                />

                <Route
                    path="/checkout"
                    element={<Checkout />}
                />

                <Route
                    path="/order-success"
                    element={<OrderSuccess />}
                />

                {/* Dashboards (Admin, Vendor, User Profile) */}
                <Route
                    path="/admin"
                    element={<AdminDashboard />}
                />

                <Route
                    path="/vendor"
                    element={<VendorDashboard />}
                />

                <Route
                    path="/profile"
                    element={<UserDashboard />}
                />

                <Route
                    path="/dashboard"
                    element={<UserDashboard />}
                />

                {/* Maintenance Mode */}
                <Route
                    path="/maintenance"
                    element={<Maintenance />}
                />

                {/* Client Care Routes */}
                <Route
                    path="/track-order"
                    element={<TrackOrder />}
                />

                <Route
                    path="/return-policy"
                    element={<ReturnPolicy />}
                />

                <Route
                    path="/shipping"
                    element={<ShippingPolicy />}
                />

                <Route
                    path="/cricket-bat-guide"
                    element={<BatCareGuide />}
                />

                <Route
                    path="/warranty"
                    element={<WarrantyRegistration />}
                />

                <Route
                    path="/contact"
                    element={<ContactSupport />}
                />

                {/* Company Routes */}
                <Route
                    path="/about"
                    element={<AboutUs />}
                />

                <Route
                    path="/brand-partners"
                    element={<BrandPartners />}
                />

                <Route
                    path="/sustainability"
                    element={<Sustainability />}
                />

                <Route
                    path="/sponsorships"
                    element={<Sponsorships />}
                />

                <Route
                    path="/careers"
                    element={<Careers />}
                />

                <Route
                    path="/store-locator"
                    element={<StoreLocator />}
                />

                {/* Legal & Directory Routes */}
                <Route
                    path="/privacy-policy"
                    element={<PrivacyPolicy />}
                />

                <Route
                    path="/terms-of-service"
                    element={<TermsOfService />}
                />

                <Route
                    path="/security"
                    element={<SecurityPolicy />}
                />

                <Route
                    path="/sitemap"
                    element={<Sitemap />}
                />

                {/* 404 Not Found Page */}
                <Route
                    path="/404"
                    element={<NotFound />}
                />

                <Route
                    path="*"
                    element={<NotFound />}
                />
            </Routes>
        </BrowserRouter>
    );
};

export default AppRoutes;