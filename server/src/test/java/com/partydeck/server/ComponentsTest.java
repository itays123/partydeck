package com.partydeck.server;

import com.partydeck.server.repository.UrlParser;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.util.Assert;

import java.net.URI;
import java.net.URISyntaxException;
import java.util.Map;

@SpringBootTest
public class ComponentsTest {

    @Autowired
    UrlParser urlParser;

    @Test
    void testDecoding() throws URISyntaxException {
        String url = "ws://localhost:8080/ws?code=123456&name=admin";
        URI uri = new URI(url);
        Map<String, String> query = urlParser.parse(uri);
        Assert.isTrue(query.get("name").equals("admin"), "name is not admin");
    }

}
