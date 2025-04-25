export const handleApiError = (error) => {
     if (error.response) {
       console.error("API Error:", error.response.data.message);
       return error.response.data.message;
     } else if (error.request) {
       console.error("Network Error: No response from server");
       return "Network error: No response from server";
     } else {
       console.error("Error:", error.message);
       return error.message;
     }
   };
   