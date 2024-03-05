import { useParams } from "react-router-dom";
import { 
  CourseInput, 
  CourseDropdown, 
  Label, 
  AddCourseInput ,
  // Instructions,
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
  // eslint-disable-next-line
  }, []);

  // <div className="flex gap-2 justify-between">
  return (
      <div>
        <Label breakLine={true} className="!w-32">Course Title</Label>
        <CourseInput
          name="title"
          placeholder="Enter Course name..."
          className="w-[90%]"
        />
        
        <div className="flex gap-6 my-4 items-center">
          <div>
            <Label>Level</Label>
            <CourseDropdown
              className="w-fit"
              name="level"
              // Default Values 
              list={getAllLevels}
            />
          </div>
          <div>
            <Label>Program</Label>
            <CourseDropdown
              className="w-fit"
              name="program"
              // Default Values 
              list={getAllProgrammes}
            />
          </div>
        </div>

        <div className="flex gap-6 my-4 items-center">
        </div>

        <Label large breakLine className="mt-6">Message</Label>
        <CourseInput
          name="message"
          className="w-[90%] min-h-[8rem]"
        />

        <Label large breakLine className="w-48 mt-6">Preface</Label>
        <CourseInput
          name="preface"
          propertyName="preface"
          className="w-[90%] min-h-[8rem] "
        />
        <Label large breakLine className="w-48 mt-6">Acknowledgement</Label>
        <CourseInput
          name="acknowledgement"
          propertyName="acknowledgement"
          className="w-[90%] min-h-[8rem] "
        />
        <div className="flex justify-start gap-8 mt-8">
          <Label large breakLine className="w-auto">Range of Credit</Label>
          <CourseInput
            name="rangeOfCredits"
            propertyName="rangeOfCredits"
            className="!w-auto h-10"
          />
        </div>
        <Label large breakLine className="w-auto mt-6">Definitions of Credit</Label>
        <AddCourseInput
          name="definitionOfCredits"
          propertyName="definitionOfCredits"
          propertyKeys={["activity", "overallCredits"]}
          className="w-[90%] min-h-[6rem] ml-8 grid grid-cols-2 gap-6"
        />
        <Label large breakLine className="w-auto mt-6">Codes And Definitions</Label>
        <AddCourseInput
          name="codesAndDef"
          propertyName="codesAndDef"
          propertyKeys={["code", "definition"]}
          className="w-[90%] min-h-[6rem] ml-8 grid grid-cols-2 gap-6"
        />
      </div>
      )

      /* <Instructions instructions={[
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
      /> */
    // </div>
}
