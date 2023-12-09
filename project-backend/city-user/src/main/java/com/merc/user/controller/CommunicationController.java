package com.merc.user.controller;

import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.merc.user.model.AppReport;
import com.merc.user.service.CommunicationService;

@RestController
@CrossOrigin(origins = "*")
public class CommunicationController {

	private final Logger LOG = LoggerFactory.getLogger(this.getClass());

	@Autowired
	CommunicationService commService;

//	http://localhost:8090/reports

	@GetMapping(path = "reports", produces = "application/json" )
	public ResponseEntity<List<AppReport>> getAllReports() {
		
		List<AppReport> reportList = commService.getAllReports();
		HttpStatus status = HttpStatus.OK;
		ResponseEntity<List<AppReport>> response = new ResponseEntity<List<AppReport>>(reportList, status);
		
		return response;
	}
	
	@GetMapping(path = "reports/user/{userId}", produces = "application/json")
	public ResponseEntity<List<AppReport>> getUserReports(@PathVariable (name = "userId") Integer userId) {
		
		List<AppReport> reportList = commService.getUserReports(userId);
		
		HttpStatus status = HttpStatus.OK;
		HttpHeaders headers = new HttpHeaders();
		headers.add("message", "Reports for userID " + userId + "found successfully.");
		ResponseEntity<List<AppReport>> response = new ResponseEntity<List<AppReport>>(reportList, headers, status);
		return response;
	}

	@GetMapping(path = "reports/{reportId}", produces = "application/json")
	public ResponseEntity<AppReport> getReportById(@PathVariable (name = "reportId") Integer reportId) {
		
		AppReport reportObj = commService.getReportById(reportId);
		
		HttpStatus status = HttpStatus.OK;
		HttpHeaders headers = new HttpHeaders();
		headers.add("message", "Report found successfully.");
		ResponseEntity<AppReport> response = new ResponseEntity<AppReport>(reportObj, headers, status);
		return response;
	}

	@PostMapping(path = "reports", consumes = "application/json", produces = "application/json")
	public ResponseEntity<AppReport> addReport(@RequestBody AppReport report) {
		
		AppReport reportObj = commService.addReport(report);
		
		HttpStatus status = HttpStatus.CREATED;
		HttpHeaders headers = new HttpHeaders();
		headers.add("message", "User added successfully!");
		ResponseEntity<AppReport> response = new ResponseEntity<AppReport>(reportObj, headers, status);
		
		return response;
	}
	
	@PostMapping(path = "update-report", consumes = "application/json", produces = "application/json")
	public ResponseEntity<AppReport> updateReport(@RequestBody AppReport report) {
		
		AppReport reportObj = commService.updateReport(report);
		
		HttpStatus status = HttpStatus.CREATED;
		HttpHeaders headers = new HttpHeaders();
		headers.add("message", "User details updated successfully!");
		ResponseEntity<AppReport> response = new ResponseEntity<AppReport>(reportObj, headers, status);
		
		return response;
	}
	
	@DeleteMapping(path = "delete-report/{reportId}", produces = "application/json")
	public ResponseEntity<AppReport> deleteReport(@PathVariable(name = "reportId") Integer reportId) {
		AppReport reportObj = commService.deleteReport(reportId);
		HttpStatus status = HttpStatus.OK;
		HttpHeaders headers = new HttpHeaders();
		headers.add("message", "User deleted successfully.");
		ResponseEntity<AppReport> response = new ResponseEntity<AppReport>(reportObj, headers, status);
		LOG.info(reportId.toString());
		return response;
	}
}
