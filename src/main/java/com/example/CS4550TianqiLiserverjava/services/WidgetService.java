package com.example.CS4550TianqiLiserverjava.services;

import com.example.CS4550TianqiLiserverjava.models.Topic;
import com.example.CS4550TianqiLiserverjava.models.Widget;
import com.example.CS4550TianqiLiserverjava.repositories.TopicRepository;
import com.example.CS4550TianqiLiserverjava.repositories.WidgetRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
@Service
public class WidgetService {

  @Autowired
  TopicRepository topicRepository;

  @Autowired
  WidgetRepository repository;

  public List<Widget> findWidgetsForTopic(Integer tid) {
    return repository.findWidgetsForTopic(tid);
  }

  public Widget findWidgetById(Integer wid) {
    return repository.findWidgetById(wid);
  }

  public List<Widget> findAllWidgets() {
    return repository.findAllWidgets();
  }

  public int deleteWidget(Integer wid) {
    List<Widget> widgets = repository.findAllWidgets();
    for (Widget w : widgets) {
      if (w.getId().equals(wid)) {
        repository.deleteById(wid);
        return 1;
      }
    }
    return 0;
  }


  public Widget createWidget(Integer tid, Widget newWidget) {
    Topic topic = topicRepository.findTopicById(tid);
    newWidget.setTopic(topic);
    return repository.save(newWidget);
  }

  public Widget updateWidget(Integer widgetId, Widget updatedWidget) {
    Widget widget = repository.findWidgetById(widgetId);
    widget.setType(updatedWidget.getType());
    repository.save(widget);
    return widget;
  }
}