package fr.iut.repository;

import fr.iut.domain.Photo;
import fr.iut.domain.SiteUser;
import fr.iut.domain.UserPhotoVote;

import org.springframework.data.jpa.repository.*;

import java.util.List;

/**
 * Spring Data JPA repository for the UserPhotoVote entity.
 */
@SuppressWarnings("unused")
public interface UserPhotoVoteRepository extends JpaRepository<UserPhotoVote,Long> {

	public  List<UserPhotoVote> findByphoto (Photo photo);
	public  List<UserPhotoVote> findBysiteUser (SiteUser user);

	
}

