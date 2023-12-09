package com.merc.administration.service;

import java.util.List;

import com.merc.administration.model.Notice;

public interface INoticeService {

    public abstract List<Notice> allNotices();
	
	public abstract Notice noticeById(Integer id);

	public abstract Notice addNotice(Notice notice);
	
	public abstract boolean deleteNotice(Integer id);

}
