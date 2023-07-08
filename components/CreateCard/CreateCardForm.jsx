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
    <form className='border-black' onSubmit={handleSubmit}>
      <ImageFileInput
        className="Image-preview"
        name="imgFile"
        initialPreview={initialPreview}
        value={values.imgFile}
        onChange={handleChange}
      />
      <div>
        <div>
          <input name='title' value={values.title} placeholder='제목을 입력하세요.' type="text" onChange={handleInputChange} />
          <input name='athor' value={values.athor} placeholder='작가 이름' type="text" onChange={handleInputChange} />
          <input name='page' value={values.page} placeholder='페이지 표시' type="number" onChange={handleInputChange} />
          <input name='content' value={values.content} placeholder='내용 입력' type="number" onChange={handleInputChange} />
          <input name='date' value={values.date} placeholder='날짜 기입' type="number" onChange={handleInputChange} />
          {onCancel && (
            <button type='button' onClick={onCancel} >취소</button>
          )}
          <button type='submit' disabled={isSubmitting}>확인</button>
        </div>
        <textarea name="content" value={values.content} placeholder='내용을 작성해 주세요.' onChange={handleInputChange}></textarea>
        {submittingError && <p>{submittingError.message}</p>}
      </div>
      <div className='flex'>
        <button>미리보기</button>
        <button>취소</button>
      </div>
    </form>
  )
}

export default CreateCardForm;