package com.sp.config;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.Jwts;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;

import java.security.Key;
import java.util.Date;
import java.util.function.Function;

/**
 * Utility class for handling JWT creation, validation, and parsing.
 */
@Component
public class JwtUtil {

    /**
     * Retrieves the signing key used for signing/verifying JWTs.
     * Delegates to a helper KeyUtil class.
     *
     * @return signing key
     */
    private Key getSigningKey() {
        return KeyUtil.getSigningKey(); // ✅ Secure key management
    }

    /**
     * Generates a JWT token for the provided user.
     *
     * @param userDetails the user details
     * @return signed JWT token
     */
    public String generateToken(UserDetails userDetails) {
        return Jwts.builder()
                .setSubject(userDetails.getUsername()) // ✅ Set username as subject
                .setIssuedAt(new Date())               // ✅ Current timestamp
                .setExpiration(new Date(System.currentTimeMillis() + 1000 * 60 * 60)) // ✅ 1 hour expiry
                .signWith(getSigningKey())             // ✅ Sign with secret key
                .compact();
    }

    /**
     * Extracts username (subject) from the JWT token.
     *
     * @param token the JWT token
     * @return username
     */
    public String extractUsername(String token) {
        return extractClaim(token, Claims::getSubject);
    }

    /**
     * Extracts a specific claim from the JWT token.
     *
     * @param token the JWT token
     * @param claimsResolver a function to resolve the claim
     * @param <T> claim type
     * @return claim value
     */
    public <T> T extractClaim(String token, Function<Claims, T> claimsResolver) {
        final Claims claims = extractAllClaims(token);
        return claimsResolver.apply(claims);
    }

    /**
     * Parses all claims from the JWT token.
     *
     * @param token the JWT token
     * @return Claims object
     */
    private Claims extractAllClaims(String token) {
        try {
            return Jwts.parserBuilder()
                    .setSigningKey(getSigningKey())
                    .build()
                    .parseClaimsJws(token)
                    .getBody();
        } catch (ExpiredJwtException e) {
            System.err.println("JWT expired: " + e.getMessage());
            return e.getClaims(); // ✅ Return expired claims for inspection
        } catch (Exception e) {
            throw new IllegalArgumentException("JWT error: " + e.getMessage()); // ❌ General error (could log more specifically)
        }
    }

    /**
     * Validates a JWT token by checking:
     * - If the username matches
     * - If the token is not expired
     *
     * @param token JWT token
     * @param userDetails user details
     * @return true if token is valid
     */
    public boolean validateToken(String token, UserDetails userDetails) {
        final String username = extractUsername(token);
        return username.equals(userDetails.getUsername()) && !isTokenExpired(token);
    }

    /**
     * Checks whether the JWT token is expired.
     *
     * @param token the JWT token
     * @return true if expired
     */
    private boolean isTokenExpired(String token) {
        return extractClaim(token, Claims::getExpiration).before(new Date());
    }
}
