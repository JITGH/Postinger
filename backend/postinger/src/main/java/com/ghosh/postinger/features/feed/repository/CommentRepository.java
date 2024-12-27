package com.ghosh.postinger.features.feed.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.ghosh.postinger.features.feed.model.Comment;

public interface CommentRepository extends JpaRepository<Comment, Long> {
}