package com.sp.service;

import com.sp.exception.ResourceNotFoundException;
import com.sp.model.Event;
import com.sp.model.RSVP;
import com.sp.model.User;
import com.sp.repository.RSVPRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class RSVPService {

    private final RSVPRepository rsvpRepository;

    public RSVPService(RSVPRepository rsvpRepository) {
        this.rsvpRepository = rsvpRepository;
    }

    /**
     * 🔍 Retrieve all RSVPs for a specific event.
     *
     * @param event the event
     * @return list of RSVPs
     */
    public List<RSVP> getRSVPsForEvent(Event event) {
        return rsvpRepository.findByEvent(event);
    }

    /**
     * 🔍 Retrieve all RSVPs made by a specific user.
     *
     * @param user the user
     * @return list of RSVPs
     */
    public List<RSVP> getRSVPsForUser(User user) {
        return rsvpRepository.findByUser(user);
    }

    /**
     * ➕ Add a new RSVP.
     *
     * @param user the user RSVPing
     * @param event the event
     * @param isAttending true if attending
     * @return saved RSVP
     */
    public RSVP addRSVP(User user, Event event, boolean isAttending) {
        RSVP rsvp = new RSVP();
        rsvp.setUser(user);
        rsvp.setEvent(event);
        rsvp.setAttending(isAttending);
        return rsvpRepository.save(rsvp);
    }

    /**
     * 🔄 Update RSVP status (e.g., change attending flag).
     *
     * @param user the user
     * @param event the event
     * @param isAttending new attendance status
     * @return updated RSVP
     */
    public RSVP updateRSVP(User user, Event event, boolean isAttending) {
        RSVP rsvp = rsvpRepository.findByUserAndEvent(user, event)
                .orElseThrow(() -> new ResourceNotFoundException("RSVP not found for user and event"));

        rsvp.setAttending(isAttending);
        return rsvpRepository.save(rsvp);
    }

    /**
     * ❌ Cancel RSVP (delete).
     *
     * @param user the user
     * @param event the event
     */
    public void cancelRSVP(User user, Event event) {
        RSVP rsvp = rsvpRepository.findByUserAndEvent(user, event)
                .orElseThrow(() -> new ResourceNotFoundException("RSVP not found for user and event"));
        rsvpRepository.delete(rsvp);
    }
}
