import { FC } from "react";
import { useCSVReader } from "react-papaparse";
import { useToast } from "@chakra-ui/react";
import { Button, Tooltip } from "@chakra-ui/react";
import { parseCsvUpload } from "@/shared/utils/csv-upload";

interface ICSVUploadProps {
  isConnected: boolean;
  onCsvUpload: (data: any) => void;
}

const CsvUpload: FC<ICSVUploadProps> = ({ isConnected, onCsvUpload }) => {
  const { CSVReader } = useCSVReader();
  const toast = useToast();

  const handleOnError = (err: any, file: any, inputElem: any, reason: any) => {
    console.log(err);
  };

  const handleOnUploadAccepted = (results: any) => {
    const parsedResults = parseCsvUpload(results);
    onCsvUpload(parsedResults);
    toast({
      title: "CSV Uploaded",
      description: "CSV file has been uploaded successfully",
      status: "success",
      duration: 2500,
      isClosable: true,
    });
  };

  return (
    <CSVReader
      header
      onUploadAccepted={handleOnUploadAccepted}
      onError={handleOnError}
    >
      {({ getRootProps }: any) => (
        <Tooltip hasArrow isDisabled={isConnected} label="Connect wallet">
          <Button
            colorScheme="secondary"
            size="sm"
            {...getRootProps()}
            isDisabled={!isConnected}
          >
            Import CSV
          </Button>
        </Tooltip>
      )}
    </CSVReader>
  );
};

export default CsvUpload;
