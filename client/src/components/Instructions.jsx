import React from 'react'

export default function Instructions({instructions, className}) {
  if (!instructions) {
    return <div>No instructions passed</div>
  }
  let classes = 'my-8 mx-2 p-4 h-[70vh] rounded-xl bg-white';
  if(className) classes = className + " " + classes;

  return (
    <div className={classes}>
        <header className='flex justify-center'>
            <h1 className='text-primary-900 text-2xl font-semibold mb-4'>
                Instructions
            </h1>
        </header>
        <main>
            <ul className='list-disc pl-4'>
            {
                instructions.map((instr,ind)=>{
                    const head = instr.heading ? instr.heading : "";
                    const text = instr.text ? instr.text : "";
                    return (
                        <li className='mb-4' key={ind}>
                            <p className={`text-primary-900 inline ${head!==""?"mr-4":""}`}>{head}</p>
                            <p className='inline'>{text}</p>
                        </li>
                    )
                })
            }
            </ul>
        </main>
    </div>
  )
}
