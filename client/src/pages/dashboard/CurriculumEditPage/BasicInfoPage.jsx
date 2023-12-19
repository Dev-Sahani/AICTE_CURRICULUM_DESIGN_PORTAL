import { useParams } from "react-router-dom";
import { 
  CourseInput, 
  CourseDropdown, 
  Label, 
  AddCourseInput ,
  Instructions,
} from "../../../components";
import { getAllLevels, getAllProgrammes } from "../../../utils/getAllProgramAndLevels";
import { useCourseContext } from "../../../context";
import { useEffect } from "react";

export default function BasicInfoPage() {
  const {common_id} = useParams();
  const { getCourse } = useCourseContext();

  useEffect(()=>{
    const begin = async()=>{
      try{
        await getCourse(common_id);      
      } catch(err) {
        return <div>Cannot Load the Data</div>
      }
    }
    begin();
  }, []);

  return (
    <div className="flex gap-2 justify-between">
      <div>
        <Label breakLine={true} className="!w-32">Course Name</Label>
        <CourseInput
          name="title"
          placeholder="Enter Course name..."
          className="w-[90%]"
        />
        
        <div className="flex gap-6 my-4 items-center">
          <Label>Level</Label>
          <CourseDropdown
            name="level"
            // Default Values 
            list={getAllLevels}
          />
        </div>

        <div className="flex gap-6 my-4 items-center">
          <Label>Program</Label>
          <CourseDropdown
            name="program"
            // Default Values 
            list={getAllProgrammes}
          />
        </div>

          <Label large breakLine className="mt-6">Objectives</Label>
          <AddCourseInput 
            propertyName="objectives"
            arr={[
              "lorem ipsum fehawiovn oieafjioew oivehaw iojfenva aef",
              "lorem ipsum fehawiovn oieafjioew oivehaw iojfenva aef",
            ]}
            className="w-[90%]"
          />

          <Label large breakLine className="w-48 mt-6">Learning Outcomes</Label>
          <AddCourseInput 
            propertyName="outcomes"
            arr={[
              "lorem ipsum fehawiovn oieafjioew oivehaw iojfenva aef",
              "lorem ipsum fehawiovn oieafjioew oivehaw iojfenva aef",
            ]}
            className="w-[90%]"
          />
      </div>

      <Instructions instructions={[
        {
          heading: "Course Name",
          text: "Give a title for the course that describe it in the best way.",
        }, {
          text: "Give a title for the course that describe it in the best way.",
        }, {
          heading: "Course Name",
          text: "Give a title for the course that describe it in the best way.",
        }, {
          heading: "Course Name",
          text: "Give a title for the course that describe it in the best way.",
        }, {
          heading: "Course Name",
          text: "Give a title for the course that describe it in the best way.",
        }
      ]} 
        className="basis-2/5"
      />
    </div>
  )
}
