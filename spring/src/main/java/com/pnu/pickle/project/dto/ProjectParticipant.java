package com.pnu.pickle.project.dto;

import com.pnu.pickle.project.entity.Permission;
import com.pnu.pickle.project.entity.ProjectAuthority;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Getter
public class ProjectParticipant {
    private Long id;
    private String name;
    private Permission permission;

    public static ProjectParticipant from(ProjectAuthority authority) {
        ProjectParticipant participant = new ProjectParticipant();
        participant.id = authority.getUser().getId();
        participant.name = authority.getUser().getUsername();
        participant.permission = authority.getPermission();
        return participant;
    }
}
