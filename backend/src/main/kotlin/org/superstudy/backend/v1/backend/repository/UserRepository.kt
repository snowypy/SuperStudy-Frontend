package org.superstudy.backend.v1.backend.repository

import org.springframework.data.jpa.repository.JpaRepository
import org.superstudy.backend.v1.backend.model.User

interface UserRepository : JpaRepository<User, Long> {
    fun findByUsername(username: String): User?
}
