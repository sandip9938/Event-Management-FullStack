package com.sp.controller;

import com.sp.dto.EventDTO;
import com.sp.model.Event;
import com.sp.service.EventService;

import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/events")
@CrossOrigin(origins = "*") // ✅ Allows cross-origin requests from any frontend (configurable)
public class EventController {

    private final EventService eventService;

    public EventController(EventService eventService) {
        this.eventService = eventService;
    }

    // ✅ GET all events
    @GetMapping
    public ResponseEntity<List<EventDTO>> getAllEvents() {
        List<EventDTO> events = eventService.getAllEvents()
                .stream()
                .map(event -> new EventDTO(
                        event.getId(),
                        event.getName(),
                        event.getDescription(),
                        event.getDate(),
                        event.getLocation()))
                .collect(Collectors.toList());

        return ResponseEntity.ok(events); // 200 OK with list of events
    }

    // ✅ GET event by ID
    @GetMapping("/{id}")
    public ResponseEntity<EventDTO> getEventById(@PathVariable Long id) {
        Optional<Event> eventOpt = Optional.ofNullable(eventService.getEventById(id));

        return eventOpt.map(event -> ResponseEntity.ok(
                        new EventDTO(
                                event.getId(),
                                event.getName(),
                                event.getDescription(),
                                event.getDate(),
                                event.getLocation())))
                .orElseGet(() -> ResponseEntity.notFound().build()); // 404 if not found
    }

    // ✅ POST - Create a new event
    @PostMapping
    public ResponseEntity<EventDTO> createEvent(@Valid @RequestBody EventDTO eventDTO) {
        // ID should be null when creating new entity
        Event event = new Event(
                null,
                eventDTO.getName(),
                eventDTO.getDescription(),
                eventDTO.getDate(),
                eventDTO.getLocation());

        Event savedEvent = eventService.createEvent(event);

        EventDTO responseDTO = new EventDTO(
                savedEvent.getId(),
                savedEvent.getName(),
                savedEvent.getDescription(),
                savedEvent.getDate(),
                savedEvent.getLocation());

        return ResponseEntity.status(201).body(responseDTO); // 201 Created
    }

    // ✅ PUT - Update an existing event
    @PutMapping("/{id}")
    public ResponseEntity<EventDTO> updateEvent(@PathVariable Long id, @Valid @RequestBody EventDTO eventDTO) {
        Optional<Event> existingEvent = Optional.ofNullable(eventService.getEventById(id));

        if (existingEvent.isEmpty()) {
            return ResponseEntity.notFound().build(); // 404 if event doesn't exist
        }

        Event updatedEvent = eventService.updateEvent(id,
                new Event(
                        id,
                        eventDTO.getName(),
                        eventDTO.getDescription(),
                        eventDTO.getDate(),
                        eventDTO.getLocation()));

        EventDTO responseDTO = new EventDTO(
                updatedEvent.getId(),
                updatedEvent.getName(),
                updatedEvent.getDescription(),
                updatedEvent.getDate(),
                updatedEvent.getLocation());

        return ResponseEntity.ok(responseDTO); // 200 OK with updated data
    }

    // ✅ DELETE - Delete event by ID
    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteEvent(@PathVariable Long id) {
        boolean deleted = eventService.deleteEvent(id);
        return deleted
                ? ResponseEntity.ok("Event deleted successfully!") // 200 OK with message
                : ResponseEntity.notFound().build(); // 404 if not found
    }
}
