package com.merc.administration.controller;

import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.merc.administration.model.Notice;
import com.merc.administration.service.INoticeService;




@RestController
@CrossOrigin(origins = "*")
public class AdminController {

private final Logger LOG = LoggerFactory.getLogger(this.getClass());
	
	@Autowired
	INoticeService noticeService;
	
	@GetMapping (path = "notices", produces = "application/json" )
	public ResponseEntity<List<Notice>> allNotices() {
		
		List<Notice> noticeList = noticeService.allNotices();
		HttpStatus status = HttpStatus.OK;
		ResponseEntity<List<Notice>> response = new ResponseEntity<List<Notice>>(noticeList, status);
		
		return response;
	}
	
	@GetMapping(path = "notices/{id}", produces = "application/json")
	public ResponseEntity<Notice> noticeById(@PathVariable (name = "id") Integer id) {
		
		Notice noticeObj = noticeService.noticeById(id);
		
		HttpStatus status = HttpStatus.OK;
		HttpHeaders headers = new HttpHeaders();
		headers.add("message", "Post found successfully.");
		ResponseEntity<Notice> response = new ResponseEntity<Notice>(noticeObj, headers, status);
		
		LOG.info("GET /- Post with postId: " + id +" found");
		
		return response;
	}
	
	@PostMapping(path = "notices", consumes = "application/json", produces = "application/json")
	public ResponseEntity<Notice> addNotice(@RequestBody Notice notice) {
		
		Notice noticeObj = noticeService.addNotice(notice);
		
		HttpStatus status = HttpStatus.CREATED;
		HttpHeaders headers = new HttpHeaders();
		headers.add("message", "Post uploaded successfully!");
		ResponseEntity<Notice> response = new ResponseEntity<Notice>(noticeObj, headers, status);
		
		return response;
	}
	
	@DeleteMapping("notices/{id}")
    public ResponseEntity<?> deleteNotice(@PathVariable Integer id) {
        boolean deleted = noticeService.deleteNotice(id);
        if (deleted) {
            return ResponseEntity.ok().build();
        } else {
            return ResponseEntity.notFound().build();
        }
    }
}
