import { Suspense, lazy } from "react";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import { Route, Routes } from "react-router-dom";
import Loader from "./components/Loader";
import ProtectedRoute from "./components/ProtectedRoute";

const About = lazy(() => import("./pages/About"));
const SearchListing = lazy(() => import("./pages/SearchListing"));
const ListDetails = lazy(() => import("./pages/ListDetails"));
const CreateList = lazy(() => import("./pages/CreateList"));
const EditList = lazy(() => import("./pages/EditList"));
const Account = lazy(() => import("./pages/Account"));
const SignIn = lazy(() => import("./pages/SignIn"));
const SignUp = lazy(() => import("./pages/SignUp"));
const App = () => {
  return (
    <div className="max-w-[2100px] mx-auto xll:text-[40px]">
      <Navbar />
      <Suspense fallback={<Loader />}>
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/listing/:id" element={<ListDetails />} />
          <Route path="/search" element={<SearchListing />} />
          <Route path="/about" element={<About />} />

          <Route
            path="/account"
            element={
              <ProtectedRoute>
                <Account />
              </ProtectedRoute>
            }
          />
          <Route
            path="/createlist"
            element={
              <ProtectedRoute>
                <CreateList />
              </ProtectedRoute>
            }
          />
          <Route
            path="/editlist/:id"
            element={
              <ProtectedRoute>
                <EditList />
              </ProtectedRoute>
            }
          />
        </Routes>
      </Suspense>
    </div>
  );
};

export default App;
