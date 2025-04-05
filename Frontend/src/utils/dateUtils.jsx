export const formatDate = (dateString) => {
     const options = { year: "numeric", month: "long", day: "numeric" };
     return new Date(dateString).toLocaleDateString(undefined, options);
   };
   
   export const getCurrentDate = () => {
     return new Date().toISOString().split("T")[0]; // Returns YYYY-MM-DD format
   };
   