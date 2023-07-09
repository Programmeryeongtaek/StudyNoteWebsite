import React, { useEffect, useRef, useState } from 'react';
import placeholderImg from '@/public/images/preview-placeholder.png';
import resetWhiteImg from '@/public/images/reset-white.png';
import Image from 'next/image';

const Image__fileInput = {
  initial: "relative w-150 h-150 rounded-xl overflow-hidden bg-[#f6f6f6] border-2 border-[#dae7e3]",
  className: "",
  hiddenOverlay: "opacity: 0 relative t-0 l-0 w-full h-full cursor-pointer",
  clearButton: "absolute t-6 r-4 w-40 h-40 border-none cursor-pointer bg-transparent",
};

const Image__preview = {
  initial: "block w-full h-full object-center object-cover",
  selected: "opacity-50",
};

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
    <div className={`${className ? Image__fileInput.className : Image__fileInput.initial}`}>
      <img className={`${preview ? Image__preview.selected : Image__preview.initial}`} src={preview || placeholderImg} alt="이미지 미리보기" />
      <input className='' type="file" onChange={handleChange} ref={inputRef} />
      {value && (
        <button
          className={Image__fileInput.clearButton}
          type='button'
          onClick={handleClearClick}
        >
          <Image src={resetWhiteImg} alt='지우기' />
        </button>
      )}
    </div>
  )
}

export default ImageFileInput