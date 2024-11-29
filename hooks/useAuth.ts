// import { useEffect, useCallback } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { useRouter } from "next/router";
// import Cookies from "universal-cookie";
// import { AppDispatch, RootState } from "../redux/store"; // Update the path as necessary
// import {
//   onLoadingProfile,
//   onLogOut,
//   ProfileSliceType,
// } from "@/redux/profile/profileSlice";

// const useAuth = () => {
//   const dispatch = useDispatch<AppDispatch>();
//   const router = useRouter();
//   const cookies = new Cookies();

//   const { hasToken, customerToken, loadingProfile } = useSelector<
//     RootState,
//     ProfileSliceType
//   >((state) => state.profileSlice);

//   // Function to check login and handle routing
//   const checkLogin = useCallback(() => {
//     const token = cookies.get("token");
//     // Memoize the dispatch functions to prevent unnecessary re-creation

//     if (!token) {
//       const protectedPaths = ["/basket", "/profile"];
//       const currentPath = router.pathname;

//       if (protectedPaths.some((path) => currentPath.includes(path))) {
//         console.log("Redirecting from:", currentPath);
//         router.push("/");
//       }
//     }
//   }, [router]);

//   // Function to fetch and initialize the user's pre-invoice data

//   // Function to load the user's profile
//   const loadProfile = useCallback(async () => {
//     if (hasToken && !loadingProfile) {
//       try {
//         dispatch(onLoadingProfile(true));
//         // const res = await getMyProfile(customerToken.token);
//         // dispatch(onCheckProfile(res.data.result.data));
//         // dispatch(onSetProfile(res.data.result.data));
//       } catch (err) {
//         console.error("Error loading profile:", err);
//         dispatch(onLogOut());
//       } finally {
//         dispatch(onLoadingProfile(false));
//       }
//     }
//   }, [hasToken, loadingProfile, customerToken.token, dispatch]);

//   useEffect(() => {
//     checkLogin(); // Check login status on route change
//   }, [router.pathname, checkLogin]);

//   useEffect(() => {
//     loadProfile(); // Load profile when the user has a token
//   }, [hasToken, loadProfile]);
// };

// export default useAuth;
