package com.sp.config;

import io.jsonwebtoken.security.Keys;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import java.util.Base64;
import java.security.Key;

/**
 * Utility class for managing the signing key used for JWT creation and validation.
 * It supports both property-based injection (from application.properties) and manual assignment.
 */
@Component
public class KeyUtil {

    private static String secretKey;     // Base64-encoded secret string
    private static Key signingKey;       // HMAC SHA key for JWT

    /**
     * Injects secret key from the application.properties (automatically by Spring).
     * Also generates and caches the signing key.
     *
     * Property expected: spring.security.jwt.secret-key
     *
     * @param secretKey the base64 encoded secret key
     */
    @Value("${spring.security.jwt.secret-key}")
    public void setSecretKeyFromProperty(String secretKey) {
        KeyUtil.secretKey = secretKey;
        KeyUtil.signingKey = generateSigningKey(secretKey); // ✅ Convert and cache signing key
    }

    /**
     * Optional method to set the secret manually in code (e.g., for tests or special cases).
     *
     * @param manualSecretKey manually provided secret key (Base64)
     */
    public static void setSigningKey(String manualSecretKey) {
        KeyUtil.secretKey = manualSecretKey;
        KeyUtil.signingKey = generateSigningKey(manualSecretKey);
    }

    /**
     * Returns the cached signing key. Generates it if not already created.
     *
     * @return HMAC signing key
     */
    public static Key getSigningKey() {
        if (signingKey == null && secretKey != null) {
            signingKey = generateSigningKey(secretKey); // ✅ Lazy init
        }
        return signingKey;
    }

    /**
     * Converts a Base64 encoded string into a valid HMAC SHA key.
     *
     * @param keyStr base64 encoded key string
     * @return generated JWT signing key
     */
    private static Key generateSigningKey(String keyStr) {
        byte[] keyBytes = Base64.getDecoder().decode(keyStr); // ✅ Decode base64 string
        return Keys.hmacShaKeyFor(keyBytes);                  // ✅ Create secure key
    }
}
