package com.pnu.pickle.group.dto.groupMember;

import com.pnu.pickle.group.entity.GroupMembership;
import com.pnu.pickle.group.entity.MemberGroupRole;
import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class GroupParticipant {
    private final Long participantId;
    private final String participantImage;
    private final String participantName;
    private final String participantEmail;
    private final MemberGroupRole participantAuthority;

    public static GroupParticipant from(GroupMembership groupMembership){
        return new GroupParticipant(
                groupMembership.getUser().getId(),
                groupMembership.getUser().getUserImage(),
                groupMembership.getUser().getUsername(),
                groupMembership.getUser().getEmail(),
                groupMembership.getAuthority()
        );
    }
}
