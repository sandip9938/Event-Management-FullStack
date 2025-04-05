package com.sp.controller;

import com.sp.dto.RSVPDTO;
import com.sp.model.Event;
import com.sp.model.RSVP;
import com.sp.model.User;
import com.sp.service.EventService;
import com.sp.service.RSVPService;
import com.sp.service.UserService;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import jakarta.validation.Valid;
import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/rsvp")
@CrossOrigin(origins = "*") // ✅ Allow frontend apps from any origin (can be restricted in production)
public class RSVPController {

    private final RSVPService rsvpService;
    private final UserService userService;
    private final EventService eventService;

    public RSVPController(RSVPService rsvpService, UserService userService, EventService eventService) {
        this.rsvpService = rsvpService;
        this.userService = userService;
        this.eventService = eventService;
    }

    // ✅ GET all RSVPs for a specific event
    @GetMapping("/event/{eventId}")
    public ResponseEntity<List<RSVPDTO>> getRSVPsForEvent(@PathVariable Long eventId) {
        Event event = eventService.getEventById(eventId);
        if (event == null) {
            return ResponseEntity.notFound().build(); // 404 if event doesn't exist
        }

        // Convert list of RSVP entities to DTOs
        List<RSVPDTO> rsvpList = rsvpService.getRSVPsForEvent(event)
                .stream()
                .map(rsvp -> new RSVPDTO(
                        rsvp.getId(),
                        rsvp.getUser().getId(),
                        rsvp.getEvent().getId(),
                        rsvp.isAttending()))
                .collect(Collectors.toList());

        return ResponseEntity.ok(rsvpList); // 200 OK
    }

    // ✅ GET all RSVPs for a specific user
    @GetMapping("/user/{userId}")
    public ResponseEntity<List<RSVPDTO>> getRSVPsForUser(@PathVariable Long userId) {
        User user = userService.getUserById(userId);
        if (user == null) {
            return ResponseEntity.notFound().build(); // 404 if user not found
        }

        List<RSVPDTO> rsvpList = rsvpService.getRSVPsForUser(user)
                .stream()
                .map(rsvp -> new RSVPDTO(
                        rsvp.getId(),
                        rsvp.getUser().getId(),
                        rsvp.getEvent().getId(),
                        rsvp.isAttending()))
                .collect(Collectors.toList());

        return ResponseEntity.ok(rsvpList); // 200 OK
    }

    // ✅ POST - Add an RSVP
    @PostMapping
    public ResponseEntity<?> addRSVP(@Valid @RequestBody RSVPDTO rsvpDTO) {
        User user = userService.getUserById(rsvpDTO.getUserId());
        Event event = eventService.getEventById(rsvpDTO.getEventId());

        if (user == null || event == null) {
            return ResponseEntity.status(404).body("User or Event not found!"); // Error if user or event missing
        }

        RSVP rsvp = rsvpService.addRSVP(user, event, rsvpDTO.isAttending());

        return ResponseEntity.ok(rsvp); // 200 OK with created RSVP entity
    }

    // ✅ DELETE - Cancel an RSVP by user and event ID
    @DeleteMapping("/{userId}/{eventId}")
    public ResponseEntity<String> cancelRSVP(@PathVariable Long userId, @PathVariable Long eventId) {
        User user = userService.getUserById(userId);
        Event event = eventService.getEventById(eventId);

        if (user == null || event == null) {
            return ResponseEntity.status(404).body("User or Event not found!");
        }

        rsvpService.cancelRSVP(user, event);

        return ResponseEntity.ok("RSVP canceled successfully!"); // 200 OK with success message
    }
}
