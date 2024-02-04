import { useCSVReader } from "react-papaparse";
import { Button, Input } from "@chakra-ui/react";

const CsvUpload = () => {
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
          <Button
            size="sm"
            onClick={() =>
              document?.getElementById("react-papaparse-input")?.click()
            }
          >
            Import CSV
          </Button>
          <Input id="react-papaparse-input" type="file" hidden />
          <div>{file && file.name}</div>
        </aside>
      )}
    </CSVReader>
  );
};

export default CsvUpload;
