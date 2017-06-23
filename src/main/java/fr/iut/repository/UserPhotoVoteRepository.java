package fr.iut.repository;

import fr.iut.domain.Photo;
import fr.iut.domain.SiteUser;
import fr.iut.domain.UserPhotoComment;
import fr.iut.domain.UserPhotoVote;

import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * Spring Data JPA repository for the UserPhotoComment entity.
 */
@SuppressWarnings("unused")
@Repository
public interface UserPhotoVoteRepository extends JpaRepository<UserPhotoVote,Long> {
	public  List<UserPhotoVote> findByphoto (Photo photo);
	public  List<UserPhotoVote> findBysiteUser (SiteUser user);

}
