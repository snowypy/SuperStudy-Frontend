package org.superstudy.backend.v1.backend.service

import io.jsonwebtoken.Jwts
import io.jsonwebtoken.SignatureAlgorithm
import org.springframework.beans.factory.annotation.Value
import org.springframework.security.crypto.password.PasswordEncoder
import org.springframework.stereotype.Service
import org.superstudy.backend.v1.backend.model.User
import org.superstudy.backend.v1.backend.repository.UserRepository
import java.util.*

@Service
class AuthService(
    private val userRepository: UserRepository,
    private val passwordEncoder: PasswordEncoder,
    @Value("\${jwt.secret}") private val secretKey: String
) {

    fun register(username: String, password: String): User {
        if (userRepository.findByUsername(username) != null) {
            throw IllegalArgumentException("Username already exists")
        }
        val hashedPassword = passwordEncoder.encode(password)
        val user = User(username = username, password = hashedPassword)
        return userRepository.save(user)
    }

    fun login(username: String, password: String): String? {
        val user = userRepository.findByUsername(username) ?: return null
        return if (passwordEncoder.matches(password, user.password)) {
            generateToken(user)
        } else {
            null
        }
    }

    private fun generateToken(user: User): String {
        val claims = Jwts.claims().setSubject(user.username)
        val now = Date()
        val validity = Date(now.time + 3600000)

        return Jwts.builder()
            .setClaims(claims)
            .setIssuedAt(now)
            .setExpiration(validity)
            .signWith(SignatureAlgorithm.HS256, secretKey)
            .compact()
    }
}