import { FC } from "react";
import { useCSVReader } from "react-papaparse";
import { Button, Input, Tooltip } from "@chakra-ui/react";

interface ICSVUploadProps {
  isConnected: boolean;
}

const CsvUpload: FC<ICSVUploadProps> = ({ isConnected }) => {
  const { CSVReader } = useCSVReader();

  const handleOnDrop = (data: any) => {
    console.log("---------------------------");
    console.log(data);
    console.log("---------------------------");
  };

  const handleOnError = (err: any, file: any, inputElem: any, reason: any) => {
    console.log(err);
  };

  const handleOnRemoveFile = (data: any) => {
    console.log("---------------------------");
    console.log(data);
    console.log("---------------------------");
  };

  return (
    <CSVReader
      onDrop={handleOnDrop}
      onError={handleOnError}
      noDrag
      addRemoveButton
      onRemoveFile={handleOnRemoveFile}
    >
      {({ file }: any) => (
        <aside>
          <Tooltip hasArrow isDisabled={isConnected} label="Connect wallet">
            <Button
              colorScheme="secondary"
              size="sm"
              isDisabled={!isConnected}
              onClick={() =>
                document?.getElementById("react-papaparse-input")?.click()
              }
            >
              Import CSV
            </Button>
          </Tooltip>
          <Input id="react-papaparse-input" type="file" hidden />
          <div>{file && file.name}</div>
        </aside>
      )}
    </CSVReader>
  );
};

export default CsvUpload;
