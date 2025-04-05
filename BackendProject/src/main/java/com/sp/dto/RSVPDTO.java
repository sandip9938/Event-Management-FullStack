package com.sp.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

/**
 * ✅ DTO for representing RSVP information.
 * Includes RSVP ID, associated user ID, event ID, and attendance status.
 */

@Data // ✅ Lombok: generates getters, setters, toString, equals, and hashCode
@AllArgsConstructor // ✅ Generates constructor with all fields
public class RSVPDTO {

    private Long id;           // ✅ Unique identifier for the RSVP
    private Long userId;       // ✅ ID of the user who RSVPed
    private Long eventId;      // ✅ ID of the event
    private boolean isAttending; // ✅ Indicates attendance (true = attending, false = not attending)

}
