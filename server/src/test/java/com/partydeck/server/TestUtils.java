package com.partydeck.server;

import com.partydeck.server.models.Game;
import com.partydeck.server.models.shared.Card;

import java.util.ArrayList;
import java.util.List;

public class TestUtils {

    static Game makeGame() {
        List<Card> questions = new ArrayList<>(), answers = new ArrayList<>();

        for (int i = 0; i < 12; i++) {
            questions.add(new Card(String.valueOf(i), "question " + (i + 1)));
        }

        for (int i = 0; i < 36; i++) {
            answers.add(new Card(String.valueOf(i), "answer " + (i + 1)));
        }

        return new Game("", questions, answers);
    }

}
