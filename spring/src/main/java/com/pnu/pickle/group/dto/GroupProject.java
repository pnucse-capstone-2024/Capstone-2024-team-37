package com.pnu.pickle.group.dto;

import lombok.Getter;
import lombok.NoArgsConstructor;


import java.util.Random;


@NoArgsConstructor
@Getter
public class GroupProject {
    private Long projectId;
    private String groupName;
    private String groupImage;
    private String projectName;
    private String projectImage;
    private String projectDescription;
    private Integer views;
    private Integer likes;
    private Integer comments;

    public GroupProject(Long projectId, String groupName, String groupImage,
                        String projectName, String projectImage, String projectDescription) {
        this.projectId = projectId;
        this.groupName = groupName;
        this.groupImage = groupImage;
        this.projectName = projectName;
        this.projectImage = projectImage;
        this.projectDescription = projectDescription;

        // 2자리 난수 생성 (10 이상 99 이하)
        Random random = new Random();
        this.views = random.nextInt(90) + 10;
        this.likes = random.nextInt(90) + 10;
        this.comments = random.nextInt(90) + 10;
    }
}
