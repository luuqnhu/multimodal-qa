import { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { Card } from "../../components/ui/card";
import { Image, X } from "lucide-react";
import { Button } from "../../components/ui/button";
import React from "react";

interface ImageUploadProps {
  selectedFiles: File[];
  setSelectedFiles: (files: File[]) => void;
}

export function ImageUpload({ selectedFiles, setSelectedFiles }: ImageUploadProps) {
  const onDrop = useCallback((acceptedFiles: File[]) => {
    // setSelectedFiles((prevFiles: File[]) => [...prevFiles, ...acceptedFiles]);
    setSelectedFiles([...selectedFiles, ...acceptedFiles]);
  }, [setSelectedFiles]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.png', '.jpg', '.jpeg', '.gif']
    },
    maxSize: 5 * 1024 * 1024 // 5MB
  });

  const removeFile = (index: number) => {
    setSelectedFiles(selectedFiles.filter((_, i) => i !== index));
  };

  return (
    <div className="space-y-4">
      <Card
        {...getRootProps()}
        className={`p-4 text-center cursor-pointer border-dashed ${
          isDragActive ? "border-primary" : "border-border"
        }`}
      >
        <input {...getInputProps()} />
        <div className="flex flex-col items-center gap-2">
          <Image className="w-8 h-8 text-muted-foreground" />
          <p className="text-sm text-muted-foreground">
            {isDragActive
              ? "Drop images here"
              : "Drag & drop images here or click to select"}
          </p>
        </div>
      </Card>

      {selectedFiles.length > 0 && (
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
          {selectedFiles.map((file, index) => (
            <div key={index} className="relative">
              <img
                src={URL.createObjectURL(file)}
                alt={`Preview ${index + 1}`}
                className="w-full h-32 object-cover rounded-md"
              />
              <Button
                variant="destructive"
                size="icon"
                className="absolute top-1 right-1"
                onClick={() => removeFile(index)}
              >
                <X className="w-4 h-4" />
              </Button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}