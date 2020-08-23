package com.example.CS4550TianqiLiserverjava.services;

import com.example.CS4550TianqiLiserverjava.repositories.TopicRepository;
import com.example.CS4550TianqiLiserverjava.models.Topic;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TopicService {
  @Autowired
  TopicRepository repository;

  public Topic createTopic(String lid, Topic topic){
    topic.setLessonId(lid);
    return repository.save(topic);
  }
  public Integer deleteTopic(Integer tid) {
    List<Topic> topics = repository.findAllTopics();
    for (Topic t : topics) {
      if (t.getId().equals(tid)) {
        repository.deleteById(tid);
        return 1;
      }
    }
    return 0;
  }

  public List<Topic> findAllTopics() {
    return repository.findAllTopics();
  }

  public Topic findTopicById(Integer tid) {
    return repository.findTopicById(tid);
  }

  public List<Topic> findTopicsForLesson(String lessonId) {
    return repository.findTopicsForLesson(lessonId);
  }

  public Topic updateTopic(Integer tid, Topic updatedTopic) {
    Topic topic = repository.findTopicById(tid);
    topic.setId(updatedTopic.getId());
    topic.setLessonId(updatedTopic.getLessonId());
    topic.setTitle(updatedTopic.getTitle());
    topic.setWidgets(updatedTopic.getWidgets());
    topic.setDescription(updatedTopic.getDescription());
    repository.save(topic);
    return topic;
  }
}