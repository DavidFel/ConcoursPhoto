package fr.iut.repository;

import fr.iut.domain.Photo;
import fr.iut.domain.SiteUser;
import fr.iut.domain.UserPhotoComment;
import fr.iut.domain.UserPhotoVote;

import org.springframework.data.jpa.repository.*;

import java.util.List;

/**
 * Spring Data JPA repository for the UserPhotoComment entity.
 */
@SuppressWarnings("unused")
public interface UserPhotoCommentRepository extends JpaRepository<UserPhotoComment,Long> {
	public  List<UserPhotoComment> findByphoto (Photo photo);
	public  List<UserPhotoComment> findBysiteUser (SiteUser user);

}
