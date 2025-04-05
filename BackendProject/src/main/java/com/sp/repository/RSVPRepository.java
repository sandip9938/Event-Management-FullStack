package com.sp.repository;

import com.sp.model.RSVP;
import com.sp.model.Event;
import com.sp.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;
import java.util.Optional;


public interface RSVPRepository extends JpaRepository<RSVP, Long> {

    // 🔍 Fetch all RSVPs associated with a specific event
    List<RSVP> findByEvent(Event event);

    // 🔍 Fetch all RSVPs made by a specific user
    List<RSVP> findByUser(User user);

    // 🔍 Find a specific RSVP by a user for a particular event (useful for checking duplicates)
    Optional<RSVP> findByUserAndEvent(User user, Event event);

    // ✅ You can also add derived queries for filtering like:
    // List<RSVP> findByEventAndIsAttendingTrue(Event event); // To get confirmed attendees
}
