import { placeholder } from '@cloudinary/react'
import React,{memo} from 'react'

const TextBox=memo(function (labelText,hideLabel,textName,Placeholder,textType='text',onTextChange,inputCsslass,containercssClass ){

<div className={containercssClass}>
   {hideLabel && (<label htmlFor={textName} className='p-3'>{labelText}</label>)}
   <input  name={textName} id={textName} type={textType}  placeholder={placeholder} className={inputCsslass} />

</div>

})