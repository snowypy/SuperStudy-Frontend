package com.example.flashcards.controller

import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.*
import org.superstudy.backend.v1.backend.flashcards.service.AuthService

@RestController
@RequestMapping("/api/v1/auth")
class AuthController(
    private val authService: AuthService
) {
    data class AuthRequest(val username: String, val password: String)

    @PostMapping("/register")
    fun register(@RequestBody request: AuthRequest): ResponseEntity<String> {
        return try {
            authService.register(request.username, request.password)
            ResponseEntity.ok("User registered successfully")
        } catch (e: IllegalArgumentException) {
            ResponseEntity.badRequest().body(e.message)
        }
    }

    @PostMapping("/login")
    fun login(@RequestBody request: AuthRequest): ResponseEntity<String> {
        return if (authService.login(request.username, request.password)) {
            ResponseEntity.ok("Login successful")
        } else {
            ResponseEntity.badRequest().body("Invalid username or password")
        }
    }
}
