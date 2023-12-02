import React from 'react'
import Resources1 from "./Resources1"
import image from "../../assets/image.png"
const content="Structured Computer Organization provides an accessible introduction to computer hardware and architecture. The book takes a modern structured, layered approach to understanding computer systems."
const ResourcesPage = () => {
  return (
    <div className='mx-2 my-2 flex flex-col space-y-4 w-full  '>
   <Resources1    images={image} author={"Andrew S. Tanenbaum"}  subject={"Structured Computer Organization"} about={content} name={"Machine Learning"}/>
    </div>
    )
}

export default ResourcesPage