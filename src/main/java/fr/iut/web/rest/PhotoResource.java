package fr.iut.web.rest;

import com.codahale.metrics.annotation.Timed;
import fr.iut.domain.Photo;
import fr.iut.domain.UserPhotoVote;
import fr.iut.repository.PhotoRepository;
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
import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing Photo.
 */
@RestController
@RequestMapping("/api")

public class PhotoResource {
	@Autowired
	UserPhotoVoteRepository UserPhotoVote;
	
	@Autowired
	PhotoRepository RepositoryPhoto;
	
    private final Logger log = LoggerFactory.getLogger(PhotoResource.class);

    private static final String ENTITY_NAME = "photo";
        
    private final PhotoRepository photoRepository;

    public PhotoResource(PhotoRepository photoRepository) {
        this.photoRepository = photoRepository;
    }

    /**
     * POST  /photos : Create a new photo.
     *
     * @param photo the photo to create
     * @return the ResponseEntity with status 201 (Created) and with body the new photo, or with status 400 (Bad Request) if the photo has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/photos")
    @Timed
    public ResponseEntity<Photo> createPhoto(@Valid @RequestBody Photo photo) throws URISyntaxException {
        log.debug("REST request to save Photo : {}", photo);
        if (photo.getId() != null) {
            return ResponseEntity.badRequest().headers(HeaderUtil.createFailureAlert(ENTITY_NAME, "idexists", "A new photo cannot already have an ID")).body(null);
        }
        Photo result = photoRepository.save(photo);
        return ResponseEntity.created(new URI("/api/photos/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /photos : Updates an existing photo.
     *
     * @param photo the photo to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated photo,
     * or with status 400 (Bad Request) if the photo is not valid,
     * or with status 500 (Internal Server Error) if the photo couldnt be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/photos")
    @Timed
    public ResponseEntity<Photo> updatePhoto(@Valid @RequestBody Photo photo) throws URISyntaxException {
        log.debug("REST request to update Photo : {}", photo);
        if (photo.getId() == null) {
            return createPhoto(photo);
        }
        Photo result = photoRepository.save(photo);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, photo.getId().toString()))
            .body(result);
    }
    
    
    @PostMapping("/update-photos-Ahmed")
    @Timed
    public Photo updatePhotoAhmed(@RequestParam("idPhoto") Long idPhoto,@RequestParam("Moyenne") Float moyenne,@RequestParam("nbVote") Integer nbVote) {
       Photo photo = photoRepository.findOne(idPhoto);
       photo.setScore((float) moyenne);
       photo.setNbVue((Integer)nbVote);
       return photoRepository.save(photo);  
    }

    /**
     * GET  /photos : get all the photos.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of photos in body
     */
    @GetMapping("/photos")
    @Timed
    public List<Photo> getAllPhotos() {
        log.debug("REST request to get all Photos");
        List<Photo> photos = photoRepository.findAll();
        return photos;
    }

    /**
     * GET  /photos/:id : get the "id" photo.
     *
     * @param id the id of the photo to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the photo, or with status 404 (Not Found)
     */
    @GetMapping("/photos/{id}")
    @Timed
    public ResponseEntity<Photo> getPhoto(@PathVariable Long id) {
        log.debug("REST request to get Photo : {}", id);
        Photo photo = photoRepository.findOne(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(photo));
    }

    /**
     * DELETE  /photos/:id : delete the "id" photo.
     *
     * @param id the id of the photo to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/photos/{id}")
    @Timed
    public ResponseEntity<Void> deletePhoto(@PathVariable Long id) {
        log.debug("REST request to delete Photo : {}", id);
        photoRepository.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
    
    @GetMapping("/get-moyenne-vote-photo")
    @Timed
    public float getMoyenneVotePhoto(@RequestParam("idPhoto") Long idPhoto) {
    		float laMoyenne=0;
    		Integer nb =0;
    		Photo laPhoto = new Photo();
    		laPhoto= RepositoryPhoto.findOne(idPhoto);
    		List<UserPhotoVote> mesVotes = UserPhotoVote.findByphoto(laPhoto);

    		for (UserPhotoVote nVote  : mesVotes){ 
				nb++;
				laMoyenne = ( laMoyenne * (nb-1) + nVote.getStars() ) / nb;
			  }
    		return laMoyenne;
    }

}
