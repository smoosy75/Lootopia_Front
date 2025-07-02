// src/pages/App.tsx

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Register from "./Register";
import Login from "./Login";
// Home.tsx est situé à la racine src/, on remonte d’un dossier
import Home from "../Home";

import Dashboard from "./Admin/Dashboard";
import MyHunts from "./MyHunts";
import Layout from "../components/Layout";
import { AuthProvider, useAuth } from "../context/AuthContext";

import UserRewards from "./Player/UserRewards";
import UserShop from "./Player/UserShop";
import OrganizerCreateHunt from "./Organiser/OrganizerCreateHunt";
import OrganizerRewards from "./Organiser/OrganizerRewards";
import OrganizerPartners from "./Organiser/OrganizerPartners";
import AdminUsers from "./Admin/AdminUsers";
import AdminStats from "./Admin/AdminStats";
import AdminModeration from "./Admin/AdminModeration";
import PartnerHome from "./Partner/PartnerHome";
import PartnerSponsors from "./Partner/PartnerSponsors";

// La page de jeu est dans src/pages, on importe depuis ce même dossier
import TreasureHunt from "./TreasureHunt";

import Footer from "../components/Footer";

function PrivateRoute({ children }: { children: React.ReactNode }) {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? <>{children}</> : <Home />;
}

function AppRoutes() {
  const { isAuthenticated } = useAuth();

  return (
    <Router>
      <Routes>
        {/* Routes publiques */}
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />

        {/* Page d’accueil */}
        <Route
          path="/"
          element={
            isAuthenticated ? (
              <Layout>
                <Home />
              </Layout>
            ) : (
              <>
                <Home />
                <Footer />
              </>
            )
          }
        />

        {/* Page de jeu */}
        <Route path="/game" element={<TreasureHunt />} />

        {/* Routes privées ADMIN */}
        <Route
          path="/admin"
          element={
            <PrivateRoute>
              <Layout>
                <Dashboard />
              </Layout>
            </PrivateRoute>
          }
        />
        <Route
          path="/admin/users"
          element={
            <PrivateRoute>
              <Layout>
                <AdminUsers />
              </Layout>
            </PrivateRoute>
          }
        />
        <Route
          path="/admin/stats"
          element={
            <PrivateRoute>
              <Layout>
                <AdminStats />
              </Layout>
            </PrivateRoute>
          }
        />
        <Route
          path="/admin/moderation"
          element={
            <PrivateRoute>
              <Layout>
                <AdminModeration />
              </Layout>
            </PrivateRoute>
          }
        />

        {/* Routes privées ORGANISATEUR */}
        <Route
          path="/organizer/hunts/create"
          element={
            <PrivateRoute>
              <Layout>
                <OrganizerCreateHunt />
              </Layout>
            </PrivateRoute>
          }
        />
        <Route
          path="/organizer/rewards"
          element={
            <PrivateRoute>
              <Layout>
                <OrganizerRewards />
              </Layout>
            </PrivateRoute>
          }
        />
        <Route
          path="/organizer/partners"
          element={
            <PrivateRoute>
              <Layout>
                <OrganizerPartners />
              </Layout>
            </PrivateRoute>
          }
        />

        {/* Routes privées JOUEUR */}
        <Route
          path="/user/hunts"
          element={
            <PrivateRoute>
              <Layout>
                <MyHunts />
              </Layout>
            </PrivateRoute>
          }
        />
        <Route
          path="/user/rewards"
          element={
            <PrivateRoute>
              <Layout>
                <UserRewards />
              </Layout>
            </PrivateRoute>
          }
        />
        <Route
          path="/user/shop"
          element={
            <PrivateRoute>
              <Layout>
                <UserShop />
              </Layout>
            </PrivateRoute>
          }
        />

        {/* Routes privées PARTENAIRE */}
        <Route
          path="/partner/home"
          element={
            <PrivateRoute>
              <Layout>
                <PartnerHome />
              </Layout>
            </PrivateRoute>
          }
        />
        <Route
          path="/partner/sponsors"
          element={
            <PrivateRoute>
              <Layout>
                <PartnerSponsors />
              </Layout>
            </PrivateRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <AppRoutes />
    </AuthProvider>
  );
}
