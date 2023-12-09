package com.merc.administration.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.merc.administration.model.Notice;
import com.merc.administration.repository.NoticeRepository;

@Service
public class NoticeService implements INoticeService{

	@Autowired
	NoticeRepository noticeRepo;
	
	@Override
	public List<Notice> allNotices() {
		// TODO Auto-generated method stub
		return noticeRepo.findAll();
	}

	@Override
	public Notice noticeById(Integer id) {
		// TODO Auto-generated method stub
		Optional<Notice> noticeOpt = noticeRepo.findById(id);
//		if (noticeOpt.isPresent()) {
			return noticeOpt.get();
//		} else {
//			String errorMessage = "Post with postId " + id + " not found!";
//			throw new NoticeNotFoundException(errorMessage);
//		}
	}
	
	@Override
	public Notice addNotice(Notice notice) {
		// TODO Auto-generated method stub
        return noticeRepo.save(notice);
	}
	
	@Override
	public boolean deleteNotice(Integer id) {
        if (noticeRepo.existsById(id)) {
            noticeRepo.deleteById(id);
            return true;
        }
        return false;
    }

}
