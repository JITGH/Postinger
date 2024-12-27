package com.ghosh.postinger.features.feed.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;


import com.ghosh.postinger.features.feed.model.Post;

public interface PostRepository extends JpaRepository<Post,Long>{

    List<Post> findByAuthorIdNotOrderByCreationDateDesc(Long authenticatedUserId);

    List<Post> findAllByOrderByCreationDateDesc();

     List<Post> findByAuthorId(Long authorId);

}
