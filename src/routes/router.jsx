import React, { lazy, Suspense } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ProtectedRoute from "./protectedRoute";

const LandingPage = lazy(() => import("../Landing.jsx"));
const AdminLayout = lazy(() => import("../layouts/adminLayout.jsx"));
const AdminDashboard = lazy(() => import("../pages/admin/adminDashboard.jsx"));
const SignIn = lazy(() => import("../pages/common/Signin.jsx"));
const RegistrationForm = lazy(() => import("../pages/common/registration/register.jsx"));
const CommonLayout = lazy(() => import("../layouts/commonLayout.jsx"));
const PaymentSuccess = lazy(() => import("../pages/common/PaymentSuccess.jsx"));
const PaymentFailure = lazy(() => import("../pages/common/paymentFailure.jsx"));
const Unauthorized = lazy(() => import("../pages/common/unauthorized.jsx"));
const ErrorFallback = lazy(() => import("../pages/common/ErrorFallback.jsx"));
const UserLayout = lazy(() => import("../layouts/userLayout.jsx"));
const UserDashboard = lazy(() => import("../pages/users/userDashBoard.jsx"));
const MyFiles = lazy(() => import("../pages/users/myFiles.jsx"));
const ProcessPdf = lazy(() => import("../pages/ProcessPdf.jsx"));
const ViewPdf = lazy(() => import("../pages/users/ViewPdf.jsx"));

export const MyRouter = function () {
  return (
    <Router>
      <Routes>
        <Route index element={<LandingPage />} />
        <Route element={<CommonLayout />}>
          <Route path="/login" element={<SignIn />} />
          <Route path="/register" element={<RegistrationForm />} />
          <Route path="/paymentSuccess" element={<PaymentSuccess />} />
          <Route path="/paymentFailure" element={<PaymentFailure />} />
          <Route path="/unauthorized" element={<Unauthorized />} />
          <Route path="/error" element={<ErrorFallback />} />
        </Route>

        <Route
          path="user"
          element={
            <Suspense fallback={<div>Loading...</div>}>
              <ProtectedRoute element={<UserLayout />} allowedRoles={["user"]} />
            </Suspense>
          }
        >
          <Route
            index
            path="dashboard"
            element={
              <Suspense fallback={<div>Loading...</div>}>
                <ProtectedRoute element={<UserDashboard />} allowedRoles={["user"]} />
              </Suspense>
            }
          />
          <Route
            path="my-files"
            element={
              <Suspense fallback={<div>Loading...</div>}>
                <ProtectedRoute element={<MyFiles />} allowedRoles={["user"]} />
              </Suspense>
            }
          />
          <Route
            path="view-pdf/:id"
            element={
              <Suspense fallback={<div>Loading...</div>}>
                <ProtectedRoute element={<ViewPdf />} allowedRoles={["user"]} />
              </Suspense>
            }
          />
          <Route
            path="upload"
            element={
              <Suspense fallback={<div>Loading...</div>}>
                <ProcessPdf />
              </Suspense>
            }
          />
        </Route>

        <Route path="admin" element={<Suspense fallback={<div>Loading...</div>}><AdminLayout /></Suspense>}>
          <Route
            index
            path="dashboard"
            element={<Suspense fallback={<div>Loading...</div>}><AdminDashboard /></Suspense>}
          />



        </Route>
      </Routes>
    </Router>
  );
};
