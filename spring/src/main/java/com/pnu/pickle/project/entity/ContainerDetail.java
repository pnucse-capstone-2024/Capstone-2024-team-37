package com.pnu.pickle.project.entity;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "container_detail")
@Getter
@Setter
public class ContainerDetail {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "container_detail_id")
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "project_id")
    private Project project;

    @Column(name = "container_template_name")
    private String containerTemplateName;

    @Column(name = "container_stack")
    private String containerStack;

    @Column(name = "container_domain")
    private String containerDomain;

    @Column(name = "port")
    private Long portIndex;

    @Column(name = "code_file_name")
    private String fileName;

    @Column(name = "code_file_url")
    private String fileUrl;

    @JsonManagedReference
    @OneToMany(mappedBy = "container")
    private List<ContainerEnv> containerEnvs = new ArrayList<>();
}
