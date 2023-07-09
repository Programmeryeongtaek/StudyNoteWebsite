import React, { useState } from 'react';
import ImageFileInput from './ImageFileInput';

const sanitize = (type, value) => {
  switch (type) {
    case 'number':
      return Number(value) || 0;

    default:
      return value;
  }
}

const INITIAL_VALUES = {
  imgFile: null,
  title: '',
  athor: '',
  page: '',
  content: '',
  date: '',
};

const CreateCardForm = ({ 
  initialValues = INITIAL_VALUES,
  initialPreview,
  onSubmit,
  onSubmitSuccess,
  onCancel,
}) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittingError, setSubmittingError] = useState(null);
  const [values, setValues] = useState(initialValues);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('imgFile', values.imgFile);
    formData.append('title', values.title);
    formData.append('athor', values.athor);
    formData.append('page', values.page);
    formData.append('content', values.content)
    formData.append('date', values.date)
    let result;
    try {
      setSubmittingError(null);
      setIsSubmitting(true);
      result = await onSubmit(formData);
    } catch (error) {
      setSubmittingError(error);
      return;
    } finally {
      setIsSubmitting(false);
    }
    const { card } = result;
    setValues(initialValues);
    onSubmitSuccess(card);
  };

  const handleChange = (name, value) => {
    setValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };

  const handleInputChange = (e) => {
    const { name, value, type } = e.target;
    handleChange(name, sanitize(type, value));
  }

  return (
    <form className='flex max-h-[250px]' onSubmit={handleSubmit}>
      <ImageFileInput
        className="flex-none mr-[20px]"
        name="imgFile"
        initialPreview={initialPreview}
        value={values.imgFile}
        onChange={handleChange}
      />
      <div className='flex flex-col'>
        <div className='flex mb-[14px]'>
          <input className='flex-[2_1]' name='title' value={values.title} placeholder='제목을 입력하세요.' type="text" onChange={handleInputChange} />
          {onCancel && (
            <button className='py-[13px] px-[20px] rounded-[6px] font-normal border-none text-black bg-transparent text-[16px] cursor-pointer' type='button' onClick={onCancel}>취소</button>
          )}
          <button className='py-[13px] px-[20px] rounded-[6px] font-normal border-none text-white bg-[#2c9631] text-[16px] cursor-pointer' type='submit' disabled={isSubmitting}>확인</button>
        </div>
        <div className='flex mb-[14px]'>
          <input className='' name='athor' value={values.athor} placeholder='작가 이름' type="text" onChange={handleInputChange} />
          <input className='' name='page' value={values.page} placeholder='페이지 표시' type="number" onChange={handleInputChange} />
        </div>
        <textarea className='flex-1' name="content" value={values.content} placeholder='내용을 작성해 주세요.' onChange={handleInputChange}></textarea>
        {submittingError && <p>{submittingError.message}</p>}
      </div>
    </form>
  )
}

export default CreateCardForm;