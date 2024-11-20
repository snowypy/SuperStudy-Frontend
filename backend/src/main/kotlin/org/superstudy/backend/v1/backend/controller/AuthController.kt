package org.superstudy.backend.v1.backend.controller

import org.slf4j.Logger
import org.slf4j.LoggerFactory
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.*
import org.superstudy.backend.v1.backend.service.AuthService

@RestController
@RequestMapping("/api/v1/auth")
class AuthController(
    private val authService: AuthService
) {
    private val logger: Logger = LoggerFactory.getLogger(AuthController::class.java)

    data class AuthRequest(val username: String, val password: String)
    data class AuthResponse(val token: String)

    @PostMapping("/register")
    fun register(@RequestBody request: AuthRequest): ResponseEntity<String> {
        logger.debug("Received registration request for username: {}", request.username)
        return try {
            authService.register(request.username, request.password)
            ResponseEntity.ok("User registered successfully")
        } catch (e: IllegalArgumentException) {
            logger.error("Registration failed for username: {}", request.username, e)
            ResponseEntity.badRequest().body(e.message)
        }
    }

    @PostMapping("/login")
    fun login(@RequestBody request: AuthRequest): ResponseEntity<Any> {
        logger.debug("Received login request for username: {}", request.username)
        val token = authService.login(request.username, request.password)
        return if (token != null) {
            logger.debug("Login successful for username: {}", request.username)
            ResponseEntity.ok(AuthResponse(token))
        } else {
            logger.warn("Login failed for username: {}", request.username)
            ResponseEntity.badRequest().body("Invalid username or password")
        }
    }
}