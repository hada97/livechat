package com.tech.livechat.controller;


import com.tech.livechat.domain.ChatInput;
import com.tech.livechat.domain.ChatOutput;
import org.apache.tomcat.util.buf.CharChunk;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.stereotype.Controller;
import org.springframework.web.servlet.tags.HtmlEscapeTag;
import org.springframework.web.util.HtmlUtils;

@Controller
public class LiveChatController {


    @MessageMapping("/new-message")
    @SendTo("/topics/livechat")
    public ChatOutput newMessage(ChatInput input) {
        return new ChatOutput(HtmlUtils.htmlEscape(input.user() + ":" + input.message()));
    }


}
