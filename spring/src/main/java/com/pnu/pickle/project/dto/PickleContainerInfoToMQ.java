package com.pnu.pickle.project.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.Map;

@Getter
@AllArgsConstructor
@NoArgsConstructor
@Setter
public class PickleContainerInfoToMQ {
    private String id;
    private String domain;
    private String template;
    private String file;
    private Map<String,String> env;

    public static PickleContainerInfoToMQ from(ProjectTemplate projectTemplate, String url, String port) {
        PickleContainerInfoToMQ pickleContainerInfoToMQ = new PickleContainerInfoToMQ();
        pickleContainerInfoToMQ.domain = projectTemplate.getSubdomain();
        pickleContainerInfoToMQ.env = projectTemplate.getEnvVars();
        pickleContainerInfoToMQ.file = url;
        pickleContainerInfoToMQ.template = projectTemplate.getTemplateTitle();
        pickleContainerInfoToMQ.id = port;
        return pickleContainerInfoToMQ;
    }
}
