import { useRef } from 'react';
import { AiOutlineCloudUpload } from 'react-icons/ai';

function UploadBox({
  containorData,
  setContainorsData,
  containorIndex,
  isExistContainer,
}) {
  const clientFileRef = useRef();

  const saveFile = () => {
    const curFile = clientFileRef.current.files[0];

    // 파일 크기 제한 (50MB)
    const MAX_FILE_SIZE = 50 * 1024 * 1024; // 50MB

    if (curFile) {
      if (curFile.size > MAX_FILE_SIZE) {
        alert('파일 크기가 50MB를 초과하였습니다. 다른 파일을 선택해주세요.');
        return; // 파일 크기가 50MB 초과하면 함수 종료
      }

      // 파일 보내기 성공하면 상태 값 변경
      setContainorsData((prev) => {
        const tempContainorData = prev.map(
          (
            {
              templateTitle,
              containorStack,
              subdomain,
              envVars,
              containorFile,
              defaultSubDomain,
            },
            tempIndex,
          ) => ({
            templateTitle,
            containorStack,
            subdomain,
            envVars: envVars.map((item) => ({ ...item })), // 배열 깊은 복사
            containorFile, // 배열 깊은 복사
            defaultSubDomain,
          }),
        );

        tempContainorData[containorIndex].containorFile = curFile;

        return tempContainorData;
      });
    }
  };

  const deleteFile = (fileIndex) => {
    setContainorsData((prev) => {
      const tempContainorData = prev.map(
        (
          {
            templateTitle,
            containorStack,
            subdomain,
            envVars,
            containorFiles,
            defaultSubDomain,
          },
          tempIndex,
        ) => {
          if (containorIndex === tempIndex) containorFiles.splice(fileIndex, 1); // 제거
          return {
            templateTitle,
            containorStack,
            subdomain,
            envVars: envVars.map((item) => ({ ...item })), // 배열 깊은 복사
            containorFiles: [...containorFiles], // 배열 깊은 복사
            defaultSubDomain,
          };
        },
      );

      return tempContainorData;
    });
  };

  console.log(containorData);
  return isExistContainer || containorData?.containorFile ? (
    <div>
      <div className="flex flex-col items-center justify-center w-[800px] h-[150px] border-dashed border-[2.5px] border-pcDarkGray rounded-xl pb-4">
        <AiOutlineCloudUpload size="1.8rem" />
        <div className="font-bold mt-2 text-lg">
          파일이 업로드 되어있습니다.
        </div>
      </div>
    </div>
  ) : (
    <div>
      <div className="flex flex-col items-center justify-center w-[800px] h-[150px] border-dashed border-[2.5px] border-pcDarkGray rounded-xl pb-4">
        <AiOutlineCloudUpload size="1.8rem" />
        <div>
          <div className="text-center">
            <span className="font-bold text-md text-center">
              Drag and Drop &ldquo;Code File&rdquo; here
            </span>
          </div>
          <div className="text-center mb-2">
            <span className="font-bold text-md text-center">or</span>
          </div>
          <label
            htmlFor={`upload${containorIndex}`}
            className=""
            aria-label="파일 수정"
          >
            <div className="text-center">
              <span className="px-8 py-1 bg-[#EA991F] hover:bg-[#EA991F]/80 text-md text-white text-center rounded-xl leading-[25px]">
                Select file
              </span>
            </div>
          </label>
          <input
            id={`upload${containorIndex}`}
            className="hidden"
            type="file"
            accept=".zip,.tar"
            ref={clientFileRef}
            onChange={saveFile}
          />
        </div>
      </div>
    </div>
  );
}

export default UploadBox;
