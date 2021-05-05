package com.partydeck.server.repositories;

import org.springframework.context.annotation.Bean;
import org.springframework.stereotype.Component;

import java.util.Random;
import java.util.function.Function;

/**
 * A component responsible for generating cool-looking numeric ids
 * @author Itay Schechner
 * @version 1.0
 */
@Component
public class GameCodeGenerator {

    public static final int NUMBER_OF_DIGITS = 6;

    /**
     * Generates a code
     * @return the generated code
     */
    public String generate() {
        Random random = random();
        StringBuilder codeBuilder = new StringBuilder();
        String code;
        int next;
        for (int i = 0; i < NUMBER_OF_DIGITS; i++) {
            next = random.nextInt(10);
            codeBuilder.append(next);
        }
        code = codeBuilder.toString();
        return code;
    }

    /**
     * Generates a unique code
     * @param codeExists the code existence checker
     * @return a unique generated code
     */
    public String generate(Function<String, Boolean> codeExists) {
        String code = generate();
        return codeExists.apply(code) ? generate(codeExists) : code;
    }

    @Bean
    public Random random() {
        return new Random();
    }

}
