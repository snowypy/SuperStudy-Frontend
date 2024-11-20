package org.superstudy.backend.v1.backend.flashcards.service

import org.springframework.security.crypto.password.PasswordEncoder
import org.springframework.stereotype.Service
import org.superstudy.backend.v1.backend.flashcards.model.User
import org.superstudy.backend.v1.backend.flashcards.repository.UserRepository

@Service
class AuthService(
    private val userRepository: UserRepository,
    private val passwordEncoder: PasswordEncoder
) {
    fun register(username: String, password: String): User {
        if (userRepository.findByUsername(username) != null) {
            throw IllegalArgumentException("Username already exists")
        }
        val hashedPassword = passwordEncoder.encode(password)
        val user = User(username = username, password = hashedPassword)
        return userRepository.save(user)
    }

    fun login(username: String, password: String): Boolean {
        val user = userRepository.findByUsername(username) ?: return false
        return passwordEncoder.matches(password, user.password)
    }
}
