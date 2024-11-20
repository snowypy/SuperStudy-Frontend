package org.superstudy.backend.v1.backend.flashcards.repository

import org.springframework.data.jpa.repository.JpaRepository
import org.superstudy.backend.v1.backend.flashcards.model.User

interface UserRepository : JpaRepository<User, Long> {
    fun findByUsername(username: String): User?
}
