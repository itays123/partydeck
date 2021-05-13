package com.partydeck.server;

import com.partydeck.server.repositories.GameCodeGenerator;
import com.partydeck.server.repositories.UrlParser;
import org.junit.jupiter.api.Test;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.util.Assert;

import java.net.URI;
import java.net.URISyntaxException;
import java.util.HashSet;
import java.util.Map;
import java.util.Set;

@SpringBootTest
public class ComponentsTest {

    private static final Logger LOGGER = LoggerFactory.getLogger(ComponentsTest.class);

    @Autowired
    UrlParser urlParser;

    @Autowired
    GameCodeGenerator generator;

    @Test
    void testDecoding() throws URISyntaxException {
        String url = "ws://localhost:8080/ws?code=123456&name=admin";
        URI uri = new URI(url);
        Map<String, String> query = urlParser.parse(uri);
        Assert.isTrue(query.get("name").equals("admin"), "name is not admin");
    }

    @Test
    void testCodeGenerator() throws StackOverflowError {
        Set<String> codes = new HashSet<>();
        for (int i = 0; i < 1000000; i++) {
            codes.add(generator.generate(codes::contains));
        }
        Assert.isTrue(codes.size() == 1000000, "code size less than 1m, actual" + codes.size());
    }

}
