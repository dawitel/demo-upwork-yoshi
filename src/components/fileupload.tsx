import React, { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { ToastAction } from "@radix-ui/react-toast";
import { UploadIcon } from "@radix-ui/react-icons";

interface CsvUploadProps {
  onFileUpload: (file: File) => void;
  btnText: string;
  isLoading: boolean;
}

const CsvUpload: React.FC<CsvUploadProps> = ({
  onFileUpload,
  btnText,
  isLoading,
}) => {
  const { toast } = useToast();

  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && file.type === "text/csv") {
      setSelectedFile(file);
    } else {
      toast({
        variant: "destructive",
        title: "The file you're trying to upload is not supported!",
        description: "Try uploading a CSV file",
        action: <ToastAction altText="cancel">Cancel</ToastAction>,
      });
    }
  };

  const handleUploadClick = () => {
    if (selectedFile) {
      onFileUpload(selectedFile);
    } else {
      toast({
        variant: "destructive",
        title: "Please select a file to upload!",
        description: "Try uploading a CSV file",
      });
    }
  };

  return (
    <div className="bg-blue-100 rounded-xl">
      <div className="flex p-6 flex-col items-center justify-center gap-4">
        <Input
          type="file"
          accept=".csv"
          onChange={handleFileChange}
          className="bg-white h-9.5 text-slate-900"
        />

        <Input
          type="email"
          onChange={() => console.log("email")}
          className="bg-white h-9.5 text-slate-900 placeholder:text-x"
          placeholder="Enter your email to recieve the final file..."
        />
        <Input
          type="text"
          onChange={() => console.log("store name")}
          className="bg-white h-9.5 text-slate-900 placeholder:text-sm"
          placeholder="Enter the store name you are looking for..."
        />
        <Button
          onClick={handleUploadClick}
          className="bg-blue-500 hover:bg-blue-500 w-full hover:text-gray-200 text-white px-4 py-2 rounded"
          disabled={isLoading}
        >
          <div className="flex gap-x-2 items-center justify-center">
            <UploadIcon />
            <p>{btnText}</p>
          </div>
        </Button>
      </div>
    </div>
  );
};

export default CsvUpload;
