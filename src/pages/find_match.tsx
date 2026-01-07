// import React, { useEffect } from "react";
// import { useState } from "react";
// import { useNavigate } from "react-router-dom";

// const FindMatch = () => {
//   const navigate = useNavigate();

//   useEffect(() => {
//     const handleMessage = (event: MessageEvent) => {
//       if (
//         event.origin === "https://formshare.ai" &&
//         event.data === "form_submitted"
//       ) {
//         navigate("/match-result");
//       }
//     };
//     window.addEventListener("message", handleMessage);
//     return () => window.removeEventListener("message", handleMessage);
//   }, [navigate]);

//   return (
//     <div style={{ position: "relative", height: "100vh", width: "100%" }}>
//       <iframe
//         style={{ height: "100%", width: "100%" }}
//         width="100%"
//         height="100%"
//         src="https://formshare.ai/r/0rHXDfX8KM"
//         referrerPolicy="strict-origin-when-cross-origin"
//         allowFullScreen
//         title="Find Match Form"
//       />
//       <button
//         style={{
//           position: "absolute",
//           bottom: 24,
//           left: "50%",
//           transform: "translateX(-50%)",
//           padding: "12px 24px",
//           background: "#2563eb",
//           color: "#fff",
//           border: "none",
//           borderRadius: "8px",
//           fontSize: "1rem",
//           cursor: "pointer",
//           zIndex: 10,
//         }}
//         onClick={() => navigate("/match-result")}
//       >
//         See My Match
//       </button>
//     </div>
//   );
// };

// export default FindMatch;

import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const FindMatch = () => {
  const navigate = useNavigate();

  // 1. Get the current userId (Fallback to "1" for your local single-user flow)
  const userId = localStorage.getItem("userId") || "1";

  // 2. Add the userId as a query parameter to the URL
  const formUrl = `https://formshare.ai/r/0rHXDfX8KM?userId=${userId}`;

  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      if (
        event.origin === "https://formshare.ai" &&
        event.data === "form_submitted"
      ) {
        navigate("/match-result");
      }
    };
    window.addEventListener("message", handleMessage);
    return () => window.removeEventListener("message", handleMessage);
  }, [navigate]);

  return (
    <div style={{ position: "relative", height: "100vh", width: "100%" }}>
      <iframe
        style={{ height: "100%", width: "100%", border: "none" }}
        width="100%"
        height="100%"
        src={formUrl} // 3. Use the dynamic URL here
        referrerPolicy="strict-origin-when-cross-origin"
        allowFullScreen
        title="Find Match Form"
      />
      
      {/* Optional: You can keep this button for testing, 
          but usually the iframe redirect handles navigation */}
      <button
        style={{
          position: "absolute",
          bottom: 24,
          left: "50%",
          transform: "translateX(-50%)",
          padding: "12px 24px",
          background: "#2563eb",
          color: "#fff",
          border: "none",
          borderRadius: "8px",
          fontSize: "1rem",
          cursor: "pointer",
          zIndex: 10,
        }}
        onClick={() => navigate("/match-result")}
      >
        See My Match
      </button>
    </div>
  );
};

export default FindMatch;