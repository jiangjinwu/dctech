package com.dctech.dctest.paper.model;

import javax.persistence.Entity;
import javax.persistence.PrimaryKeyJoinColumn;

import com.dctech.dcshop.buy.model.Goods;

@Entity
@PrimaryKeyJoinColumn(name="id")
public class Paper extends Goods {


	/*Long paperId;*/
	String paperNo;
	Long paperCtime;
	Long paperUid;
	Integer expireDayCount;
	
	/*@Id	
	@GeneratedValue(strategy=GenerationType.AUTO)
	public Long getPaperId() {
		return paperId;
	}
	public void setPaperId(Long paperId) {
		this.paperId = paperId;
	}*/
	 
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
