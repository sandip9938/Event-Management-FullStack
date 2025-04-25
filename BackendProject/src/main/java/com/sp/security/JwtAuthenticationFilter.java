package com.sp.security;

import com.sp.config.JwtUtil;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;
import org.springframework.lang.NonNull;

import java.io.IOException;

/**
 * ✅ JWT Authentication Filter that intercepts every request once and performs token validation.
 * Responsible for extracting JWT token, validating it, and setting authentication in the SecurityContext.
 */
@Component
public class JwtAuthenticationFilter extends OncePerRequestFilter {

    private final JwtUtil jwtUtil;
    private final UserDetailsService userDetailsService;

    // 🔧 Constructor injection of JwtUtil and UserDetailsService
    public JwtAuthenticationFilter(JwtUtil jwtUtil, UserDetailsService userDetailsService) {
        this.jwtUtil = jwtUtil;
        this.userDetailsService = userDetailsService;
    }

    /**
     * 🔐 This method filters every incoming HTTP request to:
     * - Check for JWT token in the Authorization header
     * - Validate the token
     * - Set the authenticated user in the Spring Security context
     */
    @Override
    protected void doFilterInternal(@NonNull HttpServletRequest request,
                                    @NonNull HttpServletResponse response,
                                    @NonNull FilterChain filterChain) throws ServletException, IOException {

        // 🔍 Extract the Authorization header
        String authHeader = request.getHeader("Authorization");

        // 🚫 If no header or it doesn't start with Bearer, skip JWT validation
        if (authHeader == null || !authHeader.startsWith("Bearer ")) {
            filterChain.doFilter(request, response);
            return;
        }

        // 🔑 Extract token and username
        String token = authHeader.substring(7);
        String username = jwtUtil.extractUsername(token);

        // ✅ Check if username is valid and there's no authentication already
        if (username != null && SecurityContextHolder.getContext().getAuthentication() == null) {
            // 🔍 Load user details from database
            UserDetails userDetails = userDetailsService.loadUserByUsername(username);

            // ✅ Validate the token using user details
            if (jwtUtil.validateToken(token, userDetails)) {
                // 🔐 Create Spring Security auth token and set it in context
                UsernamePasswordAuthenticationToken authToken =
                        new UsernamePasswordAuthenticationToken(userDetails, null, userDetails.getAuthorities());

                authToken.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));

                SecurityContextHolder.getContext().setAuthentication(authToken); // 🔐 Authenticated
            }
        }

        // 🔁 Continue filter chain
        filterChain.doFilter(request, response);
    }
}
