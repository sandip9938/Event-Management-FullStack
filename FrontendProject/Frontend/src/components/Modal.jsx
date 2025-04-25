import React, { useEffect, useRef } from "react";
import {  AnimatePresence } from "framer-motion";

const Modal = ({ 
  title, 
  children, 
  isOpen, 
  onClose, 
  showCloseButton = true, 
  primaryButton = null 
}) => {
  const modalRef = useRef(null);

  // Close modal when clicking outside
  const handleBackdropClick = (e) => {
    if (modalRef.current && !modalRef.current.contains(e.target)) {
      onClose();
    }
  };

  // Auto-focus close button when modal opens (Accessibility Improvement)
  const closeButtonRef = useRef(null);
  useEffect(() => {
    if (isOpen && closeButtonRef.current) {
      closeButtonRef.current.focus();
    }
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <div 
          className="fixed inset-0 flex items-center justify-center bg-black/50 z-50"
          onClick={handleBackdropClick}
        >
          {/* Modal Container with Enhanced Animation */}
          <motion.div
            ref={modalRef}
            initial={{ opacity: 0, scale: 0.85, y: -20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.85, y: -20 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="bg-white rounded-2xl shadow-2xl max-w-lg w-full p-6 relative"
          >
            {/* Close Button */}
            {showCloseButton && (
              <button
                ref={closeButtonRef}
                onClick={onClose}
                className="absolute top-3 right-3 text-gray-500 hover:text-gray-900 text-2xl focus:outline-none"
              >
                &times;
              </button>
            )}

            {/* Modal Title */}
            {title && <h2 className="text-2xl font-bold text-gray-800 text-center mb-4">{title}</h2>}

            {/* Modal Content */}
            <div className="text-gray-700">{children}</div>

            {/* Modal Footer Buttons */}
            <div className="mt-6 flex justify-end space-x-3">
              <button
                onClick={onClose}
                className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-100 transition"
              >
                Close
              </button>

              {primaryButton && (
                <button
                  onClick={primaryButton.onClick}
                  className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
                >
                  {primaryButton.label}
                </button>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default Modal;
