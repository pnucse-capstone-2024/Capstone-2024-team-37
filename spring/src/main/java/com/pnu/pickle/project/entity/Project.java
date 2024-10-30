package com.pnu.pickle.project.entity;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import com.pnu.pickle.group.entity.Group;
import com.pnu.pickle.group.entity.GroupMembership;
import com.pnu.pickle.user.entity.User;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "Project")
@Getter
@Setter
public class Project {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "project_id")
    private Long id;

    @Column(name = "name", length = 100, nullable = false)
    private String name;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "owner_id")
    private User owner;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "group_id")
    private Group group;

    @Column(name = "domain")
    private String domain;

    @Column(name = "description", nullable = true)
    private String description;

    @Enumerated(EnumType.STRING)
    @Column(name = "project_type", nullable = true)
    private ProjectType projectType;

    @OneToMany(mappedBy = "project")
    @JsonManagedReference
    private List<ProjectAuthority> projectAuthorities = new ArrayList<>();

    @JsonManagedReference
    @OneToMany(mappedBy = "project")
    private List<ContainerDetail> containerDetails = new ArrayList<>();

    public Project() {}

    public Project(String name) {
        this.name = name;
    }

    public void addProjectAuthority(ProjectAuthority projectAuthority) {
        projectAuthorities.add(projectAuthority);
        projectAuthority.setProject(this);
    }

    public void removeProjectAuthority(ProjectAuthority projectAuthority) {
        projectAuthorities.remove(projectAuthority);
        projectAuthority.setProject(null);
    }
}
