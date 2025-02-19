package com.ghosh.postinger.features.authentication.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.ghosh.postinger.features.authentication.model.User;

public interface UserRepository extends JpaRepository<User,Long> {

	Optional<User>findByEmail(String email);

	List<User> findAllByIdNot(Long id);
}
