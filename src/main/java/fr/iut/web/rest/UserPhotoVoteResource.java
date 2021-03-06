package fr.iut.web.rest;

import com.codahale.metrics.annotation.Timed;

import fr.iut.domain.Photo;
import fr.iut.domain.SiteUser;
import fr.iut.domain.UserPhotoVote;
import fr.iut.repository.PhotoRepository;
import fr.iut.repository.SiteUserRepository;
import fr.iut.repository.UserPhotoVoteRepository;
import fr.iut.web.rest.util.HeaderUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.net.URI;
import java.net.URISyntaxException;
import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing UserPhotoVote.
 */
@RestController
@RequestMapping("/api")
public class UserPhotoVoteResource {

	private final Logger log = LoggerFactory.getLogger(UserPhotoVoteResource.class);

	private static final String ENTITY_NAME = "userPhotoVote";

	private final UserPhotoVoteRepository userPhotoVoteRepository;

	public UserPhotoVoteResource(UserPhotoVoteRepository userPhotoVoteRepository) {
		this.userPhotoVoteRepository = userPhotoVoteRepository;
	}

	@Autowired
	PhotoRepository photoRepository;
	@Autowired
	SiteUserRepository siteUserRepository;

	/**
	 * POST /user-photo-votes : Create a new userPhotoVote.
	 *
	 * @param userPhotoVote
	 *            the userPhotoVote to create
	 * @return the ResponseEntity with status 201 (Created) and with body the
	 *         new userPhotoVote, or with status 400 (Bad Request) if the
	 *         userPhotoVote has already an ID
	 * @throws URISyntaxException
	 *             if the Location URI syntax is incorrect
	 */
	@PostMapping("/user-photo-votes")
	@Timed
	public ResponseEntity<UserPhotoVote> createUserPhotoVote(@Valid @RequestBody UserPhotoVote userPhotoVote)
			throws URISyntaxException {
		log.debug("REST request to save UserPhotoVote : {}", userPhotoVote);
		if (userPhotoVote.getId() != null) {
			return ResponseEntity.badRequest().headers(HeaderUtil.createFailureAlert(ENTITY_NAME, "idexists",
					"A new userPhotoVote cannot already have an ID")).body(null);
		}
		UserPhotoVote result = userPhotoVoteRepository.save(userPhotoVote);
		return ResponseEntity.created(new URI("/api/user-photo-votes/" + result.getId()))
				.headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString())).body(result);
	}

	/**
	 * PUT /user-photo-votes : Updates an existing userPhotoVote.
	 *
	 * @param userPhotoVote
	 *            the userPhotoVote to update
	 * @return the ResponseEntity with status 200 (OK) and with body the updated
	 *         userPhotoVote, or with status 400 (Bad Request) if the
	 *         userPhotoVote is not valid, or with status 500 (Internal Server
	 *         Error) if the userPhotoVote couldnt be updated
	 * @throws URISyntaxException
	 *             if the Location URI syntax is incorrect
	 */
	@PutMapping("/user-photo-votes")
	@Timed
	public ResponseEntity<UserPhotoVote> updateUserPhotoVote(@Valid @RequestBody UserPhotoVote userPhotoVote)
			throws URISyntaxException {
		log.debug("REST request to update UserPhotoVote : {}", userPhotoVote);
		if (userPhotoVote.getId() == null) {
			return createUserPhotoVote(userPhotoVote);
		}
		UserPhotoVote result = userPhotoVoteRepository.save(userPhotoVote);
		return ResponseEntity.ok()
				.headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, userPhotoVote.getId().toString()))
				.body(result);
	}

	@PostMapping("/add-vote")
	@Timed
	public ResponseEntity<UserPhotoVote> createUserPhotoVoteAhmed(@RequestParam("photoID") Long idPhoto,
			@RequestParam("userID") Long idUser, @RequestParam("valueVote") Integer valueVote)
			throws URISyntaxException {
		UserPhotoVote temp = new UserPhotoVote();
		Photo photo;
		SiteUser userDuSite;

		photo = photoRepository.findOne(idPhoto);
		userDuSite = siteUserRepository.findOne(idUser);

		temp.setStars(valueVote);
		temp.setDate(LocalDate.now());
		temp.setPhoto(photo);
		temp.setSiteUser(userDuSite);

		UserPhotoVote result = userPhotoVoteRepository.save(temp);
		return ResponseEntity.created(new URI("/api/add-vote/" + result.getId()))
				.headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString())).body(result);
	}

	/**
	 * GET /user-photo-votes : get all the userPhotoVotes.
	 *
	 * @return the ResponseEntity with status 200 (OK) and the list of
	 *         userPhotoVotes in body
	 */
	@GetMapping("/user-photo-votes")
	@Timed
	public List<UserPhotoVote> getAllUserPhotoVotes() {
		log.debug("REST request to get all UserPhotoVotes");
		List<UserPhotoVote> userPhotoVotes = userPhotoVoteRepository.findAll();
		return userPhotoVotes;
	}

	@PostMapping("/user-photo-votes-onePhoto")
	@Timed
	public List<UserPhotoVote> getVoteOnePhoto(@RequestParam("id") Long id) {
		Photo photo;
		photo = photoRepository.findOne(id);
		return userPhotoVoteRepository.findByphoto(photo);
	}

	@PostMapping("/user-photo-votes-oneSiteUser")
	@Timed
	public List<UserPhotoVote> getVoteOneSiteUser(@RequestParam("id") Long idsiteUser) {

		SiteUser user;
		user = siteUserRepository.findOne(idsiteUser);
		List<UserPhotoVote> userPhotoVotes = userPhotoVoteRepository.findBysiteUser(user);
		return userPhotoVotes;
	}

	/*
	 * @PostMapping("/user-photo-votes-verif-vote")
	 * 
	 * @Timed public Boolean verifVote(@RequestParam("idPhoto") Long
	 * idPhoto,@RequestParam("idUser") Long idUser) {
	 * 
	 * Boolean Bool=true;
	 * log.debug("On passe bien dans le verif Vote cote javaS"); Photo photo;
	 * photo= photoRepository.findOne(idPhoto);
	 * 
	 * SiteUser user; user= siteUserRepository.findOne(idUser);
	 * 
	 * List<UserPhotoVote> photoVotes;
	 * photoVotes=userPhotoVoteRepository.findByphoto(photo);
	 * 
	 * for (UserPhotoVote vote : photoVotes){ if
	 * (vote.getSiteUser().getId()==user.getId()){
	 * log.debug("Vote siteUser Id : " + vote.getSiteUser().getId() +
	 * " IdUserCourant" + user.getId()); Bool=false; } } return Bool; } \
	 * 
	 * /** GET /user-photo-votes/:id : get the "id" userPhotoVote.
	 *
	 * @param id the id of the userPhotoVote to retrieve
	 * 
	 * @return the ResponseEntity with status 200 (OK) and with body the
	 * userPhotoVote, or with status 404 (Not Found)
	 */
	@GetMapping("/user-photo-votes/{id}")
	@Timed
	public ResponseEntity<UserPhotoVote> getUserPhotoVote(@PathVariable Long id) {
		log.debug("REST request to get UserPhotoVote : {}", id);
		UserPhotoVote userPhotoVote = userPhotoVoteRepository.findOne(id);
		return ResponseUtil.wrapOrNotFound(Optional.ofNullable(userPhotoVote));
	}

	/**
	 * DELETE /user-photo-votes/:id : delete the "id" userPhotoVote.
	 *
	 * @param id
	 *            the id of the userPhotoVote to delete
	 * @return the ResponseEntity with status 200 (OK)
	 */
	@DeleteMapping("/user-photo-votes/{id}")
	@Timed
	public ResponseEntity<Void> deleteUserPhotoVote(@PathVariable Long id) {
		log.debug("REST request to delete UserPhotoVote : {}", id);
		userPhotoVoteRepository.delete(id);
		return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
	}

/*
	@GetMapping("/user-photo-votes-URI-Best-Photo/{uri}")
	@Timed
	public String getURIBestPhoto() {
		String URI = "";
		Integer maxVote = 0;
		Photo BestPhoto = new Photo();
		List<UserPhotoVote> allVote = userPhotoVoteRepository.findAll();
		log.debug("ON EST LA");
		for (UserPhotoVote vote : allVote) {
			if (vote.getStars() > maxVote) {
				maxVote = vote.getStars();
				log.debug("Max Vote " + maxVote);
				BestPhoto = vote.getPhoto();
				URI = BestPhoto.getUri();
				log.debug("URI " + URI);
			}
		}
		return URI;
	}
*/

}
