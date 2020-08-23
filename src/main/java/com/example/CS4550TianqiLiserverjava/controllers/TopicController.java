package com.example.CS4550TianqiLiserverjava.controllers;

import com.example.CS4550TianqiLiserverjava.models.Topic;
import com.example.CS4550TianqiLiserverjava.services.TopicService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@CrossOrigin(origins = "*")
public class TopicController {
  @Autowired
  TopicService service;

  @PostMapping("/api/lessons/{lid}/topics")
  public Topic createTopic(
          @PathVariable("lid") String lid,
          @RequestBody Topic topic) {
    return service.createTopic(lid, topic);
  }

  @DeleteMapping("/api/topics/{tid}")
  public Integer deleteTopic(
          @PathVariable("tid") Integer tid) {
    return service.deleteTopic(tid);
  }

  @PutMapping("/api/topics/{tid}")
  public Topic updateTopic(
          @PathVariable("tid") Integer tid,
          @RequestBody Topic updatedTopic) {
    return service.updateTopic(tid, updatedTopic);
  }

  @GetMapping("/api/topics")
  public List<Topic> findAllTopics() {
    return service.findAllTopics();
  }

  @GetMapping("/api/topics/{tid}")
  public Topic findTopicById(
          @PathVariable("tid") Integer tid) {
    return service.findTopicById(tid);
  }

  @GetMapping("/api/lessons/{lid}/topics")
  public List<Topic> findTopicsForLesson(
          @PathVariable("lid") String lessonId) {
    return service.findTopicsForLesson(lessonId);
  }
}