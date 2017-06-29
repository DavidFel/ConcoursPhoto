package fr.iut.repository;

import fr.iut.domain.Photo;
import fr.iut.domain.SiteUser;
import fr.iut.domain.UserPhotoComment;
import fr.iut.domain.UserPhotoVote;

import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * Spring Data JPA repository for the SiteUser entity.
 */
@SuppressWarnings("unused")
public interface SiteUserRepository extends JpaRepository<SiteUser,Long> {


}
