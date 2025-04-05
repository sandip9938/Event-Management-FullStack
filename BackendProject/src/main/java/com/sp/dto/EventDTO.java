package com.sp.dto;

import java.time.LocalDateTime;

import lombok.AllArgsConstructor;
import lombok.Data;

/**
 * ✅ DTO for transferring Event data between layers.
 * Contains event ID, name, description, scheduled date/time, and location.
 */

@Data // ✅ Generates getters, setters, toString, equals, hashCode
@AllArgsConstructor // ✅ Generates constructor with all fields
public class EventDTO {

    private Long id;
    private String name;
    private String description;
    private LocalDateTime date; // ✅ Represents date and time (better than Date for clarity and precision)
    private String location;
}
