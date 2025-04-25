export const isValidEmail = (email) => {
     const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
     return regex.test(email);
   };
   
   export const isValidDate = (date) => {
     return !isNaN(Date.parse(date));
   };
   
   export const isEmpty = (value) => {
     return !value || value.trim() === "";
   };
   