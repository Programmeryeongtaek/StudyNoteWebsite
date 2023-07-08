import React from 'react';
import CreateCardForm from '@/components/CreateCard/CreateCardForm';



const CreateCardNews = () => {
  return (
    <div>
      <div>
        <CreateCardForm />
      </div>

      <hr />
      <div>
        <div>
          미리보기
        </div>
        <div className='border-black' >
          <button className='border-4'>만들기</button>
          <button className='border-4'>취소</button>
        </div>
      </div>
    </div>
  )
}

export default CreateCardNews;