package com.pnu.pickle.user.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

@AllArgsConstructor
@Builder
@Getter
public class UserInfoResDto {
    @Schema(description = "사용자 아이디", nullable = false, example = "1")
    private Long userId;
    @Schema(description = "사용자 닉네임(이름)", nullable = false, example = "승훈")
    private String username;
    @Schema(description = "사용자 퍼블릭 아바타 주소", nullable = false, example = "https://pickle-avatar.s3.amazonaws.com/bluee.svg")
    private String userImage;
}

//
//const handleSubmit = async () => {
//        if (!isFormValid()) {
//alert('Please fill out all fields and upload at least one image.');
//      return;
//              }
//              const formData = new FormData();
//    formData.append('projectName', projectName);
//    formData.append('projectIntro', projectIntro);
//    formData.append('projectDescription', projectDescription);
//    existingFiles.forEach((file, index) => {
//        formData.append('projectImages', file);
//    });
//            participantsData.forEach((participant, index) => {
//        formData.append(`participants[${index}].participantId`, participant.participantId);
//        formData.append(`participants[${index}].participantName`, participant.participantName);
//        formData.append(`participants[${index}].participantEmail`, participant.participantEmail);
//        formData.append(`participants[${index}].participantAuthority`, participant.participantAuthority);
//        });
//
//        try {
//        const response = await axios.post('/api/submit', formData, {
//    headers: {
//        'Content-Type': 'multipart/form-data',
//    },
//});
//        console.log('Success:', response.data);
//    } catch (error) {
//        console.error('Error: ', error);
//    }
//            };
