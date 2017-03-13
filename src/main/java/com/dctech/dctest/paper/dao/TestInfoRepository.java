package com.dctech.dctest.paper.dao;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;

import com.dctech.dctest.paper.model.TestInfo;

public interface TestInfoRepository extends CrudRepository<TestInfo, Long> {

	@Query(value="select t from TestInfo t where t.paperId=:paperId and t.finish=false")
	TestInfo getPaperNotFinishTestInfo( @Param("paperId") Long paperId);
}
