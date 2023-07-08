import React, { useEffect, useRef, useState } from 'react';
import placeholderImg from '@/public/images/preview-placeholder.png';

const ImageFileInput = ({ className = '', initialPreview, name, value, onChange }) => {
  const [preview, setPreview] = useState(initialPreview);
  const inputRef = useRef();

  const handleChange = (e) => {
    const nextValue = e.target.files[0];
    onChange(name, nextValue);
  };

  const handleClearClick = () => {
    const inputNode = inputRef.current;
    if (!inputNode) return;

    inputNode.value = '';
    onChange(name, null);
  };

  useEffect(() => {
    if (!value) return;
    const nextPreview = URL.createObjectURL(value);
    setPreview(nextPreview);

    return () => {
      setPreview(initialPreview);
      URL.revokeObjectURL(nextPreview);
    };
  }, [value, initialPreview]);

  return (
    <div className={`ImageFileInput ${className}`}>
      <img className={`Image-preview ${preview ? 'selected' : ''}`} src={preview || placeholderImg} alt="이미지 미리보기" />
      <input type="file" onChange={handleChange} ref={inputRef} />
      {value && (
        <button
          className=''
          type='button'
          onClick={handleClearClick}
        >
          X
        </button>
      )}
    </div>
  )
}

export default ImageFileInput