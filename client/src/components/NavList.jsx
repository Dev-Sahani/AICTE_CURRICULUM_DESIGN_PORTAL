import NavButton from "./NavButton"

export default function NavList({list, className, vertical}) {
  const flexCol = vertical?vertical:false;
  return (
    <div className={`flex ${flexCol?"flex-col":""} gap-2 p-2`}>
        {
            list.map((item, index) => 
                <NavButton key={index} to={item.to}>
                    {item.child}
                </NavButton>
            )
        }
    </div>  
  )
};
