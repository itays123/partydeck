package com.partydeck.server.services;

import com.partydeck.server.repositories.GameRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Profile;
import org.springframework.stereotype.Component;

import javax.annotation.PostConstruct;
import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.IntStream;

@Component
public class StateBuilder {

    @Autowired
    private GameRepository repository;

    @Value("${state.init:true}")
    private boolean init;

    @PostConstruct
    public void initState() {
        if (!init)
            return;
        List<String> questions = IntStream.range(1, 13)
                .mapToObj(num -> "question" + num).collect(Collectors.toList());
        List<String> answers = IntStream.range(1, 37)
                .mapToObj(num -> "answer" + num).collect(Collectors.toList());
        repository.createGame("123456", questions, answers);
    }

}
