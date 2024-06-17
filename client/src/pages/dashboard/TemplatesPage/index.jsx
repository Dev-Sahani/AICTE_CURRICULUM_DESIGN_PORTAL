import { useState } from 'react';
import AllTemplates from './AllTemplates';
import TemplatePageFilter from './TemplatePageFilter';

const TemplatesPage = () => {
  const [templates, setTemplates] = useState([]);
  return (
    <>
      <TemplatePageFilter templates={templates} setTemplates={setTemplates}/> 
      <AllTemplates templates={templates} setTemplates={setTemplates}/>
    </>
  )
}
  
export default TemplatesPage;
 