package fr.iut.web.rest;

import java.time.LocalDate;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import fr.iut.domain.Photo;
import fr.iut.repository.PhotoRepository;


@RestController
@RequestMapping(path="/api/content")
public class ContentRestController {

	private static Logger log = LoggerFactory.getLogger(ContentRestController.class);
	
	@Autowired
	PhotoRepository photoRepository;
	
	

public static class ImageData {
public String fileName;
public byte[] data;
}
	@RequestMapping(
			path="/imagesData",
			//method=RequestMethod.GET, 
			//name="/images"
			//?? consumes="multipart/form-data"
			method=RequestMethod.POST,
			consumes = {"multipart/form-data"})
			
	public void uploadImages(//@RequestBody ImageData image){
			@RequestParam("file") MultipartFile file) {
		//log.info("uploading file");
	    //@RequestPart("file") MultipartFile file) {
		Photo photo = new Photo();
		photo.setDateCreate(LocalDate.now());
		photo.setTitle(file.getName());
		photo.setUri("fee");
		photo.setFormat("fefe");
		photo.setSize((int) file.getSize());
		log.info("uploading file '" + file.getOriginalFilename() + "' ");
		try {
			photo.setImage(file.getBytes());
			photoRepository.save(photo);
		} catch (Exception ex) {
			log.error("Failed to upload", ex);
		}
	
	}
	
	
	
}