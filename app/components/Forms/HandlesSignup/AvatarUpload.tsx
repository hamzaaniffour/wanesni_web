"use client";
import React, { useState, ChangeEvent } from 'react';

interface SignUpFormProps {
  onFileIdChange: (fileData: FormData) => void;
}

const SignUpForm: React.FC<SignUpFormProps> = ({ onFileIdChange }) => {
  const [fileId, setFileId] = useState<string>('');

  const handleFileUpload = async (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const fileData = new FormData();
      fileData.append('file', file);

      var url = URL.createObjectURL(file);

      setFileId(url);

      onFileIdChange(fileData);
    }
  };

  return (
    <div className="avatar-upload flex items-center justify-center">
        <div className="avatar-edit">
          <input type="file" id="imageUpload" name="fileId" accept=".png, .jpg, .jpeg" onChange={handleFileUpload} />
          <label htmlFor="imageUpload" className="tooltip" data-tip="Upload Your Avatar">
            <span className="material-icons text-pink-500 mt-1.5" style={{fontSize:'20px'}}>photo_camera</span>
          </label>
        </div>
        <div className="avatar-preview">
        {fileId ? (
          <img className="rounded-full" src={fileId} alt="Profile" style={{ objectFit: 'cover', width: '100%', height: '100%' }} />
        ) : (
          <div style={{backgroundImage: 'url("./images/user-circle-svgrepo-com.svg")'}}></div>
        )}
        </div>
      </div>
  );
};

export default SignUpForm;
