package fr.iut.web.rest;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.multipart.MultipartFile;

@Controller
@RequestMapping(name="/content")
public class ContentRestController {

	private static Logger log = LoggerFactory.getLogger(ContentRestController.class);
	
	@RequestMapping(
			value="/images",
			method=RequestMethod.GET 
			//name="/images"
			//?? consumes="multipart/form-data"
			)
	public void uploadImages(
			@RequestParam("file") MultipartFile file) {
		log.info("uploading file");
		try {
			
		} catch (Exception ex) {
			log.error("Failed to upload", ex);
		}
		
	}
	
}