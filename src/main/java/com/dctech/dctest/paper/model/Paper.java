package com.dctech.dctest.paper.model;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

@Entity
public class Paper  {


	Long paperId;
	String paperName;
	String paperNo;
	Long paperCtime;
	Long paperUid;
	Float paperPrice;
	Integer expireDayCount;
	
	@Id	
	@GeneratedValue(strategy=GenerationType.AUTO)
	public Long getPaperId() {
		return paperId;
	}
	public void setPaperId(Long paperId) {
		this.paperId = paperId;
	}
	public String getPaperName() {
		return paperName;
	}
	public void setPaperName(String paperName) {
		this.paperName = paperName;
	}
	public Long getPaperCtime() {
		return paperCtime;
	}
	public void setPaperCtime(Long paperCtime) {
		this.paperCtime = paperCtime;
	}
	public Long getPaperUid() {
		return paperUid;
	}
	public void setPaperUid(Long papeUid) {
		this.paperUid = papeUid;
	}
	
	public Float getPaperPrice() {
		return paperPrice;
	}
	public void setPaperPrice(Float paperPrice) {
		this.paperPrice = paperPrice;
	}
	
	
	public String getPaperNo() {
		return paperNo;
	}
	public void setPaperNo(String paperNo) {
		this.paperNo = paperNo;
	}
	public Integer getExpireDayCount() {
		return expireDayCount;
	}
	public void setExpireDayCount(Integer expireDayCount) {
		this.expireDayCount = expireDayCount;
	}
	 
	
	
	/*public Paper mapRow(ResultSet rs, int arg1) throws SQLException {
		Paper paper = new Paper();
		
		paper.setPaperPrice(rs.getFloat("pape_price"));
		paper.setPaperUid(rs.getString("pape_uid"));
		paper.setPaperName(rs.getString("pape_name"));
		paper.setPaperCtime(rs.getLong("pape_ctime"));
		paper.setPaperId(rs.getInt("pape_id"));
		return paper;
	}*/

}
