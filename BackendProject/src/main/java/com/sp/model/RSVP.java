package com.sp.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@Table(
    name = "rsvps",
    uniqueConstraints = @UniqueConstraint(columnNames = {"user_id", "event_id"}) // Ensures a user can't RSVP to the same event more than once
)
@AllArgsConstructor
@NoArgsConstructor // Required by JPA
public class RSVP {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id; // Primary key

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private User user; // The user who RSVPed

    @ManyToOne
    @JoinColumn(name = "event_id", nullable = false)
    private Event event; // The event to which the user RSVPed

    @Column(nullable = false)
    private boolean isAttending; // RSVP status (true = attending, false = not attending)
}
