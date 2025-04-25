package com.sp.config;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;
import org.springframework.lang.NonNull;

import java.io.IOException;

/**
 * JWT Filter that intercepts HTTP requests and validates JWT tokens.
 * It runs once per request and ensures that the user is authenticated using the token.
 */
@Component
public class JwtFilter extends OncePerRequestFilter {

    private static final Logger logger = LoggerFactory.getLogger(JwtFilter.class);

    private final JwtUtil jwtUtil;
    private final UserDetailsService userDetailsService;

    /**
     * Constructor-based injection for JwtUtil and UserDetailsService.
     */
    public JwtFilter(JwtUtil jwtUtil, UserDetailsService userDetailsService) {
        this.jwtUtil = jwtUtil;
        this.userDetailsService = userDetailsService;
    }

    /**
     * Filters incoming requests to check for JWT tokens in the Authorization header.
     * If valid, it sets the user in the security context.
     *
     * @param request     HTTP request
     * @param response    HTTP response
     * @param filterChain The filter chain to pass the request along
     */
    @Override
    protected void doFilterInternal(@NonNull HttpServletRequest request,
                                    @NonNull HttpServletResponse response,
                                    @NonNull FilterChain filterChain) throws ServletException, IOException {

        String requestURI = request.getServletPath();
        logger.info("Incoming Request URI: {}", requestURI);

        // ✅ Skip filtering for authentication endpoints (e.g., /login, /register)
        if (requestURI.startsWith("/api/auth")) {
            logger.info("Bypassing JWT filter for public endpoint: {}", requestURI);
            filterChain.doFilter(request, response);
            return;
        }

        final String authHeader = request.getHeader("Authorization");
        String jwt = null;
        String username = null;

        // ✅ Extract token from "Authorization: Bearer <token>" header
        if (authHeader != null && authHeader.startsWith("Bearer ")) {
            jwt = authHeader.substring(7);
            try {
                username = jwtUtil.extractUsername(jwt);
                logger.info("Extracted username from token: {}", username);
            } catch (Exception e) {
                logger.error("Failed to extract username from JWT: {}", e.getMessage());
            }
        } else {
            logger.warn("No Bearer token found in request header");
        }

        // ✅ Validate token and set authentication if user is not already authenticated
        if (username != null && SecurityContextHolder.getContext().getAuthentication() == null) {
            UserDetails userDetails = userDetailsService.loadUserByUsername(username);

            if (jwtUtil.validateToken(jwt, userDetails)) {
                UsernamePasswordAuthenticationToken authToken =
                        new UsernamePasswordAuthenticationToken(userDetails, null, userDetails.getAuthorities());
                SecurityContextHolder.getContext().setAuthentication(authToken);
                logger.info("JWT validated. Authentication set for user: {}", username);
            } else {
                logger.warn("Invalid JWT token for user: {}", username);
            }
        }

        // ✅ Continue with the next filter
        filterChain.doFilter(request, response);
    }
}
