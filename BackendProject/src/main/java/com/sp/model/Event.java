package com.sp.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

/**
 * Entity class representing an event in the system.
 */
@Entity
@Data
@Table(name = "events")
@AllArgsConstructor
@NoArgsConstructor
public class Event {

    // Primary key with auto-increment strategy
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // Event name must not be blank
    @NotBlank(message = "Event name is required")
    private String name;

    // Optional event description
    private String description;

    // Event date must not be null
    @NotNull(message = "Event date is required")
    private LocalDateTime date;

    // Location must not be blank
    @NotBlank(message = "Event location is required")
    private String location;

    // Lombok generates getters, setters, constructors, and toString/hashCode methods
}
