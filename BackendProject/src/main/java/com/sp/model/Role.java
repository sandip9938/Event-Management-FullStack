package com.sp.model;

/**
 * Enum representing different user roles in the application.
 * These roles can be used for authorization and access control.
 */
public enum Role {
    ADMIN,     // Full access to the system (manage users, events, etc.)
    USER,      // Regular user (can RSVP, view events)
    MODERATOR  // Can manage content (optional: review or manage events/RSVPs)
}
