package com.sp.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import java.util.List;

/**
 * Configuration class to define Cross-Origin Resource Sharing (CORS) settings.
 * This allows frontend apps (e.g., React) to communicate with the Spring Boot backend.
 */
@Configuration
public class CorsConfig {

    /**
     * Bean that configures the CORS policy for the entire application.
     *
     * @return CorsConfigurationSource that defines allowed origins, methods, headers, and credentials.
     */
    @Bean
    public CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration config = new CorsConfiguration();

        // ✅ Allow only the frontend domain (React dev server)
        config.setAllowedOrigins(List.of("http://localhost:5173"));

        // ✅ Specify which HTTP methods are permitted
        config.setAllowedMethods(List.of("GET", "POST", "PUT", "DELETE", "OPTIONS"));

        // ✅ Allow all headers (e.g., Authorization, Content-Type)
        config.setAllowedHeaders(List.of("*"));

        // ✅ Allow cookies and Authorization headers to be sent
        config.setAllowCredentials(true);

        // ✅ Apply CORS policy to all endpoints
        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", config);

        return source;
    }
}
