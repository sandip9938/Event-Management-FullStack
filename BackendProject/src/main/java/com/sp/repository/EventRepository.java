package com.sp.repository;

import com.sp.model.Event;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;


public interface EventRepository extends JpaRepository<Event, Long> {

    // 🔍 Custom finder method: retrieves a list of events by location
    List<Event> findByLocation(String location);

    // You can add more derived query methods as needed, for example:
    // List<Event> findByNameContainingIgnoreCase(String keyword);
    // List<Event> findByDateBetween(LocalDateTime start, LocalDateTime end);
}
